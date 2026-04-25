# Phase 2 CTO / Senior Engineering Audit

Date: 2026-04-25
Auditor role: CTO and Senior Engineering Manager
Scope: `implementation/phase2/phase2-implementation.md`, `implementation/phase2/phase2-progress.md`, Phase 2 subphase docs, `implementation/9.9-remediation-roadmap.md`, `goals.md`, `README.md`, and the implemented Phase 2 code paths in `src/`.

## Executive readout

Phase 2 is functionally implemented and the automated gates are clean. The repo now has URL-backed filters, ranked actor/pillar/gap search, list/map/by-pillar map views, role + intent onboarding with route relevance tests, outside-RGV map separation, a mobile navigation pass, and a Vitest suite.

I would not yet call Phase 2 release-complete against the full product promise. The remaining hardening gaps are narrower: visual QA is intentionally deferred, and the map still needs stronger county/gap geographic context plus marker accessibility work before the geographic surface fully earns the trust claims in the PRD.

Recommended decision: treat hardening items 1-3 as complete after the 2026-04-25 closeout pass, then finish hardening items 4-5 before changing Phase 2 from Partial to Complete. Visual QA can remain a separate deferred release check if product leadership accepts that risk.

## Validation results

All automated validation passed after rerunning through Windows `.cmd` shims because PowerShell blocked `npm.ps1` and `npx.ps1`.

| Gate | Command run | Result |
| --- | --- | --- |
| Typecheck | `cmd /c npx.cmd tsc --noEmit` | Pass |
| Lint | `cmd /c npm.cmd run lint` | Pass |
| Unit tests | `cmd /c npm.cmd test` | Pass, 14 files / 52 tests after hardening items 1-3 |
| Build | `cmd /c npm.cmd run build` | Pass, 82 static pages generated |
| Coverage | `cmd /c npm.cmd run test:coverage` | Pass, 90.96% statements, 77.04% branches, 94.02% functions, 91.35% lines |

Manual browser and 320px visual overflow validation were not rerun in this audit. The Phase 2 progress tracker already notes Playwright snapshot/tab commands timed out during the implementation pass.

## Hardening closeout tracker

| Item | Status | Evidence / remaining work |
| --- | --- | --- |
| 1. Gap search integration | Complete | `searchGaps`, `/search` gap wiring, `SearchResults` gap rendering, utility tests, and `SearchResults` gap-only regression coverage are in place. |
| 2. Role + intent relevance tests | Complete | `intents.test.ts` validates exposed onboarding intents, destination rules, strict map query params, non-empty actor/gap results, and selected-role journey routing. |
| 3. Outside-RGV map handling | Complete | `getGeographicMapContext` separates RGV markers from outside-region partners, `LeafletEcosystemMap` plots only RGV actors, `ActorMarker` defensively refuses `OutsideRGV` actors, and regression tests preserve list visibility. |
| 4. County/gap map context | Complete | County summaries now include centroid metadata and open gap lists; the geographic map renders numbered county centroid markers for open gaps. |
| 5. Marker accessibility | Complete | The map now has visible actor/status/gap legends, and actor status uses border style in addition to marker size. |

## Area assessment

| Area | Assessment | Notes |
| --- | --- | --- |
| Filters | Green | Shared filter state is URL-backed and covers pillar, county, status, org type, stage, and pillar group. |
| Search | Green | Actor, pillar, and gap search are implemented, ranked, routed, rendered, and covered by utility/component tests. |
| Map | Green | List/map/pillar views exist and share actor filters. Outside-RGV actors are separated from RGV map markers; county-level open-gap markers and marker accessibility legends are in place. |
| Pillar view | Green | By-pillar view reuses filtered actors through `PillarAccordion`; pillar detail pages use locked filters. |
| Onboarding | Green | All 8 roles have intent routes, and route relevance/parseability is guarded by data tests. |
| Polish | Yellow | Touch target classes are broadly present, but mobile overflow/runtime checks are not proven by this audit. |
| Testing | Yellow/Green | Automated suite passes and now covers the main hardening items; browser/mobile visual QA remains deferred. |
| Documentation | Green | Phase closure docs now separate delivered implementation from remaining hardening and visual QA work. |

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

