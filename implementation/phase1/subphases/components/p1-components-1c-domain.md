# p1-components-1c-domain

> **Phase:** 1 — Foundations
> **Group:** Components
> **Status:** ✅ Complete
> **Dependencies:** p1-components-1b-ui

## Objective

Create domain-specific components for actors, pillars, and journeys.

## Tasks

### T1: Actor components
- **Files:** `src/components/actors/ActorCard.tsx`, `src/components/actors/ActorProfile.tsx`
- Card for list views, full profile for detail pages
- Display: name, org type, city, status, pillar tags

### T2: Pillar components
- **Files:** `src/components/pillars/PillarCard.tsx`, `src/components/pillars/PillarDetail.tsx`, `src/components/pillars/PillarDiagnostic.tsx`, `src/components/pillars/PillarGrid.tsx`
- Card for grid views, detail for pillar pages, diagnostic questions, grid layout

### T3: Journey components
- **Files:** `src/components/journeys/JourneyView.tsx`, `src/components/journeys/PillarLink.tsx`, `src/components/journeys/RoleSelector.tsx`
- Journey step rendering, pillar cross-references, role selection grid

## Acceptance Criteria

- [x] Actor cards show key info at a glance
- [x] Pillar cards color-coded by pillar group (supply=blue, engine=green, demand=gold, infra=gray)
- [x] Journey view renders all 4 steps with step indicators
- [x] All components use UI primitives (Card, StatusBadge, Tag) — no style duplication
