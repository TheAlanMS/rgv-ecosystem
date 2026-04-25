# Phase 2 CTO / Senior Engineering Audit

Date: 2026-04-25
Auditor role: CTO and Senior Engineering Manager
Scope: `implementation/phase2/phase2-implementation.md`, `implementation/phase2/phase2-progress.md`, Phase 2 subphase docs, `implementation/9.9-remediation-roadmap.md`, `goals.md`, `README.md`, and the implemented Phase 2 code paths in `src/`.

## Executive readout

Phase 2 is functionally implemented and the automated gates are clean. The repo now has URL-backed filters, ranked search, list/map/by-pillar map views, role + intent onboarding, a mobile navigation pass, and a Vitest suite.

I would not yet call Phase 2 release-complete against the product promise. The highest-risk gaps are geographic honesty and first-class gap visibility: the map renders clustered actor markers, but it does not render county context or gap overlays, and outside-RGV actors are counted as mapped even though their markers are outside the fixed RGV viewport. Search also promises gap discovery in copy but only searches actors and pillars.

Recommended decision: mark Phase 2 as conditionally complete for engineering gates, but keep it open for a short hardening pass before using it as the baseline for later phases.

## Validation results

All automated validation passed after rerunning through Windows `.cmd` shims because PowerShell blocked `npm.ps1` and `npx.ps1`.

| Gate | Command run | Result |
| --- | --- | --- |
| Typecheck | `cmd /c npx.cmd tsc --noEmit` | Pass |
| Lint | `cmd /c npm.cmd run lint` | Pass |
| Unit tests | `cmd /c npm.cmd test` | Pass, 11 files / 35 tests |
| Build | `cmd /c npm.cmd run build` | Pass, 82 static pages generated |
| Coverage | `cmd /c npm.cmd run test:coverage` | Pass, 90.96% statements, 77.04% branches, 94.02% functions, 91.35% lines |

Manual browser and 320px visual overflow validation were not rerun in this audit. The Phase 2 progress tracker already notes Playwright snapshot/tab commands timed out during the implementation pass.

## Area assessment

| Area | Assessment | Notes |
| --- | --- | --- |
| Filters | Green | Shared filter state is URL-backed and covers pillar, county, status, org type, stage, and pillar group. |
| Search | Yellow | Actor and pillar search are implemented, ranked, and routed, but gap search is missing despite product copy and PRD intent around first-class gaps. |
| Map | Yellow/Red | List/map/pillar views exist and share actor filters. Geographic view lacks county context and gap overlays, and outside-RGV markers create misleading mapped counts. |
| Pillar view | Green | By-pillar view reuses filtered actors through `PillarAccordion`; pillar detail pages use locked filters. |
| Onboarding | Yellow | All 8 roles have intent routes, but route relevance is not behavior-tested. |
| Polish | Yellow | Touch target classes are broadly present, but mobile overflow/runtime checks are not proven by this audit. |
| Testing | Yellow | Automated suite passes and coverage is good, but route-critical client surfaces are under-tested. |
| Documentation | Yellow | `phase2-progress.md` says 24 / 24 complete while `phase2-implementation.md` and many subphase checklists still show unchecked or stale status. |

## Findings and proposed solutions

### P0: Geographic map does not meet county-context and gap-overlay intent

Evidence:
- The Phase 2 success criteria require the geographic view to use Leaflet/OpenStreetMap, marker clustering, county context, and accessible marker colors.
- `src/components/map/LeafletEcosystemMap.tsx:19-40` renders filtered actor markers over an OSM tile layer, but no county layer, density layer, gap marker layer, or gap overlay.
- `src/components/map/MapPageContent.tsx:37-99` renders gap cards below the map, filtered only by county and pillar. That keeps gaps visible on the page, but not geographically visible inside the map surface.

Impact:
- The central "ecosystem map" promise is only partially met.
- Starr and Willacy gaps are present as cards, but users cannot see underserved county context on the actual geographic map.
- Policy, EDO, and ecosystem-health users do not get the spatial diagnosis promised by the roadmap.

Proposed solution:
1. Pass `gaps` and county metadata into `EcosystemMap`.
2. Add a county context layer. Preferred: checked-in lightweight GeoJSON for Cameron, Hidalgo, Starr, and Willacy. Interim acceptable: county centroid cards/markers plus a map legend until polygons are available.
3. Render open gaps as county-level markers or shaded county overlays, distinct from actor markers.
4. Add tests that verify Starr and Willacy gaps are available to the map component even when there are no active actors.
5. Add a manual browser checklist for `/map?view=map`, `/map?county=Starr&view=map`, and `/map?county=Willacy&view=map`.

