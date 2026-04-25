# RGV Innovation Ecosystem — Implementation Plan

> **Last updated:** 2026-04-23
> **Current phase:** Phase 2 — Interactive Features & Polish

---

## Overall Progress

```
Phase 1  ████████████████████  COMPLETE
Phase 2  ░░░░░░░░░░░░░░░░░░░░  0 / 7 milestones
```

| # | Milestone | Status | Dependencies |
|:-:|-----------|:------:|:------------:|
| M1 | Filters & Sorting | `⬜ Not Started` | — |
| M2 | Search | `⬜ Not Started` | M1 |
| M3 | Geographic Map (Leaflet) | `⬜ Not Started` | M1 |
| M4 | Inline Pillar Expansion | `⬜ Not Started` | M3 |
| M5 | Role + Intent Onboarding | `⬜ Not Started` | — |
| M6 | Responsive Polish | `⬜ Not Started` | M1–M5 |
| M7 | Test Suite (Vitest) | `⬜ Not Started` | M1–M6 |

---

## Phase 1 — Foundations ✅

<details>
<summary>Completed — click to expand</summary>

**Delivered:** 61 source files in Next.js 16 + TypeScript strict + Tailwind CSS 4 + Zod 4

| Area | Details |
|------|---------|
| Architecture | Types (Zod) → Data (static) → Queries → Components → Pages |
| Pages | 9 routes: home, map, pillars, pillar detail, actors, journeys, journey detail, health, governance |
| Data | 10 pillars, ~50 actors (deduped), 8 roles, 8 journeys (4 steps each), 6 gaps |
| Components | ~25 components across layout, actors, pillars, journeys, UI |
| Design | Dark theme, gold accent, pillar-group color system, Syne + DM Sans fonts |
| Queries | getActorsByPillar, getActorsByCounty, getActorsByStatus, getAllActors, etc. |
| Geography | 4 RGV counties, 16 cities, city-county mapping, optional actor coordinates |

</details>

---

## Phase 2 — Interactive Features & Polish

### M1: Filters & Sorting `⬜ Not Started`

> **Why first:** Every downstream feature (search, map, pillar expansion) needs filter state.
> This milestone creates the shared infrastructure all interactive views will use.

**Scope:** Add client-side filtering and sorting to the map/list page and pillar detail views. Users can filter actors by county, status, org type, pillar group, and stage. Sorting by name, status, or county.

#### Tasks

- [ ] **M1.1** Create `useFilters` hook — manages filter state (county, status, orgType, stage, pillarGroup) + sort field/direction
- [ ] **M1.2** Create `FilterBar` component — horizontal bar with dropdown/toggle controls for each filter dimension
- [ ] **M1.3** Create `SortControl` component — sort-by dropdown + ascending/descending toggle
- [ ] **M1.4** Create filter utility functions — `filterActors(actors, filters)` and `sortActors(actors, sortConfig)` pure functions
- [ ] **M1.5** Integrate `FilterBar` + `SortControl` into `/map` page — convert to client component wrapper with server data pass-through
- [ ] **M1.6** Integrate filters into `/pillars/[slug]` detail page — filter the actors list within a pillar
- [ ] **M1.7** Add active filter count badge + "Clear all" button
- [ ] **M1.8** Persist filter state in URL search params (`?county=Cameron&status=Active`)

#### Key files

| Action | Path |
|--------|------|
| Create | `src/hooks/useFilters.ts` |
| Create | `src/components/filters/FilterBar.tsx` |
| Create | `src/components/filters/SortControl.tsx` |
| Create | `src/lib/utils/filters.ts` |
| Modify | `src/app/map/page.tsx` — add filter/sort wrapper |
| Modify | `src/app/pillars/[slug]/page.tsx` — add filter controls to actor list |

#### Acceptance criteria

- [ ] All 5 filter dimensions work independently and combine with AND logic
- [ ] Sort toggles between ascending/descending
- [ ] URL updates reflect current filters (shareable links)
- [ ] "Clear all" resets to default view
- [ ] Filter counts show number of results matching
- [ ] Zero-result state shows a clear "No actors match" message

