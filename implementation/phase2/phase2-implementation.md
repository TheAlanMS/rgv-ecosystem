# Phase 2 — Interactive Features & Polish

> **Status:** ⬜ Not Started
> **Started:** —
> **Completed:** —
> **Executor:** Multi-agent

## Objective

Add client-side interactivity to the ecosystem platform: filtering, search, geographic map, pillar expansion, role-based onboarding, responsive polish, and a comprehensive test suite.

## 9.9 Remediation Focus

Phase 2 is the highest-leverage MVP phase. It turns the current static directory into the PRD-required navigable ecosystem map.

Current blockers this phase must close:

- `/map` is currently a static card grid, not a filterable map/list product surface.
- Search is implemented with a dedicated `/search` route, header entry point, ranked actor and pillar results, and filter interop.
- Role navigation is static and does not support the PRD's role + intent flow.
- Actor coordinates are absent, so geographic map execution is blocked until the data audit completes.
- No test suite exists.

This phase is not complete until a first-time user can start from the homepage, choose a role and intent or search directly, land on a filtered view, switch between list/map/pillar views, and find a relevant actor or visible gap without needing instructions.

## Prerequisites

- Phase 1 complete (all 61 source files delivered)
- `npm run build` passes
- `npx tsc --noEmit` passes

## Architecture Decisions

- **Client components:** FilterBar, SearchInput, EcosystemMap, OnboardingFlow, MapToggle, PillarAccordion
- **Server components:** ActorCard, PillarCard, all page components (unchanged)
- **New dependencies:** leaflet, react-leaflet, @types/leaflet, vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- **State management:** URL search params for filters (shareable links), React state for UI toggles
- **Map strategy:** Dynamic import with `ssr: false` to avoid Leaflet SSR issues

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| Filters | `subphases/filters/` | 3 | — | useFilters hook, FilterBar, SortControl, page integration |
| Search | `subphases/search/` | 3 | Filters | Search utilities, SearchInput, SearchResults, /search page |
| Map | `subphases/map/` | 5 | Filters | Leaflet map, markers, clustering, data audit, integration |
| Pillar | `subphases/pillar/` | 2 | Map | PillarAccordion, third view mode on /map |
| Onboarding | `subphases/onboarding/` | 3 | — (independent) | Intent data, OnboardingFlow, homepage integration |
| Polish | `subphases/polish/` | 3 | All above | Mobile nav, touch targets, responsive layouts |
| Testing | `subphases/testing/` | 5 | Polish | Vitest config, data/query/util/component tests |

## Dependency Graph

```
filters ─────┬──> search
              ├──> map ──> pillar
              └────────────────────> polish ──> testing
onboarding (independent) ──────────> polish ──> testing
```

## Execution Map

```
Batch 1:  [filters-1a] [filters-1b]   [onboarding-1a] [onboarding-1b]
Batch 2:  [filters-2a]                 [onboarding-2a]
Batch 3:  [search-1a] [search-1b]      [map-1a] [map-1b]
Batch 4:  [search-2a]                  [map-2a] [map-2b]
Batch 5:                               [map-3a]
Batch 6:  [pillar-1a]
Batch 7:  [pillar-2a]
Batch 8:  [polish-1a] [polish-1b]
Batch 9:  [polish-1c]
Batch 10: [testing-1a]
Batch 11: [testing-2a] [testing-2b] [testing-2c] [testing-2d]
```

## New Dependencies

| Package | Version | Purpose | Subphase |
|---------|---------|---------|----------|
| `leaflet` | ^1.9 | Map rendering | p2-map-1a |
| `react-leaflet` | ^5.0 | React bindings for Leaflet | p2-map-1a |
| `@types/leaflet` | ^1.9 | TypeScript types | p2-map-1a |
| `react-leaflet-cluster` | ^2.0 | Marker clustering | p2-map-2a |
| `vitest` | ^3.0 | Test runner | p2-testing-1a |
| `@testing-library/react` | ^16.0 | Component testing | p2-testing-1a |
| `@testing-library/jest-dom` | ^6.0 | DOM matchers | p2-testing-1a |
| `jsdom` | ^25.0 | Browser environment for tests | p2-testing-1a |

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build`
- After testing-1a: add `npm test` to all subsequent gates
- Phase-complete: `npm run build && npm test -- --coverage`

## Phase 2 Success Criteria

- [ ] `/map` supports list view, geographic map view, and by-pillar view.
- [ ] Filter state is shared by all `/map` views and persisted in URL search params.
- [ ] Filters cover pillar, player type, county, stage served, and status.
- [x] Search is available from all pages and has a dedicated `/search` route.
- [x] Search results are ranked and grouped, with a no-result submit CTA.
- [ ] Homepage uses two-step role + intent onboarding for all 8 roles.
- [ ] Every role + intent route lands on a relevant filtered view.
- [ ] 100% of actors have city-level coordinates, or documented exceptions are rendered as non-map list records.
- [ ] Geographic view uses Leaflet/OpenStreetMap, marker clustering, county context, and accessible marker colors.
- [ ] Gap records remain visible in list, map, by-pillar, and health contexts.
- [ ] Starr and Willacy County gaps are explicitly visible, even where no active actors exist.
- [ ] All interactive controls meet mobile touch target expectations and do not create horizontal overflow at 320px.
- [ ] Vitest covers data validation, queries, filters, search, slug utilities, geography, and smoke rendering of key components.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` pass.

## Scope Control

Do not add accounts, database writes, analytics, CRM, events, or partner feeds in Phase 2. If a Phase 2 task appears to require persistence, model the public interaction with URL state and static data, then leave the write path to Phase 3 or Phase 4.

## What Phase 2 Does NOT Include

- Database or persistence layer (Phase 3)
- API route handlers (Phase 3)
- Authentication (Phase 3)
- Community submission workflows (Phase 4)
- Analytics or tracking (Phase 5)
