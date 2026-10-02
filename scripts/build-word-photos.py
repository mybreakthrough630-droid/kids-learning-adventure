"""Fetch Wikimedia photographs and their licence metadata; build shared word enrichment.

Run from repository root. Reruns reuse the saved manifest; --refresh refetches it.
All photos are bundled so learners do not depend on a third-party image service.
"""
import concurrent.futures
import html
import io
import json
import pathlib
import re
import sys
import time
import threading
import urllib.parse
import urllib.request
from PIL import Image, ImageOps
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tmp/photo-tools'))
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets' / 'word-photos'
ASSETS.mkdir(parents=True, exist_ok=True)
MANIFEST = ASSETS / 'sources.json'
rows = [line.split('|') for line in (ROOT / 'scripts/word-details.tsv').read_text(encoding='utf-8').splitlines() if line and not line.startswith('#')]
sources = json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else {}
article_photos = {}
INFO_CACHE = ROOT / 'scripts' / 'word-photo-cache.json'
file_info = {}
cached_choices = json.loads(INFO_CACHE.read_text(encoding='utf-8')) if INFO_CACHE.exists() else {}
overrides = json.loads((ROOT / 'scripts/word-photo-overrides.json').read_text(encoding='utf-8'))
FILES_CACHE = ROOT / 'scripts/word-photo-fileinfo.json'
file_info = json.loads(FILES_CACHE.read_text(encoding='utf-8')) if FILES_CACHE.exists() else {}
cache_lock = threading.Lock()

def request(url, binary=False, attempts=3):
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'KidsLearningWordPhotos/1.0 (educational vocabulary; Wikimedia attribution included)'})
            with urllib.request.urlopen(req, timeout=45) as response:
                body = response.read()
            return body if binary else json.loads(body)
        except Exception:
            if attempt == attempts - 1:
                raise
            time.sleep(2 * (attempt + 1))

def api(domain, **params):
    return request(f'https://{domain}/w/api.php?' + urllib.parse.urlencode({'format': 'json', **params}))

def plain(value):
    return html.unescape(re.sub('<[^>]+>', '', value)).strip()

