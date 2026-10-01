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

Implementation checklist: scoped local visual/functional QA complete; preserve primary checkout user edits; publish only tested assets/pages and verify public result.

final result: passed