### P0: Outside-RGV actors are counted as mapped but are not usable in the RGV viewport - closed in hardening item 3

Evidence:
- Original audit finding: outside-region actors could be counted like normal mapped records even though Austin, San Antonio, and Washington are outside the useful RGV viewport.
- `getGeographicMapContext` now partitions actors into RGV marker candidates and outside-region partners.
- `LeafletEcosystemMap` renders only RGV actors as map markers and reports outside-region partners separately.
- `ActorMarker` now has a defensive `OutsideRGV` guard if a future caller bypasses the map-context partition.

Impact:
- This hardening pass removes the misleading RGV marker count risk.
- Outside-region partners remain available in list/pillar contexts instead of being plotted as regional map markers.

Closure:
1. Actors are partitioned through `getGeographicMapContext`.
2. Only RGV actors are rendered as geographic markers.
3. Outside-region partners are counted separately in map copy and remain visible in list views.
4. Tests prove outside-region records are not silently treated as RGV markers.

### P1: Search copy promised gap discovery before gaps were searched - closed in hardening item 1

Evidence:
- Original audit finding: search promised gap discovery but only searched actors and pillars.
- `searchGaps` indexes gap ids, descriptions, counties, status, source metadata, pillar ids, and linked pillar metadata.
- `/search` passes `ALL_GAPS` into `SearchPageContent`.
- `SearchResults` renders a dedicated gap section and treats gap-only matches as valid results.

Impact:
- Users can find first-class gap records through normal search flows.
- Known gap queries such as Starr, Willacy, angel network, and shared CRM are covered by tests.

Closure:
1. `searchGaps(query, gaps)` is implemented.
2. `ALL_GAPS` is passed into the search page.
3. `SearchResults` renders a `Gaps` section with `GapCard`.
4. Utility and component tests cover known gap queries and gap-only rendered results.

### P1: Role + intent onboarding routes needed relevance tests - closed in hardening item 2

Evidence:
- Original audit finding: role-intent routes existed, but relevance was not guarded beyond Zod shape validation.
- `src/__tests__/data/intents.test.ts` now covers route schema, known surfaces, map route actor/gap relevance, strict filter parsing, destination rules, and selected-role journey routing.

Impact:
- Future route or filter changes that silently break onboarding relevance should now fail tests.
- The success criterion is grounded in data-contract tests instead of remaining subjective.

Closure:
1. `src/__tests__/data/intents.test.ts` exists and now covers exposed onboarding intents.
2. `/map?...` routes are strictly parsed and must produce actor or explicit gap matches.
3. `/journeys/[role]` routes must target the selected role's known journey.
4. Intent-specific destination rules are tested.

### P1: Documentation status is inconsistent with implementation status - closed in Batch C

Evidence:
- Original audit finding: `implementation/phase2/phase2-progress.md:6-107` marked Phase 2 as 24 / 24 complete while `implementation/phase2/phase2-implementation.md` still used pre-work status and checkbox criteria.
- Batch C updated `phase2-implementation.md` to use a Partial closure status and a Pass/Partial/Open evidence table.
- Batch C updated `phase2-progress.md` to separate delivered implementation progress from Open release work.
- Some subphase-level task files may still preserve historical checklist format; the Phase 2 closure source of truth is now the implementation/progress/audit trio.

Impact:
- New contributors cannot tell whether unchecked items are stale docs or actual product gaps.
- This increases planning risk for Phase 3+ because the status artifact is not reliable.

