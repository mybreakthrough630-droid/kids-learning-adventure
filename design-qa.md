# Approved-style implementation QA — 2026-10-01

Scope: bottom subject navigation, four independent memory game pages, and FOUR complete spot-difference pairs. The requested total of20pairs is NOT complete;16remaining pairs are excluded from gameplay. Draft scene05–07originals remain local only. Earlier sample review is superseded by this scoped release.

## Evidence and normalization

- Approved train source: assets/fairytale/reference-train.png,1672×941.
- Approved four-game source: review/four-game-reference.png,1536×1024, preserved original approved image.
- Desktop browser evidence: review/candy-answer-final.png, review/animals-observe.png, review/menu-final.png, review/human-pair.png and review/navigation.png.
- Desktop CSS viewport1280×720; full-page screenshots include vertical overflow and omit native scrollbar, typically1264–1265pxwide. Images retain their aspect ratios. No claim of pixel-exact reconstruction.
- Combined reference + implementation: review/comparison-update.html and review/comparison-update.png (minimum1540pxwide comparison canvas). Both full-view source and implementation are in the SAME input. Focused row shows reference candy panel against implemented bitmap choices/native controls.
- Equivalent state: five-star eight-position observation/filled recall vs reference artwork. Four-panel mock is intentionally decomposed into separate pages, as requested.
- Mobile: review/candy-mobile.png and review/animals-mobile.png; actual visible preview tab DOM390×844, document width375pxwith scrollbar, no horizontal overflow. Earlier virtual-tab captures defaulted1280×720 and were rejected/replaced.
- Bottom navigation mobile: review/navigation-mobile.png; navTop872.83 > iframeBottom809.5. Desktop navTop876.58 > iframeBottom813.25. Static navigation, never fixed overlay.
- Human direction: original/changed scene02–04PNG pairs each1536×1024, fictional near-photorealistic people, naturally lit close compositions. review/human-pair.png shows original and edited picture together.
- Train evidence retained: review/train.png and prior output/valerie-hilary-preview/repair-comparison-approved.png, repair-success.png; previously verified restored train style.

## Comparison history

1. Prior implementation P1: flat SVG/washed objects and wrong visual direction; P0: one PNG plus floating icons counted as differences. Fixed with reference-directed glossy3D raster atlases/backgrounds and genuinely edited opaque PNG pairs. Disabled observation slots opacity1.
2. Earlier train P2: squat single-color wagons and misplaced wheels/answer tray. Replaced eight-color square-cell upright atlas, aligned track and reserved all eight positions. Existing train QA passed.
3. This release first desktop candy capture P1: background hidden by later shared CSS; P2: status overlapping toolbar/number badges. Fixed by final higher-specificity background rule,500pxdesktop brand, flow-layout status and moving candy slots to47%viewportheight. Recaptured final implementation and rebuilt side-by-side comparison.
4. Mobile validation: use actual native preview tab, not default-size virtual tabs. Verified390pxviewport, all8positions and reachable choices/action buttons in normal scroll flow.

## Required fidelity surfaces

- Typography: same generated multicolor brand sign, Chinese Microsoft JhengHei/Segoe UI native functional copy, warm bold titles. Labels readable and not truncated. Functional native text intentionally differs from static decorative mock.
- Layout/spacing: dedicated game page per request. Candy has large bunny shop backdrop, eight counter positions and bottom answer tray. Animals use eight colorful cottages in four-column/two-row grid, full-bodied animal sprites at doors. Desktop train reserves eight connected wagons. Mobile uses normal flow without clipped controls. Main subject menu moved below iframe with all15activities preserved; switching restores focus/scroll to the activity.
- Colors/tokens: rich saturated glossy3D objects, warm ivory/gold controls; colored object interiors opaque. Text plus marks identify correct/incorrect answers rather than relying on color alone.
- Image quality: all game artwork supplied by genuine imagegen PNG assets. Regular4×2 atlases maintain square cells and intended sprite composition. No flat SVG, emoji or CSS drawings substitute for the approved artwork. Transparent surrounds only; paired scenes fully opaque and unzoomed to preserve hit coordinates. Human scenes near-real, not cartoon replacements. Small texture variations from image editing are not additional answers.
- Copy/content: exact brand, five levels,3/4/5/6/8positions, highest sequence durations.5/1/2secondsrandom,12/8/5second higher-level scene observation, explicit Next after success. Counts correctly show four complete scene pairs, not20. Each pair has6intrinsic changes, with hidden transparent answer regions until found.
- Accessibility: named choices, status live region, dialog focus/keyboard trap/Escape, reduced-motion handling and sound toggle retained. Thin bench/water-bottle hit regions enlarged for easier tapping.

