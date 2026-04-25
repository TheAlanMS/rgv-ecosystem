# p1-pages-1a-routes

> **Phase:** 1 — Foundations
> **Group:** Pages
> **Status:** ✅ Complete
> **Dependencies:** p1-components-1c-domain

## Objective

Create all application routes with server components that fetch data and render domain components.

## Tasks

### T1: Root layout
- **File:** `src/app/layout.tsx`
- HTML shell, font loading (Syne + DM Sans), global styles, Shell wrapper

### T2: Global styles
- **File:** `src/app/globals.css`
- Tailwind CSS 4 imports, dark theme tokens, custom properties

### T3: Homepage
- **File:** `src/app/page.tsx`
- Hero section, role grid, pillar overview, quick stats

### T4: Map / List page
- **File:** `src/app/map/page.tsx`
- Actor grid view (list only in Phase 1, map comes in Phase 2)

### T5: Pillars listing
- **File:** `src/app/pillars/page.tsx`
- Grid of all 10 pillars using PillarGrid

### T6: Pillar detail
- **File:** `src/app/pillars/[slug]/page.tsx`
- Single pillar view with PillarDetail + related actors

### T7: Actor profile
- **File:** `src/app/actors/[slug]/page.tsx`
- Full actor profile using ActorProfile component

### T8: Journeys listing
- **File:** `src/app/journeys/page.tsx`
- Role selector grid

### T9: Journey detail
- **File:** `src/app/journeys/[role]/page.tsx`
- JourneyView with 4-step pathway for selected role

### T10: Ecosystem health
- **File:** `src/app/ecosystem-health/page.tsx`
- Pillar diagnostics, gap overview, geographic distribution

### T11: Governance
- **File:** `src/app/governance/page.tsx`
- Platform purpose, data philosophy, editorial model

### T12: Submit
- **File:** `src/app/submit/page.tsx`
- Placeholder submission form (functional form comes in Phase 3)

## Acceptance Criteria

- [x] All 9+ routes render without errors
- [x] Server components fetch data via query functions
- [x] Dynamic routes ([slug], [role]) handle missing slugs gracefully
- [x] Pages use PageHeader for consistent titling
- [x] Navigation links work between all pages
