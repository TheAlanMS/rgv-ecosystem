# p2-search-1b-components

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Search (M2)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-filters-2a-integration
> **Parallel with:** p2-search-1a-utilities

## Objective

Create the search input and results display components.

## Tasks

### T1: SearchInput component
- **File:** `src/components/search/SearchInput.tsx`
- **Create** client component:
  - Text input with search icon and clear button
  - Debounced input (200ms)
  - Props: `value`, `onChange`, `placeholder`
  - Dark theme styling

### T2: SearchResults component
- **File:** `src/components/search/SearchResults.tsx`
- **Create** client component:
  - Grouped results display: "Actors" section, "Pillars" section
  - Uses existing ActorCard and PillarCard components
  - Empty state: "No results found for '{query}'"
  - Shows result counts per group

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/search/SearchInput.tsx` | Yes |
| Create | `src/components/search/SearchResults.tsx` | Yes |

## Acceptance Criteria

- [ ] SearchInput debounces at 200ms
- [ ] Clear button appears when input has value
- [ ] SearchResults groups actors and pillars separately
- [ ] Empty results show helpful message
- [ ] Components follow dark theme design system

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