### P0: Outside-RGV actors are counted as mapped but are not usable in the RGV viewport

Evidence:
- `src/lib/data/actors/coordinates.ts:14` treats Austin, San Antonio, and Washington as outside-RGV cities.
- `src/components/map/LeafletEcosystemMap.tsx:19` maps every actor with coordinates.
- There are 6 `OutsideRGV` actor records in the seed data.
- The map is centered on the RGV at zoom 9, so Austin, San Antonio, and Washington markers are outside the useful initial map context.

Impact:
- The footer says it is showing all mapped actors, but some are not visible in the intended regional viewport.
- Users may assume those actors are missing or that the map count is inaccurate.
- This conflicts with the Phase 2 criterion that documented exceptions should be rendered as non-map list records.

Proposed solution:
1. Partition actors into `regionalActors` and `outsideRegionActors` in the map view.
2. Render only RGV actors as geographic markers by default.
3. Show outside-region partners in a clear non-map list below the map with their city and "outside-region partner" metadata.
4. Update copy from "Showing N mapped actors" to show separate regional and outside-region counts.
5. Add a test that `OutsideRGV` records are not silently counted as RGV map markers.

### P1: Search copy promises gap discovery, but gaps are not searched

Evidence:
- `src/app/search/page.tsx:17` says users can search "gaps across the Rio Grande Valley."
- `src/components/search/SearchPageContent.tsx:49-50` only calls `searchActors` and `searchPillars`.
- `src/lib/utils/search.ts:10-20` only exposes actor and pillar search utilities.

Impact:
- Users looking for "Starr", "Willacy", "angel network", or "CRM" may miss first-class gap records unless they know to visit `/map` or `/ecosystem-health`.
- This weakens the PRD goal of making gaps and underserved geographies visible.

Proposed solution:
1. Add `searchGaps(query, gaps)` to `src/lib/utils/search.ts`.
2. Pass `ALL_GAPS` into the search page.
3. Add a "Gaps" section to `SearchResults`, using `GapCard`.
4. Add tests for searching Starr, Willacy, and known gap descriptions.

### P1: Role + intent onboarding routes exist, but route relevance is not guarded by tests

Evidence:
- `src/lib/data/intents.ts:74-183` defines routes for all 8 roles.
- The file validates shape with Zod at `src/lib/data/intents.ts:220-229`, but there are no tests in `src/__tests__` covering role-intent route completeness, filter parseability, or non-empty filtered results.

Impact:
- Future route or filter changes can silently break onboarding relevance while typecheck and build still pass.
- The success criterion "Every role + intent route lands on a relevant filtered view" is subjective unless encoded as tests.

Proposed solution:
1. Add `src/__tests__/data/intents.test.ts`.
2. Assert every role has at least the expected minimum number of intents.
3. For `/map?...` routes, parse search params into filter dimensions and assert they produce either non-empty actor results or an explicitly documented gap/diagnostic route.
4. For `/journeys/[role]` routes, assert the role exists in journey data.
5. Keep the route `rationale` field and use it as required documentation in tests.

### P1: Documentation status is inconsistent with implementation status

Evidence:
- `implementation/phase2/phase2-progress.md:6-107` marks Phase 2 as 24 / 24 complete.
- `implementation/phase2/phase2-implementation.md:3` still says "Not Started."
- `implementation/phase2/phase2-implementation.md:96-111` still has unchecked success criteria, including criteria that are actually implemented and criteria that remain incomplete.
- Several subphase docs still show stale "Not Started" status even when their progress tracker rows are complete.

Impact:
- New contributors cannot tell whether unchecked items are stale docs or actual product gaps.
- This increases planning risk for Phase 3+ because the status artifact is not reliable.

Proposed solution:
1. Update `phase2-implementation.md` with a final status of "Conditionally Complete / Hardening Required."
2. Convert each success criterion to Pass, Partial, or Open with a one-line evidence note.
3. Update subphase status headers or add a single audit appendix that supersedes stale subphase checklists.

### P2: Map marker accessibility is not yet strong enough for the "accessible marker colors" claim

Evidence:
- `src/components/map/ActorMarker.tsx` uses color and radius to encode group/status.
- The map has marker titles and popups, but no visible legend, non-color encoding, or parallel accessible list tied to marker semantics.

Impact:
- Users with color-vision limitations may not understand group/status encoding.
- A map-only interaction is hard to audit with unit tests and should have visible redundancy.

Proposed solution:
1. Add a compact map legend for pillar group and status.
2. Add shape or border treatment in marker HTML so status is not color/size only.
3. Keep the filtered actor list available near the map as the accessible fallback.

### P2: Test coverage is good but not aligned to the riskiest Phase 2 workflows

