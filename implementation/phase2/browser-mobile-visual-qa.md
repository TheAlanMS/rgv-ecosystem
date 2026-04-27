# Phase 2 Browser and Mobile Visual QA Runbook

Date prepared: 2026-04-25

Purpose: close the remaining Phase 2 release risk by checking real browser rendering, mobile layout, map behavior, and visual overflow that automated unit tests do not prove.

## Scope

This pass covers the Phase 2 interactive surfaces:

- homepage role + intent onboarding
- global header search and mobile navigation
- `/search` results and empty states
- `/map` list, map, and by-pillar views
- filters, sorting, URL-backed state, and clear-filter behavior
- geographic map markers, county gap markers, and legends
- representative role journey pages
- ecosystem health gap visibility

Do not use this runbook to add new product requirements. Record defects, fix blocking regressions, and rerun the affected checks.

## Preconditions

Run the automated gates first:

```powershell
cmd /c npm.cmd run lint
cmd /c npx.cmd tsc --noEmit
cmd /c npm.cmd test
cmd /c npm.cmd run build
```

Start a local server:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

If port `3000` is already in use, choose the next open port and replace the base URL below.

Base URL:

```text
http://127.0.0.1:3000
```

## Viewports

Check at least these viewport widths:

```text
Desktop wide      1440 x 900
Laptop            1280 x 800
Tablet             768 x 1024
Mobile baseline    390 x 844
Mobile minimum     320 x 720
```

The 320px pass is required before Phase 2 can be marked visually complete.

## Visual Heuristics

Use this quick model while scanning every page:

```text
PASS
+------------------------------------------------+
| Header fits. No hidden horizontal content.     |
| Controls are reachable and do not overlap.     |
| Text wraps inside its container.               |
| Empty states and cards have clear spacing.     |
+------------------------------------------------+

FAIL
+------------------------------------------------+
| Header item pushed off-screen ---------------> |
| Button label clips or overlaps another control |
| Map/list/filter panel creates side scrolling   |
| Text sits on top of later content              |
+------------------------------------------------+
```

Check both visual appearance and interaction. A page that looks correct but cannot be used with touch-sized controls is not a pass.

## Route Matrix

| Route | Desktop | Tablet | 390px | 320px | Notes |
|-------|---------|--------|-------|-------|-------|
| `/` |  |  |  | Pass | Role + intent onboarding, header, footer |
| `/search` |  |  |  |  | Blank-query prompt |
| `/search?q=capital` |  |  |  |  | Actor/pillar/gap grouped results |
| `/search?q=starr` |  |  |  |  | Gap result visibility |
| `/map` |  |  |  |  | List view, filters, sorting |
| `/map?view=map` |  |  |  |  | Leaflet map, actor markers, gap markers, legends |
| `/map?view=pillar` |  |  |  |  | By-pillar accordion |
| `/map?county=Starr&view=map` |  |  |  |  | Starr gap context with low actor coverage |
| `/map?county=Willacy&view=map` |  |  |  |  | Willacy gap context with low actor coverage |
| `/journeys/startup` |  |  |  |  | Journey steps and pillar links |
| `/journeys/investor` |  |  |  |  | Alternate role journey |
| `/ecosystem-health` |  |  |  |  | Gap visibility and metric layout |

Mark each cell `Pass`, `Fail`, or `N/A`. If a cell fails, record the defect with route, viewport, browser, and screenshot path.

## Browser Smoke Checks

Run in Chromium first. Repeat critical failures in Firefox or Edge if the issue appears browser-specific.

1. Open `/`.
2. Confirm the header does not wrap awkwardly or overflow.
3. Use the role + intent onboarding flow.
4. Confirm the selected path lands on the expected route.
5. Use header search for `capital`.
6. Confirm `/search?q=capital` renders grouped results.
7. Search for `starr`.
8. Confirm at least one gap result is visible.
9. Open `/map`.
10. Apply and clear a county filter.
11. Switch between list, map, and by-pillar views.
12. Confirm URL params update without losing selected filters.

Expected interaction flow:

```text
Home
  |
  v
Role selected -> Intent selected -> Target route
                                      |
                                      v
                           /map, /journeys/[role],
                           /search, or /ecosystem-health
```

## Map Visual QA

Open `/map?view=map`.

Check:

- Leaflet tiles render and the map is not blank.
- Actor markers are visible in the RGV viewport.
- Marker clusters appear when zoomed out or dense.
- County gap markers appear as numbered diamonds.
- Starr and Willacy remain visible as gap context even when actor coverage is low.
- Actor marker legend is visible.
- Status legend is visible.
- County gap marker legend is visible.
- Copy clearly says county gap markers are centroid context, not exact addresses.
- Popups open and do not overflow the viewport.

Expected map information hierarchy:

```text
+------------------------------------------------+
| Leaflet / OSM map                              |
|                                                |
|   o actor marker                               |
|      <> numbered county gap marker             |
|                                                |
+------------------------------------------------+
| Actor markers legend | Marker status legend    |
| County gap marker explanation                  |
| Mapped actor / outside-region count            |
| County actor + open-gap summaries              |
+------------------------------------------------+
```

Marker meaning:

```text
Actor color       = pillar group
Actor border      = status
Actor size        = status emphasis
Diamond + number  = county-level open gap count
```

Fail the check if marker meaning depends only on color.

## Mobile Navigation QA

At 390px and 320px:

1. Open `/`.
2. Confirm the desktop nav is replaced by the mobile menu trigger.
3. Open and close the mobile menu.
4. Tap each visible nav link.
5. Open mobile search.
6. Enter `capital`.
7. Submit the search.
8. Return to `/map`.

