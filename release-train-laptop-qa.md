# Train laptop controls correction — 2026-10-02

User clarified that the affected controls are Start and Check Answer, not the carriage panels. Scope is the train only; original raster artwork and all puzzle timings are unchanged.

Cause: the original train board filled its wrapper with absolute positioning; the carriage row, status, answer panel and footer were placed at percentages of viewport-derived height. In a 1366×400 viewport, carriage graphics and status visibly overlapped the toolbar. Carriages remain intentionally non-interactive display cells; answers are entered via the palette.

Correction: train status, board, answer panel and footer now follow document content flow. Short windows scroll to the answer controls instead of compressing them into the toolbar. Eight desktop carriage positions remain available, while phones keep the four-column wrap. Narrow laptop headers reserve space for the Back control. A ResizeObserver registers the decorative background railway to the actual carriage wheel row after resize/content changes; it never moves a control or hitbox. Images remain untouched. Train CSS/script cache versions are 20261002a.

Browser checks: actual 1366×600, 1024×600 and 1280×720 viewports; Start clicked, palette answers filled and Check clicked, each producing per-slot feedback. Original 1366×400 overlap captured in review/train-laptop-short-before.png; fixed scenery alignment reviewed in review/train-laptop-fixed-rail.png. No force clicks or DOM writes were used. Further narrow/short checks and public deployment are recorded in local review evidence.

Regression: scripts/test-train-layout.cjs validates optical registration for all 64 shape/carriage combinations and the new content-flow rules; test-fairytale.cjs, test-adventure.cjs, test-matching.cjs and test-site-navigation.cjs passed. Source check has no whitespace errors. Other pages retain their layouts; all new selectors and railway registration are train-scoped.
