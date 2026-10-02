# Vocabulary photographs

200 locally bundled JPEG photographs illustrate the eight requested vocabulary categories.
The original photographs are from Wikimedia Commons. They are resized and JPEG-encoded;
the scene content has not been changed. Each photograph retains its original licence.

`sources.json` records each original file title, author, source page, original URL,
licence name, and licence URL. The word card displays the author and clickable source
and licence links when the learner reveals the photograph.

The photo is an example, not a claim that all items of that kind look exactly the same.
Sports show the activity; places show representative real locations, not necessarily Hong Kong.

## Maintenance

- Definitions and article references: `scripts/word-details.tsv`.
- Manually reviewed alternative photographs: `scripts/word-photo-overrides.json`.
- Python dependencies: Pillow and beautifulsoup4.
- Build: `python scripts/build-word-photos.py --html`.
- Regenerate JavaScript without downloading: `python scripts/build-word-photos.py --emit-only`.
- Contact sheets for mandatory visual pairing review: `python scripts/review-word-photos.py`.
- Data and asset tests: `node scripts/test-word-details.cjs`.

Review every changed photograph visually before publishing. Do not trust a search ranking
or a Wikipedia lead image alone: these sometimes show diagrams, software, historical
paintings, or unrelated meanings of the same word. No third-party image requests are made
by the learner's page; only the current local photo loads after clicking the reveal button.
