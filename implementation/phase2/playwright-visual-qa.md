# Playwright Visual QA — Setup and Usage

Date added: 2026-04-26
Source: `implementation/phase2/browser-mobile-visual-qa.md`

## Why Playwright Was Added

Phase 2 includes real browser rendering, mobile layout, Leaflet map behavior,
URL-backed filter state, and mobile navigation flows that Vitest unit tests cannot
cover. Playwright automates:

- Full-page screenshots at all viewports in the route matrix
- Horizontal overflow detection (scrollWidth vs clientWidth)
- Interactive flows: search, filter, view switching, onboarding
- Mobile menu open/close and mobile search submission
- Keyboard accessibility sampling (Tab order, focus reachability)

Playwright does NOT replace human visual review for polish, color accuracy,
typography, spacing, or map tile rendering quality. It automates repeatable
browser checks and produces screenshots for human inspection.

## Structure

```
playwright.config.ts           — Playwright runner configuration
tests/
  helpers/
    visualQa.ts                — Shared utilities (viewports, routes, helpers)
  visual/
    browser-mobile-visual-qa.spec.ts  — Full QA test suite
implementation/phase2/audits/screenshots/  — Screenshot output (git-tracked)
```

## How browser-mobile-visual-qa.md Maps to the Test Suite

| Runbook Section              | Test Describe Block                              |
|------------------------------|--------------------------------------------------|
| Route Matrix                 | `Route Matrix — <viewport>` (loop, 60 tests)    |
| Browser Smoke Checks         | `Browser Smoke Checks`                           |
| Map Visual QA                | `Map Visual QA`                                  |
| Mobile Navigation QA         | `Mobile Navigation QA — mobile-390/320`          |
| Mobile Map and Filter QA     | `Mobile Map and Filter QA — 320×720`             |
| Accessibility Visual Checks  | `Accessibility Visual Checks`                    |

## Prerequisites

1. Node.js installed (project already requires this)
2. Run automated gates first:

```powershell
cmd /c npm.cmd run lint
cmd /c npx.cmd tsc --noEmit
cmd /c npm.cmd test
cmd /c npm.cmd run build
```

3. Install Playwright browsers (first time only):

```powershell
cmd /c npx.cmd playwright install chromium
```

For CI or Linux (installs system dependencies too):

```powershell
cmd /c npx.cmd playwright install --with-deps
```

4. Start the dev server in one terminal:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

## Running the Visual QA Suite

In a second terminal, run:

```powershell
cmd /c npm.cmd run test:visual
```

If port 3000 is unavailable, use port 3001:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3001
```

```powershell
cmd /c set BASE_URL=http://127.0.0.1:3001&& npm.cmd run test:visual
```

### Headed mode (see browser window):

```powershell
cmd /c npm.cmd run test:visual:headed
```

### Interactive UI mode (step through tests, inspect traces):

```powershell
cmd /c npm.cmd run test:visual:ui
```

### All Playwright tests (future suites):

```powershell
cmd /c npm.cmd run test:e2e
```

## Screenshot Output

Screenshots are saved to:

```
implementation/phase2/audits/screenshots/
```

Filename format:

```
<viewport-name>-<route-safe-name>.png
<viewport-name>-<route-safe-name>-<suffix>.png
```

Examples:

```
desktop-wide-index.png
mobile-320-map_view_map.png
laptop-map_view_map-map-qa.png
mobile-320-map_county_Starr_view_map-mobile-gap-qa.png
```

Screenshots are committed to git so they are available for review without re-running tests.

## Interpreting Failures

Each failing test produces an error message structured to match the runbook's defect format:

```
Route: /map?view=map
Viewport: 320 x 720
Browser: Chromium
Severity: Blocker
Expected: ...
Actual: ...
```

Use the error message to fill out the defect template in `browser-mobile-visual-qa.md`.

Playwright also saves:
- `trace` on first retry (viewable via `npx playwright show-trace`)
- `screenshot` on failure
- `video` on first retry

HTML report: after a test run, open `playwright-report/index.html`.

## What Playwright Automates

- Route renders without crash (HTTP < 500, no Next.js error boundary)
- Horizontal overflow (scrollWidth <= clientWidth) at all viewports
- Full-page screenshots for human visual review
- Onboarding flow: role selection, intent step appearance
- Header search: navigates to /search?q= correctly
- Map view toggle: URL params update (view=map, view=pillar, list)
- Filter: county checkbox applies URL param, Clear All removes it
- Mobile menu: opens, shows 6 links, closes
- Mobile search: overlay opens, submits to /search?q=
- Keyboard Tab: reaches search input, view toggle, filter controls, Clear All
- Leaflet container existence and visible height on map view

## What Still Requires Human Visual Review

- Map tile rendering quality (OSM tiles loaded vs blank grey)
- Actor marker color accuracy (pillar group colors)
- Marker cluster behavior at different zoom levels
- County gap marker diamond shape and numbering
- Legend readability against dark surfaces
- Text contrast accuracy
- Popup layout at different viewport sizes
- Spacing, padding, and typography polish
- Touch target size (visual assessment, not just automation)
- Any interaction that requires human judgment about "looks correct"

## Assumptions and Limitations

1. **Dev server must be running.** The test suite does not start the server automatically.
   Override BASE_URL if using a port other than 3000.

2. **Convex data required.** Tests that check search results or map content depend on
   the Convex backend having seed data. If data is missing, search result checks
   may fail with "empty main content".

3. **Leaflet renders in Chromium only.** Map visual checks use `.leaflet-container`.
   If the map library changes, update selectors accordingly.

4. **Mobile breakpoints use Tailwind classes.** The mobile menu trigger is `md:hidden`
   (visible below 768px). Tests set viewport to 390/320 and rely on Tailwind's
   responsive classes rendering correctly in Playwright's Chromium.

5. **Accessibility checks are keyboard-Tab sampling, not a WCAG audit.**
   Use axe-core or similar for a full accessibility audit.

6. **Screenshots capture the page state at test time**, which may not include
   data loaded asynchronously after initial render (Convex real-time updates).
   For complete data review, reload the page in a browser with a running server.

## Adding Future Playwright Tests

1. Create a new spec in `tests/` (e.g., `tests/smoke/homepage.spec.ts`).
2. Import helpers from `tests/helpers/visualQa.ts` if needed.
3. Run with `npm run test:e2e` or add a focused script in `package.json`.
4. The `playwright.config.ts` picks up all `**/*.spec.ts` files under `tests/`.