def html_info(filename):
    source = 'https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(filename.replace(' ', '_'))
    page = BeautifulSoup(request(source, True), 'html.parser')
    original = page.select_one('.fullImageLink a')['href'].split('?')[0]
    image = page.select_one('.fullImageLink img')
    licenses = page.select('.licensetpl')
    chosen = next((tag for tag in licenses if tag.select_one('.licensetpl_short') and ('CC' in tag.select_one('.licensetpl_short').get_text() or 'Public domain' in tag.select_one('.licensetpl_short').get_text())), None)
    if chosen is None:
        chosen = next((tag for tag in licenses if tag.select_one('.licensetpl_short')), None)
    if chosen is None:
        raise RuntimeError(f'No machine-readable photo licence: {filename}')
    short = chosen.select_one('.licensetpl_short').get_text(' ', strip=True)
    link = chosen.select_one('.licensetpl_link')
    attr = chosen.select_one('.licensetpl_attr') or page.select_one('#fileinfotpl_aut')
    if attr and attr.get('id') == 'fileinfotpl_aut':
        attr = attr.find_next_sibling('td')
    if not attr:
        attr = next((td.find_next_sibling('td') for td in page.select('td') if td.get_text(' ', strip=True) == 'Author'), None)
    artist = attr.get_text(' ', strip=True) if attr else ''
    if not artist and 'Public domain' not in short and 'CC0' not in short:
        raise RuntimeError(f'No photo author found: {filename}')
    thumbnail = original
    if int(image.get('data-file-width', '0')) > 500:
        thumbnail = original.replace('https://upload.wikimedia.org/wikipedia/commons/', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/') + '/500px-' + original.split('/')[-1]
    return {'url': original, 'thumburl': thumbnail, 'descriptionurl': source, 'extmetadata': {
        'LicenseShortName': {'value': short}, 'LicenseUrl': {'value': link.get_text(strip=True) if link else source},
        'Artist': {'value': artist or 'Public domain'}, 'ImageDescription': {'value': ''}
    }}

def build(row):
    category, word_id, title, explanation = row
    key = f'{category}/{word_id}'
    target = ASSETS / f'{category}-{word_id}.jpg'
    expected = overrides.get(key, article_photos.get(title, ''))
    if key in sources and target.exists() and '--refresh' not in sys.argv and (not expected or sources[key]['file'].replace('_', ' ') == expected.replace('_', ' ')):
        return key, sources[key]
    filename = overrides.get(key, article_photos.get(title, ''))
    if key in cached_choices and not filename:
        filename = cached_choices[key]['filename']
        file_info[filename] = cached_choices[key]['info']
    # Use raster photographs, never diagram SVGs. Fall back to Commons photo search.
    if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        query = re.sub(r'\s*\([^)]*\)', '', title)
        queries = {'bank': 'bank branch interior', 'lamp': 'desk lamp', 'table': 'dining table', 'exercise-book': 'school exercise book', 'compass': 'drawing compass', 'rubber': 'eraser', 'keyboard': 'electronic musical keyboard', 'scooter': 'kick scooter', 'hockey': 'field hockey', 'drum': 'musical drum', 'triangle-instrument': 'triangle percussion instrument', 'air-conditioner': 'air conditioner unit'}
        query = queries.get(word_id, query)
        result = api('commons.wikimedia.org', action='query', generator='search', gsrsearch=f'{query} filemime:image/jpeg', gsrnamespace=6, gsrlimit=5, prop='imageinfo', iiprop='url|extmetadata', iiurlwidth=500)
        candidates = list(result.get('query', {}).get('pages', {}).values())
        candidates.sort(key=lambda p: p.get('index', 999))
        if not candidates:
            raise RuntimeError(f'No photo for {key}: {title}')
        data = candidates[0]
        filename = data['title'].removeprefix('File:')
        file_info[filename] = data['imageinfo'][0]
    image_info = file_info.get(filename.replace('_', ' ')) or file_info.get(filename)
    if not image_info:
        if '--html' in sys.argv:
            image_info = html_info(filename)
        else:
            info = api('commons.wikimedia.org', action='query', titles=f'File:{filename}', prop='imageinfo', iiprop='url|extmetadata', iiurlwidth=500)
            image_info = next(iter(info['query']['pages'].values()))['imageinfo'][0]
        file_info[filename.replace('_', ' ')] = image_info
        with cache_lock:
            FILES_CACHE.write_text(json.dumps(file_info, ensure_ascii=False, indent=2), encoding='utf-8')
    metadata = image_info.get('extmetadata', {})
    licence = plain(metadata.get('LicenseShortName', {}).get('value', ''))
    if not licence or licence.lower() in ('copyrighted', 'fair use'):
        raise RuntimeError(f'Unclear licence for {key}: {filename}')
    cached_choices[key] = {'filename': filename, 'info': image_info}
    with cache_lock:
        INFO_CACHE.write_text(json.dumps(cached_choices, ensure_ascii=False, indent=2), encoding='utf-8')
    url = image_info.get('thumburl', image_info['url']).split('?')[0]
    try:
        body = request(url, True, attempts=1)
    except Exception:
        raise
    with Image.open(io.BytesIO(body)) as photo:
        photo = ImageOps.exif_transpose(photo).convert('RGB')
        photo.thumbnail((720, 560))
        photo.save(target, quality=85, optimize=True)
    record = {
        'src': f'assets/word-photos/{target.name}',
        'file': filename,
        'source': image_info['descriptionurl'],
        'artist': plain(metadata.get('Artist', {}).get('value', 'Wikimedia Commons contributor')),
        'license': licence,
        'licenseUrl': metadata.get('LicenseUrl', {}).get('value', ''),
        'original': image_info['url'],
        'article': title,
        'description': plain(metadata.get('ImageDescription', {}).get('value', ''))
    }
    print(f'PHOTO {key}: {filename}', flush=True)
    return key, record

pending = [row for row in rows if f'{row[0]}/{row[1]}' not in sources or '--refresh' in sys.argv or f'{row[0]}/{row[1]}' in overrides]
if '--html' in sys.argv:
    lead_path = ROOT / 'scripts/word-photo-leads.json'
    leads = json.loads(lead_path.read_text(encoding='utf-8')) if lead_path.exists() else {}
    def lead(row):
        title = row[2]
        if title in leads and (leads[title] or '--retry-leads' not in sys.argv):
            return title, leads[title]
        page = request('https://en.wikipedia.org/wiki/' + urllib.parse.quote(title.replace(' ', '_')), True).decode('utf-8')
        match = re.search(r'<meta property="og:image" content="([^"]+)"', page)
        name = ''
        if match and '/commons/' in match[1]:
            url = html.unescape(match[1]).split('?')[0]
            name = urllib.parse.unquote(url.split('/')[-2]) if '/thumb/' in url else urllib.parse.unquote(url.split('/')[-1])
            if not name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                name = ''
        return title, name
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for title, name in pool.map(lead, pending):
            leads[title] = name
            lead_path.write_text(json.dumps(leads, ensure_ascii=False, indent=2), encoding='utf-8')
    article_photos.update(leads)
# Batch API metadata requests to avoid hitting Wikimedia's request limits.
for offset in range(0, len(pending) if '--wikipedia' in sys.argv else 0, 40):
    titles = [row[2] for row in pending[offset:offset + 40]]
    response = api('en.wikipedia.org', action='query', titles='|'.join(titles), redirects=1, prop='pageimages', piprop='name')
    redirects = {item['from']: item['to'] for item in response.get('query', {}).get('redirects', [])}
    normalized = {item['from']: item['to'] for item in response.get('query', {}).get('normalized', [])}
    found = {p['title']: p.get('pageimage', '') for p in response['query']['pages'].values()}
    for title in titles:
        normalized_title = normalized.get(title, title)
        article_photos[title] = found.get(redirects.get(normalized_title, normalized_title), '')
    time.sleep(2)
filenames = [] if '--emit-only' in sys.argv else list(set(name for name in [*article_photos.values(), *overrides.values()] if name.lower().endswith(('.jpg', '.jpeg')) and name.replace('_', ' ') not in file_info))
for offset in range(0, len(filenames) if '--html' not in sys.argv else 0, 40):
    response = api('commons.wikimedia.org', action='query', titles='|'.join('File:' + name for name in filenames[offset:offset + 40]), prop='imageinfo', iiprop='url|extmetadata', iiurlwidth=500)
    for page in response['query']['pages'].values():
        if page.get('imageinfo'):
            file_info[page['title'].removeprefix('File:').replace('_', ' ')] = page['imageinfo'][0]
    FILES_CACHE.write_text(json.dumps(file_info, ensure_ascii=False, indent=2), encoding='utf-8')
    time.sleep(2)
failures = []
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    futures = {pool.submit(build, row): row for row in ([] if '--emit-only' in sys.argv else rows)}
    for future in concurrent.futures.as_completed(futures):
        row = futures[future]
        try:
            key, record = future.result()
            sources[key] = record
            MANIFEST.write_text(json.dumps(sources, ensure_ascii=False, indent=2), encoding='utf-8')
        except Exception as error:
            failures.append((row[0] + '/' + row[1], str(error)))
            print('FAILED', failures[-1], flush=True)

enrichment = {}
for category, word_id, _, explanation in rows:
    key = f'{category}/{word_id}'
    photo = sources.get(key)
    enrichment[key] = {'explanation': explanation, 'photo': {field: photo[field] for field in ('src', 'source', 'artist', 'license', 'licenseUrl')} if photo else None}
payload = json.dumps(enrichment, ensure_ascii=False, indent=2)
(ROOT / 'word-recognition-details.js').write_text('window.WORD_DETAILS = ' + payload + ';\n', encoding='utf-8')
print(f'Bundled {len(sources)}/{len(rows)} photos; failures: {failures}', flush=True)
if failures:
    sys.exit(1)
