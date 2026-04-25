# p2-filters-1b-components

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Filters (M1)
> **Status:** Complete
> **Dependencies:** None (can run parallel with p2-filters-1a)
> **Parallel with:** p2-filters-1a-infrastructure

## Objective

Create the visual filter and sort control components.

## Tasks

### T1: FilterBar component
- **File:** `src/components/filters/FilterBar.tsx`
- **Create** client component (`"use client"`)
  - Horizontal bar with dropdown/toggle controls for: pillar, county, status, orgType, stage, pillarGroup
  - Pillar dropdown shows all 10 I2E pillars with ids and names
  - Each dimension shows as a dropdown with multi-select checkboxes
  - Active filter count badge per dimension
  - "Clear all" button (visible when any filter active)
  - Props: `filters: FilterState`, `onFilterChange: (dimension, values) => void`, `onClearAll: () => void`
- **Done when:** Component renders, dropdowns open/close, props are typed

### T2: SortControl component
- **File:** `src/components/filters/SortControl.tsx`
- **Create** client component (`"use client"`)
  - Sort-by dropdown: Name, Status, County, Recently Added, Pillar
  - Ascending/descending toggle button (arrow icon)
  - Props: `sortField`, `sortDirection`, `onSortChange: (field, direction) => void`
- **Done when:** Component renders, sort changes fire callback

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/filters/FilterBar.tsx` | Yes |
| Create | `src/components/filters/SortControl.tsx` | Yes |

## Acceptance Criteria

- [ ] FilterBar renders all 6 filter dimensions
- [ ] Pillar filter exposes all 10 pillar ids and names
- [ ] Dropdowns support multi-select within each dimension
- [ ] Active filter count badge appears when filters are active
- [ ] "Clear all" button is visible only when filters are active
- [ ] SortControl toggles between ascending/descending
- [ ] Both components use dark theme styling consistent with existing UI
- [ ] Both components are `"use client"` components

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