---

### M2: Search `⬜ Not Started`

> **Depends on:** M1 (reuses filter infrastructure and UI patterns)

**Scope:** Global text search across actors (name, description, city, whatTheyOffer, whoTheyServe) and pillars (name, description, capacity). Instant client-side matching with highlighted results.

#### Tasks

- [ ] **M2.1** Create `searchActors(query, actors)` utility — case-insensitive substring match across searchable fields, returns scored results
- [ ] **M2.2** Create `searchPillars(query, pillars)` utility — search name, description, capacity fields
- [ ] **M2.3** Create `SearchInput` component — text input with clear button, debounced (200ms), search icon
- [ ] **M2.4** Create `SearchResults` component — grouped results display (Actors section, Pillars section) using existing card components
- [ ] **M2.5** Add `SearchInput` to `SiteHeader` — always-visible search in the navigation bar
- [ ] **M2.6** Create `/search` page — full search results page with `FilterBar` integration
- [ ] **M2.7** Wire search + filters together — search narrows within active filters, or vice versa

#### Key files

| Action | Path |
|--------|------|
| Create | `src/lib/utils/search.ts` |
| Create | `src/components/search/SearchInput.tsx` |
| Create | `src/components/search/SearchResults.tsx` |
| Create | `src/app/search/page.tsx` |
| Modify | `src/components/layout/SiteHeader.tsx` — add search input |

#### Acceptance criteria

- [ ] Typing in search header input navigates to `/search?q=...` with results
- [ ] Results appear grouped: Actors first, then Pillars
- [ ] Empty query shows prompt text, not empty results
- [ ] Search query persists in URL (shareable)
- [ ] Results use existing `ActorCard` and `PillarCard` components
- [ ] Search combines with filters if both active

---

### M3: Geographic Map View (Leaflet.js) `⬜ Not Started`

> **Depends on:** M1 (filter controls overlay on the map)

**Scope:** Interactive OpenStreetMap view of the RGV with actor markers color-coded by pillar group. Click markers for actor popups. Filter controls overlay. Cluster markers at zoom-out levels.

#### Tasks

- [ ] **M3.1** Install dependencies — `leaflet`, `react-leaflet`, `@types/leaflet`
- [ ] **M3.2** Create `EcosystemMap` component — dynamic import (`next/dynamic`, `ssr: false`), centered on RGV (~26.2, -97.7), zoom level 9
- [ ] **M3.3** Create `ActorMarker` component — circular marker colored by primary pillar group, sized by status (Active > Emerging > Gap)
- [ ] **M3.4** Create `ActorPopup` component — Leaflet popup showing actor name, org type, city, status, link to detail page
- [ ] **M3.5** Implement marker clustering — use `react-leaflet-cluster` or custom clustering for dense areas (McAllen-Edinburg-Mission corridor)
- [ ] **M3.6** Add Leaflet CSS — import in layout or dynamic component to avoid SSR issues
- [ ] **M3.7** Create map/list toggle on `/map` page — tab or button to switch between grid view and geographic view
- [ ] **M3.8** Connect `FilterBar` to map — filtered actors reflected in visible markers
- [ ] **M3.9** Add county boundary overlays (optional) — GeoJSON polygons for Cameron, Hidalgo, Starr, Willacy with subtle fill
- [ ] **M3.10** Populate missing actor coordinates — audit all actors, add lat/lng for any that are missing

#### Key files

| Action | Path |
|--------|------|
| Create | `src/components/map/EcosystemMap.tsx` |
| Create | `src/components/map/ActorMarker.tsx` |
| Create | `src/components/map/ActorPopup.tsx` |
| Create | `src/components/map/MapToggle.tsx` |
| Modify | `src/app/map/page.tsx` — add map view toggle + map component |
| Modify | `package.json` — add leaflet dependencies |
| Modify | `src/lib/data/actors/*.ts` — fill in missing coordinates |

#### Acceptance criteria

