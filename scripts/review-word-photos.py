"""Produce labelled contact sheets for manual photo/word matching review."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
sources = json.loads((root / 'assets/word-photos/sources.json').read_text(encoding='utf-8'))
rows = [line.split('|') for line in (root / 'scripts/word-details.tsv').read_text(encoding='utf-8').splitlines() if line and not line.startswith('#')]
out = root / 'tmp/photo-review'
out.mkdir(parents=True, exist_ok=True)
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 15)
for category in dict.fromkeys(row[0] for row in rows):
    category_rows = [r for r in rows if r[0] == category]
    sheet = Image.new('RGB', (1100, 1100), 'white')
    draw = ImageDraw.Draw(sheet)
    for index, (_, word_id, title, _) in enumerate(category_rows):
        x, y = index % 5 * 220, index // 5 * 220
        key = f'{category}/{word_id}'
        if key in sources:
            with Image.open(root / sources[key]['src']) as photo:
                photo.thumbnail((210, 170))
                sheet.paste(photo, (x + (220-photo.width)//2, y + (175-photo.height)//2))
        draw.text((x + 5, y + 180), word_id, fill='black', font=font)
        draw.text((x + 5, y + 200), title[:24], fill='grey', font=font)
    sheet.save(out / f'{category}.jpg')
print(out)