Expected mobile header shape:

```text
+--------------------------------+
| Brand                    [=]   |
|                         Search |
+--------------------------------+
```

Fail the check if:

- the menu trigger is below the header row without intent
- the search overlay covers controls without a close path
- tapping outside leaves the UI in an unusable state
- any header text clips at 320px

## Mobile Map and Filter QA

At 320px, open `/map?view=map`.

Check:

- no horizontal page scroll
- filter controls fit in a single-column flow
- sort and view controls stack cleanly
- map has stable height and does not cover the legends
- legends wrap without text clipping
- county summaries stack without overflowing
- gap cards below the map remain readable

Expected mobile map stack:

```text
+------------------------------+
| Filters                      |
+------------------------------+
| Showing count                |
| Sort                         |
| View toggle                  |
+------------------------------+
| Map                          |
|                              |
+------------------------------+
| Legends                      |
| County summaries             |
+------------------------------+
| Visible ecosystem gaps       |
+------------------------------+
```

Fail the check if any control or card forces the viewport wider than 320px.

## Accessibility Visual Checks

This is not a full accessibility audit, but the visual QA pass must verify:

- all buttons and controls are practical touch targets
- keyboard focus is visible on header, search, filters, map view toggle, and clear buttons
- marker semantics are repeated in visible text legends
- color is not the only way to distinguish marker status
- popup links are reachable by keyboard after opening a marker
- text contrast appears readable against dark surfaces

Keyboard path to sample:

```text
Tab -> Header search -> Nav links -> Filters -> Sort -> View toggle -> Cards
```

Record any trap, skipped control, or invisible focus state as a defect.

## Defect Template

Use this format for every issue:

```markdown
### [Route] Short defect title

- Viewport: 320 x 720
- Browser: Chromium
- Route: `/map?county=Starr&view=map`
- Severity: Blocker | High | Medium | Low
- Screenshot: `implementation/phase2/audits/screenshots/<file>.png`
- Expected: What should happen.
- Actual: What happened.
- Notes: Any reproduction detail or suspected component.
```

Severity guidance:

```text
Blocker  Page unusable, route crashes, map blank, or mobile layout impossible.
High     Core workflow works only with major visual/interaction problems.
Medium   Noticeable polish issue that does not block completion.
Low      Minor spacing, copy wrapping, or visual consistency issue.
```

## Closure Criteria

Phase 2 browser/mobile visual QA can be marked complete when:

- all route matrix cells are marked Pass or have accepted non-blocking defects
- `/map?view=map` renders map tiles, actor markers, county gap markers, and legends
- `/map?county=Starr&view=map` and `/map?county=Willacy&view=map` make gap context visible
- 320px mobile checks show no horizontal overflow
- mobile nav and mobile search are usable
- blocking and high-severity visual defects are fixed and rechecked
- the final results are summarized in `implementation/phase2/phase2-progress.md`

## Defects Found — 2026-04-26 Playwright Run

The following defects were surfaced by the automated Playwright visual QA run.

---

### [/map?view=map] Leaflet map container does not render

- Viewport: 1280 x 800
- Browser: Chromium
- Route: `/map?view=map`
- Severity: Blocker
- Screenshot: `implementation/phase2/audits/screenshots/laptop-map_view_map.png`
- Expected: `.leaflet-container` element visible in DOM when `?view=map` query param is set.
- Actual: 0 elements matching `.leaflet-container` found. Map view renders without the Leaflet container.
- Notes: Likely a Next.js SSR/dynamic-import issue. Wrap the Leaflet map component in `next/dynamic` with `{ ssr: false }`.

---

### [/] Onboarding intent step does not expose `button[aria-pressed]`

- Viewport: 1280 x 800
- Browser: Chromium
- Route: `/`
- Severity: High
- Screenshot: `implementation/phase2/audits/screenshots/laptop-index.png`
- Expected: After selecting a role, the intent step renders `<button aria-pressed>` elements inside the onboarding region.
- Actual: `button[aria-pressed]` not found within the onboarding region after role selection.
- Notes: `IntentStep` component likely does not apply `aria-pressed` to its option buttons. Add `aria-pressed` for accessibility and automation.

---

### [/map] County checkbox click does not change state

- Viewport: 1280 x 800
- Browser: Chromium
- Route: `/map`
- Severity: High
- Screenshot: `implementation/phase2/audits/screenshots/laptop-map.png`
- Expected: Checking the Starr county checkbox appends `county=Starr` to the URL.
- Actual: Playwright's `locator.check()` reported "Clicking the checkbox did not change its state." The checkbox is visible and enabled but toggling has no effect.
- Notes: The `<input type="checkbox">` in FilterBar is a controlled component. Check that the `onChange` handler correctly fires and the router push is called.

---

### [/] Mobile nav backdrop shares "Close navigation" label with X button

- Viewport: 390 x 844 and 320 x 720
- Browser: Chromium
- Route: `/`
- Severity: Medium
- Screenshot: `implementation/phase2/audits/screenshots/mobile-390-index.png`
- Expected: Exactly one element matches `aria-label="Close navigation"` when the mobile menu is open.
- Actual: Two elements match — the X icon button and the full-screen backdrop overlay both carry `aria-label="Close navigation"`. Playwright strict mode rejects the ambiguous locator.
- Notes: The backdrop overlay is a visual affordance that closes the drawer. It should use `aria-hidden="true"` or a different label (e.g., `aria-label="Dismiss navigation"`) to avoid the ambiguity.
