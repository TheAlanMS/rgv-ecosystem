# p2-search-1a-utilities

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Search (M2)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-filters-2a-integration
> **Parallel with:** p2-search-1b-components, p2-map-1a-dependencies, p2-map-1b-markers

## Objective

Create pure search utility functions for actors and pillars.

## Tasks

### T1: Actor search function
- **File:** `src/lib/utils/search.ts`
- **Create** `searchActors(query: string, actors: Actor[]): Actor[]`
  - Case-insensitive substring match across: name, description, city, whatTheyOffer, whoTheyServe
  - Return scored results (more field matches = higher rank)
  - Empty query returns all actors

### T2: Pillar search function
- **File:** `src/lib/utils/search.ts` (same file)
- **Create** `searchPillars(query: string, pillars: Pillar[]): Pillar[]`
  - Search across: name, description, capacity
  - Same scoring logic

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/lib/utils/search.ts` | Yes |

## Acceptance Criteria

- [ ] Case-insensitive matching works
- [ ] Results ranked by number of field matches
- [ ] Empty query returns full list (no filtering)
- [ ] Special characters don't cause errors
- [ ] Functions are pure with no side effects

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