## Interactions and checks

- node scripts/test-fairytale.cjs passed: all4games ×5levels, eight capacity, raster choices, correct/incorrect feedback, undo, retry, explicit Next, four valid scene pairs, six changes and cyclic scene navigation.
- node scripts/test-adventure.cjs passed: original engine regression20mode/levelcombinations.
- node scripts/test-site-navigation.cjs passed: exactly one menu after iframe, all15activities, source/title/direct link synchronization, focus/scroll/reduced motion.
- Browser animals: observed and recalled all8real visible names; eight correct position marks, success and no automatic round advance.
- Browser candy:8choices filled, wrong-answer result/review, retry available. Native action buttons inside desktop viewport (bottom approximately703pxat720pxheight).
- Browser differences: six region clicks completed bus and school scenes, success dialog, explicit Next advanced to next scene. Correct original/changedPNGsources and no visible floating objects.
- Browser bottom menu: shape train target confirmed memory-train.html?v=20261001d, focus on stageTitle and navBelowFrame=true.
- Browser error logs: train/prior, candy, animals and differences returned no error entries. Sound generation retained/tested by UI/engine; actual audible playback not independently recorded.
- git diff --check: no whitespace errors, only existing CRLF normalization warnings.

## Remaining scope and acceptable differences

No actionable P0/P1/P2 findings in the scoped release. Native control positions and generated fine ornament details intentionally differ from static mock; separate pages intentionally replace the four-panel composition. Animal page uses quieter cream board to keep all8homes legible.
P3: fine texture variation is expected in generated pairs; no pixel-identical-outside-edits claim. Sound quality not independently recorded.
Remaining16pairs are unfinished due production interruption, not claimed as part of this pass. Do not expose unpaired drafts as playable questions.

Publication verification: commit154b05bd733b3cdf07ab338ee849e04c90372cfa pushed non-force to main. Public GitHub Pages checked after deployment: bottomMenu=true, navTop876.58 > frameBottom813.25; both bus-pairPNGsloaded1536×1024; six live clicks produced success; candy background and branded art loaded, no console errors. Evidence: review/live-human-pair.png and review/live-candy.png. Primary checkout user edits remained unchanged.

Implementation checklist: scoped local and public verification complete. Remaining16pairs are not complete.

## Follow-up: train artwork registration correction

User reported distorted-looking wagon symbols and misplaced gemstone. Before evidence: review/train-before-alignment.png,1280×720CSSviewport (1264×724full capture). All source sprite boxes were87.42×87.42px, so the browser was not independently stretching width/height. P1 was actual panel overflow/occlusion:70%-wide sprites covered the short cream panel, frame and wheels; asymmetric transparent padding shifted the visible diamond relative to the panel.

Kept both original PNGs unchanged. Measured solid-alpha sprite bounds (A>=200) without modifying pixels; each shape now uses its actual visible centre and each carriage its cream-panel centre. Uniform42% square-cell fit keeps all64shape/wagon combinations within cream x25–85%,y31–66%, with no roof/wheel overlap. This is visible-art registration, not a new drawing or nonuniform stretch.

Post-fix evidence: review/train-after-alignment.png and review/train-alignment-comparison.png, produced by review/train-alignment-comparison.html. SAME combined input contains approved source, before/after full views and focused train rows. Source1672×941retains aspect ratio; implementation desktop1280×720retains aspect ratio in equal-width columns. Approved static eight-shape display is compared to the equivalent filled eight-slot answer state. Every symbol is inside the cream panel, and blue diamond centred.

