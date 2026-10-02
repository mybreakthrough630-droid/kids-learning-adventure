const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
for (const file of ['word-recognition-data.js', 'word-recognition-extra-data.js', 'word-recognition-details.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}
const targetCategories = ['stationery', 'daily-items', 'furniture', 'transport', 'sports', 'instruments', 'appliances', 'places'];
const details = sandbox.window.WORD_DETAILS;
const sources = JSON.parse(fs.readFileSync(path.join(root, 'assets/word-photos/sources.json'), 'utf8'));
const overrides = JSON.parse(fs.readFileSync(path.join(root, 'scripts/word-photo-overrides.json'), 'utf8'));
for (const [key, filename] of Object.entries(overrides)) {
  assert.equal(sources[key].file.replaceAll('_', ' '), filename.replaceAll('_', ' '), `${key}: reviewed photo override not applied`);
}
let count = 0;
for (const category of targetCategories) {
  const items = sandbox.window.WORD_LIBRARY.items[category];
  assert.equal(items.length, 25, `${category} retains all 25 words`);
  for (const item of items) {
    const key = `${category}/${item.id}`;
    const detail = details[key];
    assert.ok(detail, `${key}: explanation missing`);
    assert.ok(detail.explanation.length >= 30, `${key}: definition too brief`);
    assert.ok(detail.photo, `${key}: photo missing`);
    assert.match(detail.photo.src, /^assets\/word-photos\/[a-z0-9-]+\.jpg$/);
    assert.ok(fs.statSync(path.join(root, detail.photo.src)).size > 1000, `${key}: photo file missing or empty`);
    assert.match(detail.photo.source, /^https:\/\/commons.wikimedia.org\//);
    assert.ok(detail.photo.artist && detail.photo.license, `${key}: credit missing`);
    count++;
  }
}
assert.equal(count, 200);
assert.equal(Object.keys(details).length, count, 'No unknown vocabulary IDs');
assert.match(details['appliances/cooker'].explanation, /煤氣和電力/);
for (const page of ['chinese-word-recognition.html', 'english-word-recognition.html']) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(html, /id="photoPanel" hidden/);
  assert.match(html, /id="wordPhoto"[^>]+ hidden/);
  assert.match(html, /aria-controls="photoPanel"/);
  assert.ok(html.indexOf('word-recognition-details.js') < html.indexOf('src="word-recognition.js'));
}
console.log(`PASS: ${count} words in 8 categories; detailed definitions, bundled JPEG photos, source credits, both language pages.`);
