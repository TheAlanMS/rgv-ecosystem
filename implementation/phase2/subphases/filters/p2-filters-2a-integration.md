# p2-filters-2a-integration

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Filters (M1)
> **Status:** Complete
> **Dependencies:** p2-filters-1a-infrastructure, p2-filters-1b-components

## Objective

Integrate filter and sort controls into the map/list page and pillar detail pages, with URL search param persistence.

## Tasks

### T1: Integrate into /map page
- **File:** `src/app/map/page.tsx` (modify)
- Convert to client component wrapper pattern: server component fetches data, passes to client wrapper
- Add FilterBar + SortControl above actor grid
- Apply `filterActors()` and `sortActors()` to actor list
- Show result count ("Showing X of Y actors")

### T2: Integrate into /pillars/[slug] page
- **File:** `src/app/pillars/[slug]/page.tsx` (modify)
- Add FilterBar to actor list section within pillar detail
- Filter only the actors for that pillar

### T3: URL search param persistence
- Update `useFilters` hook to sync state with URL search params
- Format: `?pillar=3,7&county=Cameron,Hidalgo&status=Active&sort=name&dir=asc`
- Initialize from URL on mount, update URL on filter change
- Shareable filter links

### T4: Zero-result state
- Show "No actors match your current filters" with clear filters button when filter produces empty results

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/app/map/page.tsx` | Yes |
| Modify | `src/app/pillars/[slug]/page.tsx` | Yes |
| Modify | `src/hooks/useFilters.ts` | Yes (URL sync addition) |

## Acceptance Criteria

- [ ] All 6 filter dimensions work independently and combine with AND logic
- [ ] Pillar URL params use numeric ids and preserve multi-select order
- [ ] Pillar-group URL params remain supported as convenience shortcuts
- [ ] Sort toggles between ascending/descending
- [ ] URL updates reflect current filters (shareable links)
- [ ] "Clear all" resets to default view
- [ ] Filter counts show number of results matching
- [ ] Zero-result state shows "No actors match" message with clear button
- [ ] Filters work on both /map and /pillars/[slug] pages

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