Desktop rendered sprite boxes52.4479×52.4479px; mobile390×844boxes35.1354×35.1354px. No independent-axis scaling. True mobile full-page evidence: review/train-alignment-mobile.png; document375pxwith native scrollbar, no horizontal overflow. Initial stale viewport override was rejected and replaced using a fresh viewport handler.

Fidelity surfaces: fonts/brand/copy unchanged; spacing limited to wagon art registration, eight slots retained; colors/opacity/PNGquality unchanged; same rich3Dtoy direction preserved. Carriage cream panels are shorter than the mock and symbols therefore fit smaller—existing regenerated-art proportion is retained, not silently claimed pixel-identical. No current P0/P1/P2 in this scoped alignment fix.

Tests: scripts/test-train-layout.cjs verifies square atlas cells, actual visible centres and64in-panel combinations. Existing fairytale/adventure/navigation suites pass. Browser geometry checked for every shape at desktop/mobile, error logs empty. Shared stylesheets cache version bumped to20261001e; scene/game logic and other assets unchanged. Remaining16scene pairs still unfinished.

final result: passed

## Follow-up: three non-colour scene pairs (2026-10-01)

Scope: add beach, animal farm and candy shop to the four already playable pairs. Seven pairs are now complete; thirteen of the originally requested twenty remain unfinished. No claim of twenty completed scenes. New human scene is near-photorealistic; animals/shop retain the approved glossy 3D style.

All eighteen intrinsic edits visually checked against original PNGs: beach hat ribbon removed, ball becomes ring, bucket handle removed, shovel direction reversed, one sandcastle turret removed, one boat sail removed; farm square window becomes round, bucket handle removed, five bandana dots added, carrot becomes pumpkin, bone added inside bowl, one apple removed; shop hat type changed, bow loops removed, round packet becomes rectangular, lollipop spiral mirrored, frosting sprinkles removed, one cherry added. Differences are actual scene content, not floating icons or colour-only substitutions. All six new PNGs are opaque 1536x1024. Full prompts, source filenames and workspace asset paths: assets/fairytale/scenes/varied-scenes-production.md.

Source/implementation evidence: review/varied-pairs.png and review/varied-implementation-comparison.png, generated by the corresponding review HTML files. The same comparison input contains direct original/changed pairs and actual game renders for all three scenes. Rendered content preserves the source crop and 3:2 image content; borders account for fractional DOM box dimensions. No washed-out transparency, placeholder SVG objects, body distortion or missing target assets.

Mandatory surfaces: typography, branded headers and native controls unchanged; seven scene labels fit at desktop/tablet/mobile without collisions or horizontal overflow. Spacing preserves two desktop panels, one-column mobile panels and deliberate Next. Palette, shadows and contrast unchanged. Content and footer accurately state seven pairs and multiple change categories. Raster image quality and intrinsic edits verified at source and page scale. Existing semantic image alt text, accessible position-button labels, focus and reduced-motion handling retained. New mobile hit regions remain at least26px wide and29px tall; small sail/turret targets are more comfortable on desktop/tablet, but do not overlap other answer centres. No current P0/P1/P2 scoped findings. P3: generated fine texture variation is accepted, not treated as extra answers; audio retained but not independently recorded.

Actual viewports: desktop1280x720, mobile390x844(document375px), tablet768x1024(document753px), no horizontal overflow. Mobile evidence review/varied-mobile.png; tablet review/varied-tablet.png. Browser all eighteen new region clicks reached success and explicit Next, scene7 cycles to scene1. Five-star game observed original visible first and hidden after5seconds, with changed scene and six position controls then visible. All new images loaded1536x1024, browser errors empty.

Tests passed: test-fairytale (all7realpairs, six changes each, metadata coordinates match runtime, non-colour categories, PNG dimensions, cyclic Next); test-adventure; test-train-layout (unchanged64shape/wagon fits); test-site-navigation (all15buttons below iframe). git diff --check passes. Primary user-edited checkout is not modified; only the separate release worktree is committed.

final result: passed
