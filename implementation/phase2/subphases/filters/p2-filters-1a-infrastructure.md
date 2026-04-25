# p2-filters-1a-infrastructure

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Filters (M1)
> **Status:** Complete
> **Dependencies:** None (first subphase of Phase 2)
> **Parallel with:** p2-filters-1b-components, p2-onboarding-1a-data, p2-onboarding-1b-components

## Objective

Create the filter state management hook and pure filter/sort utility functions that all interactive views will consume.

## Tasks

### T1: useFilters hook
- **File:** `src/hooks/useFilters.ts`
- **Create** custom React hook managing filter state:
  - Filter dimensions: `pillar` (number[]), `county` (County[]), `status` (Status[]), `orgType` (OrgType[]), `stage` (Stage[]), `pillarGroup` (PillarGroup[])
  - `pillar` is the PRD-required 1-10 multi-select filter. `pillarGroup` is a convenience filter for supply/engine/demand/infra views.
  - Sort config: `sortField` (name | status | county | recentlyAdded | pillar), `sortDirection` (asc | desc)
  - Methods: `setFilter(dimension, values)`, `clearFilter(dimension)`, `clearAll()`, `setSort(field, direction)`
  - Active filter count computed property
- **Done when:** Hook compiles, manages state, exposes typed API

### T2: Filter utility functions
- **File:** `src/lib/utils/filters.ts`
- **Create** pure functions:
  - `filterActors(actors: Actor[], filters: FilterState): Actor[]` — AND logic across dimensions, OR within a dimension
  - `sortActors(actors: Actor[], sortConfig: SortConfig): Actor[]` — stable sort by field + direction
  - `getActiveFilterCount(filters: FilterState): number`
  - `isFilterActive(filters: FilterState): boolean`
- **Done when:** Functions pass basic manual verification with sample data

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/hooks/useFilters.ts` | Yes |
| Create | `src/lib/utils/filters.ts` | Yes |

## Acceptance Criteria

- [ ] `useFilters` returns typed filter state + sort config
- [ ] `filterActors` combines dimensions with AND, values within dimension with OR
- [ ] `pillar` filter matches actors with any selected pillar id
- [ ] `pillarGroup` filter maps selected groups to pillar ids through the pillar dataset
- [ ] `sortActors` handles ascending/descending for name, status, county, recentlyAdded, and pillar
- [ ] `clearAll()` resets to default state (no filters, sort by name asc)
- [ ] No external dependencies beyond React and existing types

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