- [ ] Map renders centered on RGV with all active actor markers visible
- [ ] Markers are color-coded by pillar group (supply=blue, engine=green, demand=gold, infra=gray)
- [ ] Clicking a marker opens a popup with actor info + link to detail page
- [ ] Toggle switches between list grid and map view (state preserved)
- [ ] Filters apply to both list and map views simultaneously
- [ ] Map does not break SSR (dynamic import with `ssr: false`)
- [ ] Markers cluster at lower zoom levels, expand on zoom in
- [ ] Map is responsive — fills container width, reasonable height on mobile

---

### M4: Inline Pillar Expansion `⬜ Not Started`

> **Depends on:** M3 (lives on the map page alongside the map/list)

**Scope:** On the map page, add collapsible pillar sections that expand inline to show actors for that pillar. This provides a pillar-centric lens on the same data without navigating away.

#### Tasks

- [ ] **M4.1** Create `PillarAccordion` component — expandable section per pillar with name, capacity, actor count. Click to expand/collapse
- [ ] **M4.2** Create `PillarAccordionItem` component — single pillar row: left-side pillar info, right-side expand toggle. Expanded state shows actor list
- [ ] **M4.3** Add pillar view mode to `/map` page — third view option alongside list + map: "By Pillar"
- [ ] **M4.4** Wire filters to pillar accordion — filter state affects which actors appear within each expanded pillar
- [ ] **M4.5** Animate expand/collapse — smooth height transition, rotate chevron icon

#### Key files

| Action | Path |
|--------|------|
| Create | `src/components/pillars/PillarAccordion.tsx` |
| Create | `src/components/pillars/PillarAccordionItem.tsx` |
| Modify | `src/app/map/page.tsx` — add "By Pillar" view mode |
| Modify | `src/components/map/MapToggle.tsx` — add third option |

#### Acceptance criteria

- [ ] Each pillar shows as a collapsible row with name, group tag, actor count
- [ ] Expanding a pillar reveals its actors using `ActorCard` components
- [ ] Multiple pillars can be open simultaneously
- [ ] Filters apply to actors within expanded pillars
- [ ] Collapse/expand is animated smoothly
- [ ] Empty pillars (after filtering) show "No matching actors" message

---

### M5: Role + Intent Onboarding `⬜ Not Started`

> **Independent** — can be built in parallel with M1–M4

**Scope:** Replace the current static role grid on the homepage with a 2-step onboarding flow:
- **Step 1:** "I am a..." — role selection (existing 8 roles)
- **Step 2:** "I want to..." — intent selection (explore, find resources, connect, understand gaps)
- Routes to the most relevant page based on role + intent combination

#### Tasks

- [ ] **M5.1** Define intent options — map each intent to a target route per role (e.g., startup + "find resources" → `/journeys/startup`, startup + "explore" → `/map?pillar=7`)
- [ ] **M5.2** Create `OnboardingFlow` component — client component with 2-step state machine
- [ ] **M5.3** Create `RoleStep` component — "I am a..." with the 8 role cards (reuse existing role styling)
- [ ] **M5.4** Create `IntentStep` component — "I want to..." with 4-6 intent cards, contextual to selected role
- [ ] **M5.5** Add routing logic — role + intent → specific page with relevant filters pre-applied
- [ ] **M5.6** Replace homepage role grid section with `OnboardingFlow`
- [ ] **M5.7** Add "Skip — explore freely" bypass link

#### Key files

| Action | Path |
|--------|------|
| Create | `src/components/onboarding/OnboardingFlow.tsx` |
| Create | `src/components/onboarding/RoleStep.tsx` |
| Create | `src/components/onboarding/IntentStep.tsx` |
| Create | `src/lib/data/intents.ts` — intent definitions + role-intent routing map |
| Modify | `src/app/page.tsx` — replace role grid with onboarding flow |

#### Acceptance criteria

- [ ] Step 1 shows all 8 roles with existing color scheme
- [ ] Selecting a role transitions to Step 2 with role-specific intents
- [ ] Selecting an intent navigates to the target page
- [ ] "Back" button returns from Step 2 to Step 1
- [ ] "Skip" link bypasses onboarding entirely
- [ ] Animation between steps is smooth (slide or fade)
- [ ] Works correctly on mobile (single-column card layout)