Closure:
1. `phase2-implementation.md` now records Phase 2 as Partial - implementation delivered, hardening required.
2. Each Phase 2 success criterion now has Pass, Partial, or Open status with a one-line evidence note.
3. `phase2-progress.md` now includes a closure-status appendix that supersedes stale subphase checklists.

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
| Search results are ranked/grouped with no-result submit CTA | Pass | Actor, pillar, and gap results are searched and grouped; no-result CTA still appears only when all groups are empty. |
| Homepage uses two-step role + intent onboarding for all 8 roles | Pass | `OnboardingFlow` and `ROLE_INTENT_ROUTES` cover 8 roles. |
| Every role + intent route lands on a relevant filtered view | Pass | Routes exist and are guarded by strict relevance/parseability tests. |
| 100% actors have city-level coordinates or documented non-map exceptions | Pass | Coordinates exist; outside-RGV records are separated from RGV markers and remain visible in non-map list contexts. |
| Geographic view uses Leaflet/OSM, clustering, county context, accessible marker colors | Pass | Leaflet/OSM/clustering, county summaries, numbered county gap markers, visible legends, and non-color status border styles are implemented. |
| Gap records remain visible in list, map, by-pillar, and health contexts | Pass | Gap cards appear on `/map` and health, gaps are searchable, and open gaps render as county centroid markers in the geographic map view. |
| Starr and Willacy gaps explicitly visible | Pass with caveat | Gap records exist and show in `/map` cards/health; geographic visualization is missing. |
| Mobile touch targets and no 320px overflow | Partial | Classes suggest 44px targets; browser verification was not completed. |
| Vitest covers data, queries, filters, search, slug, geography, key components | Pass with caveat | Coverage exists and now includes gap search rendering, route guardrails, and outside-RGV map handling; visual QA remains manual/deferred. |
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
- RGV markers and outside-region partners are counted separately. Completed in hardening item 3.
- Starr and Willacy gap context is visible in the geographic map view. Open for hardening item 4 as a stronger geographic treatment.
- County context appears in the map view. Partially complete through county summaries; open for hardening item 4 if overlays/markers are required.
- Tests prove outside-region records are not silently treated as RGV markers. Completed in hardening item 3.

### Batch B: Gap search and route guardrails

Files likely to change:
- `src/lib/utils/search.ts`
- `src/components/search/SearchPageContent.tsx`
- `src/components/search/SearchResults.tsx`
- `src/app/search/page.tsx`
- `src/__tests__/utils/search.test.ts`
- New `src/__tests__/data/intents.test.ts`

Acceptance:
- Search returns actors, pillars, and gaps. Completed in hardening item 1.
- Known gap queries return expected gap records. Completed in hardening item 1.
- Every role-intent route is tested for shape and relevance. Completed in hardening item 2.

### Batch C: Documentation closure and visual QA

Files likely to change:
- `implementation/phase2/phase2-implementation.md`
- `implementation/phase2/phase2-progress.md`
- Possibly subphase status headers or a status appendix

Acceptance:
- Phase 2 docs use Pass/Partial/Open status, not stale checkboxes.
- Browser/mobile smoke checks are either completed or explicitly listed as remaining release work.

Batch C result, 2026-04-25:
- `phase2-implementation.md` now records Phase 2 as Partial, replaces stale success-criterion checkboxes with Pass/Partial/Open evidence, and lists remaining release work.
- `phase2-progress.md` now separates delivered implementation progress from closure status and marks browser/mobile visual QA plus remaining geographic trust hardening as Open release work.
- Browser/mobile smoke checks were not completed in Batch C. A local dev server check against `127.0.0.1:3002` failed to connect, and existing `localhost:3000` checks timed out, so visual QA remains explicitly Open.

## CTO verdict

The engineering team delivered the bulk of Phase 2 and established a working validation foundation. The code is reasonably modular: filters are separated into a hook and pure utility layer, search is pure and testable, map rendering is isolated behind dynamic import, and seed data has schema validation.

The product risk is not basic correctness; it is trust. A map product must be especially careful about what is visible, counted, and spatially implied. Before Phase 2 is treated as complete, close the gaps around county context, gap geography, outside-region actor handling, and search coverage for gaps.
