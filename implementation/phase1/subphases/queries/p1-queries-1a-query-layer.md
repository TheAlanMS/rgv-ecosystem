# p1-queries-1a-query-layer

> **Phase:** 1 — Foundations
> **Group:** Queries
> **Status:** ✅ Complete
> **Dependencies:** p1-data-1b-actors

## Objective

Create pure query functions that operate on static seed data, providing the data access layer for components and pages.

## Tasks

### T1: Actor queries
- **File:** `src/lib/queries/actors.ts`
- Functions: `getAllActors()`, `getActorBySlug(slug)`, `getActorsByPillar(pillarId)`, `getActorsByCounty(county)`, `getActorsByStatus(status)`, `getActorsByCity(city)`, `getActorsByOrgType(orgType)`, `getActorsByStage(stage)`

### T2: Pillar queries
- **File:** `src/lib/queries/pillars.ts`
- Functions: `getAllPillars()`, `getPillarBySlug(slug)`, `getPillarById(id)`, `getPillarsByGroup(group)`

### T3: Journey queries
- **File:** `src/lib/queries/journeys.ts`
- Functions: `getAllJourneys()`, `getJourneyByRole(roleSlug)`, `getJourneyById(id)`, `getRoleBySlug(slug)`

### T4: Gap queries
- **File:** `src/lib/queries/gaps.ts`
- Functions: `getAllGaps()`, `getGapsByPillar(pillarId)`, `getGapsByCounty(county)`, `getGapsByStatus(status)`

## Acceptance Criteria

- [x] All query functions are pure (no side effects)
- [x] Slug-based lookups return undefined for missing items (not throw)
- [x] Filter functions return empty arrays for no matches
- [x] Functions are typed with Zod-inferred return types
