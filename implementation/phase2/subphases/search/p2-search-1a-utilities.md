# p2-search-1a-utilities

> **Phase:** 2 - Interactive Features & Polish
> **Group:** Search (M2)
> **Status:** Complete
> **Dependencies:** p2-filters-2a-integration
> **Parallel with:** p2-search-1b-components, p2-map-1a-dependencies, p2-map-1b-markers

## Objective

Create pure search utility functions for actors and pillars.

## Tasks

### T1: Actor search function
- **File:** `src/lib/utils/search.ts`
- **Created** `searchActors(query: string, actors: readonly Actor[]): Actor[]`
  - Case-insensitive substring match across required actor fields.
  - Includes additional roadmap-relevant fields: county, org type, status, stages, industry focus, RGV connection, and pillar context.
  - Returns scored results, with more field matches ranked higher.
  - Empty query returns all actors.

### T2: Pillar search function
- **File:** `src/lib/utils/search.ts`
- **Created** `searchPillars(query: string, pillars: readonly Pillar[]): Pillar[]`
  - Searches across name, description, capacity, group, and status.
  - Uses the same scoring logic.

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/lib/utils/search.ts` | Yes |

## Acceptance Criteria

- [x] Case-insensitive matching works
- [x] Results ranked by number of field matches
- [x] Empty query returns full list (no filtering)
- [x] Special characters don't cause errors
- [x] Functions are pure with no side effects

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Passed on 2026-04-25 using `cmd /c npx tsc --noEmit`, `cmd /c npm run lint`, and `cmd /c npm run build`.