Evidence:
- Tests pass and coverage is high overall.
- Existing component tests only smoke `ActorCard` and `PillarCard`.
- There are no RTL tests for `MapPageContent`, `SearchPageContent`, `OnboardingFlow`, `FilterBar` URL behavior, map view mode behavior, or role-intent route behavior.

Impact:
- The suite validates data and pure utilities well, but the highest-value user workflows can regress without failing CI.

Proposed solution:
1. Add component tests for `SearchResults` including no-result submit CTA and gap results once added.
2. Add tests for `MapPageContent` view mode selection and visible gaps.
3. Add data tests for `ROLE_INTENT_ROUTES`.
4. Add one browser smoke script or documented Playwright checklist for mobile nav/search and `/map` modes.

## Success criteria reconciliation

| Phase 2 criterion | Audit status | Evidence / gap |
| --- | --- | --- |
| `/map` supports list, geographic map, and by-pillar view | Pass | Implemented through `MapToggle` and `MapPageContent`. |
| Filter state shared by all `/map` views and persisted in URL params | Pass | `useFilters` and `view` state preserve URL params. |
| Filters cover pillar, player type, county, stage served, and status | Pass | Filter dimensions include pillar, org type, county, stage, status, and pillar group. |
| Search is global with dedicated `/search` route | Pass | Header search and `/search` route exist. |
| Search results are ranked/grouped with no-result submit CTA | Pass for actors/pillars, partial overall | Gap records are not searched. |
| Homepage uses two-step role + intent onboarding for all 8 roles | Pass | `OnboardingFlow` and `ROLE_INTENT_ROUTES` cover 8 roles. |
| Every role + intent route lands on a relevant filtered view | Partial | Routes exist, but relevance is not tested. |
| 100% actors have city-level coordinates or documented non-map exceptions | Partial | Coordinates exist, but outside-RGV records are rendered as map markers rather than non-map exceptions. |
| Geographic view uses Leaflet/OSM, clustering, county context, accessible marker colors | Partial | Leaflet/OSM/clustering exist; county context and stronger accessibility are missing. |
| Gap records remain visible in list, map, by-pillar, and health contexts | Partial | Gap cards appear on `/map` and health page; gaps are not rendered geographically and are not searchable. |
| Starr and Willacy gaps explicitly visible | Pass with caveat | Gap records exist and show in `/map` cards/health; geographic visualization is missing. |
| Mobile touch targets and no 320px overflow | Partial | Classes suggest 44px targets; browser verification was not completed. |
| Vitest covers data, queries, filters, search, slug, geography, key components | Pass with caveat | Coverage exists; route-critical client workflows need tests. |
| Lint, typecheck, build, test pass | Pass | Verified in this audit. |

## Recommended hardening plan

### Batch A: Geographic honesty and gap visibility

Files likely to change:
- `src/components/map/EcosystemMap.tsx`
- `src/components/map/LeafletEcosystemMap.tsx`
- `src/components/map/ActorMarker.tsx`
- `src/components/map/MapPageContent.tsx`
- `src/lib/data/geography.ts`
- `src/__tests__/data/actors.test.ts`
- New map/gap component tests

Acceptance:
- RGV markers and outside-region partners are counted separately.
- Starr and Willacy gap context is visible in the geographic map view.
- County context appears in the map view.
- Tests prove outside-region records are not silently treated as RGV markers.

### Batch B: Gap search and route guardrails

Files likely to change:
- `src/lib/utils/search.ts`
- `src/components/search/SearchPageContent.tsx`
- `src/components/search/SearchResults.tsx`
- `src/app/search/page.tsx`
- `src/__tests__/utils/search.test.ts`
- New `src/__tests__/data/intents.test.ts`

Acceptance:
- Search returns actors, pillars, and gaps.
- Known gap queries return expected gap records.
- Every role-intent route is tested for shape and relevance.

### Batch C: Documentation closure and visual QA

Files likely to change:
- `implementation/phase2/phase2-implementation.md`
- `implementation/phase2/phase2-progress.md`
- Possibly subphase status headers or a status appendix

Acceptance:
- Phase 2 docs use Pass/Partial/Open status, not stale checkboxes.
- Browser/mobile smoke checks are either completed or explicitly listed as remaining release work.

## CTO verdict

The engineering team delivered the bulk of Phase 2 and established a working validation foundation. The code is reasonably modular: filters are separated into a hook and pure utility layer, search is pure and testable, map rendering is isolated behind dynamic import, and seed data has schema validation.

The product risk is not basic correctness; it is trust. A map product must be especially careful about what is visible, counted, and spatially implied. Before Phase 2 is treated as complete, close the gaps around county context, gap geography, outside-region actor handling, and search coverage for gaps.