---

### M6: Responsive Polish `⬜ Not Started`

> **Depends on:** M1–M5 (polish everything that's been built)

**Scope:** Comprehensive mobile-first pass across all views. Focus on navigation, touch targets, spacing, and typography at small viewports.

#### Tasks

- [ ] **M6.1** Mobile navigation — hamburger menu for `SiteHeader` at `sm:` breakpoint, slide-out or dropdown nav
- [ ] **M6.2** Touch target audit — ensure all interactive elements are at least 44x44px on mobile
- [ ] **M6.3** Filter bar responsive layout — horizontal scroll or collapsible filter panel on mobile
- [ ] **M6.4** Map view mobile optimization — full-width map, bottom sheet for popups instead of Leaflet popups
- [ ] **M6.5** Typography pass — verify text sizes are readable at 320px width, adjust where needed
- [ ] **M6.6** Card spacing — tighten padding/gaps on mobile, increase on desktop (`lg:`)
- [ ] **M6.7** Journey view mobile — stack base buttons vertically on small screens
- [ ] **M6.8** Search input mobile — full-width search overlay on mobile tap
- [ ] **M6.9** Test on real devices / browser DevTools — iPhone SE, iPhone 14, iPad, Galaxy S series

#### Key files

| Action | Path |
|--------|------|
| Modify | `src/components/layout/SiteHeader.tsx` — mobile hamburger menu |
| Modify | `src/components/filters/FilterBar.tsx` — responsive layout |
| Modify | `src/components/map/EcosystemMap.tsx` — mobile adjustments |
| Modify | `src/components/journeys/JourneyView.tsx` — stack on mobile |
| Modify | `src/components/search/SearchInput.tsx` — mobile overlay |
| Modify | `src/app/globals.css` — spacing/typography token adjustments |

#### Acceptance criteria

- [ ] Navigation collapses to hamburger at `sm:` breakpoint
- [ ] All interactive elements pass 44px touch target minimum
- [ ] No horizontal scroll on any page at 320px width
- [ ] Filter bar is usable on mobile without horizontal overflow
- [ ] Map is usable with touch gestures (pinch zoom, pan)
- [ ] Text is readable without zooming on smallest supported viewport

---

### M7: Test Suite (Vitest) `⬜ Not Started`

> **Depends on:** M1–M6 (test final implementations to avoid churn)

**Scope:** Configure Vitest and write tests covering data validation, query functions, utility functions, and key component behaviors.

#### Tasks

- [ ] **M7.1** Install and configure Vitest — `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- [ ] **M7.2** Add `vitest.config.ts` — path aliases, jsdom environment, coverage config
- [ ] **M7.3** Add `test` script to `package.json`
- [ ] **M7.4** Data validation tests — verify all actors pass Zod schema, all pillars valid, all journeys have 4 steps
- [ ] **M7.5** Query function tests — `getActorsByPillar`, `getActorsByCounty`, `getActorsByStatus`, `getActorBySlug` edge cases
- [ ] **M7.6** Filter utility tests — `filterActors` with various filter combos, empty filters, no-match scenarios
- [ ] **M7.7** Search utility tests — `searchActors` ranking, case insensitivity, empty query, special characters
- [ ] **M7.8** Slug utility tests — `slugify` edge cases (special chars, spaces, unicode)
- [ ] **M7.9** Geography tests — city-county mapping completeness, all actor cities have valid counties
- [ ] **M7.10** Component smoke tests — key components render without errors with sample data

#### Key files

| Action | Path |
|--------|------|
| Create | `vitest.config.ts` |
| Create | `src/__tests__/data/actors.test.ts` |
| Create | `src/__tests__/data/pillars.test.ts` |
| Create | `src/__tests__/data/journeys.test.ts` |
| Create | `src/__tests__/queries/actors.test.ts` |
| Create | `src/__tests__/queries/gaps.test.ts` |
| Create | `src/__tests__/utils/filters.test.ts` |
| Create | `src/__tests__/utils/search.test.ts` |
| Create | `src/__tests__/utils/slug.test.ts` |
| Create | `src/__tests__/components/ActorCard.test.tsx` |
| Modify | `package.json` — add vitest deps + test script |

#### Acceptance criteria

- [ ] `npm test` runs all tests and passes
- [ ] All Zod schemas validate against their data files (zero invalid actors)
- [ ] Query functions return correct results for known test cases
- [ ] Filter and search utilities handle edge cases (empty input, no matches)
- [ ] Coverage report available via `npm run test:coverage`
- [ ] Tests run in CI-compatible mode (no browser dependency)

---

## Architecture Notes

### Client vs. Server Component Strategy

| Component | Type | Reason |
|-----------|------|--------|
| FilterBar, SortControl | Client | User interaction state (dropdowns, toggles) |
| SearchInput | Client | Controlled input with debounce |
| EcosystemMap | Client | Leaflet requires `window` / DOM |
| OnboardingFlow | Client | Multi-step state machine |
| MapToggle | Client | View switching state |
| PillarAccordion | Client | Expand/collapse state |
| ActorCard, PillarCard | Server | Pure display, no interactivity |
| All page components | Server | Data fetching at build time |

### New Dependencies (Phase 2)

| Package | Version | Purpose | Milestone |
|---------|---------|---------|-----------|
| `leaflet` | ^1.9 | Map rendering | M3 |
| `react-leaflet` | ^5.0 | React bindings for Leaflet | M3 |
| `@types/leaflet` | ^1.9 | TypeScript types | M3 |
| `vitest` | ^3.0 | Test runner | M7 |
| `@testing-library/react` | ^16.0 | Component testing | M7 |
| `@testing-library/jest-dom` | ^6.0 | DOM matchers | M7 |
| `jsdom` | ^25.0 | Browser environment for tests | M7 |

### File Naming Conventions

```
src/
  hooks/           ← Custom React hooks (useFilters, etc.)
  components/
    filters/       ← FilterBar, SortControl
    search/        ← SearchInput, SearchResults
    map/           ← EcosystemMap, ActorMarker, ActorPopup, MapToggle
    onboarding/    ← OnboardingFlow, RoleStep, IntentStep
    pillars/       ← PillarAccordion, PillarAccordionItem (+ existing)
  lib/
    utils/
      filters.ts   ← filterActors(), sortActors()
      search.ts    ← searchActors(), searchPillars()
    data/
      intents.ts   ← Intent definitions + role-intent routing
  __tests__/       ← Mirror src/ structure
    data/
    queries/
    utils/
    components/
```

---

## Future Phases (Placeholder)

> These are not scoped yet. Listed here for visibility.

- **Phase 3:** Backend & persistence — database migration (Prisma + Postgres), form submission API, user accounts
- **Phase 4:** Community features — actor claiming/editing, community submissions with moderation queue
- **Phase 5:** Analytics & insights — event tracking, journey completion metrics, ecosystem health trends over time
- **Phase 6:** Integrations — CRM sync, calendar/events, partner API feeds

---

## How to Use This Plan

**For coding agents:** Read this file at the start of each session. Find the first milestone with `⬜ Not Started` status. Within that milestone, find the first unchecked task (`- [ ]`). That is your next task. After completing a task, update this file: check the box (`- [x]`), and if all tasks in a milestone are done, update the milestone status to `✅ Complete` and update the progress bar at the top.

**Progress bar update formula:**
```
Completed milestones out of 7 total:
0/7 = ░░░░░░░░░░░░░░░░░░░░
1/7 = ███░░░░░░░░░░░░░░░░░
2/7 = ██████░░░░░░░░░░░░░░
3/7 = █████████░░░░░░░░░░░
4/7 = ████████████░░░░░░░░
5/7 = ███████████████░░░░░
6/7 = ██████████████████░░
7/7 = ████████████████████
```

**Status values:** `⬜ Not Started` → `🟡 In Progress` → `✅ Complete`
