# p2-testing-2c-util-tests

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Testing (M7)
> **Status:** Complete
> **Dependencies:** p2-testing-1a-config
> **Parallel with:** p2-testing-2a, p2-testing-2b, p2-testing-2d

## Objective

Write tests for filter, search, and slug utility functions.

## Tasks

### T1: Filter utility tests
- **File:** `src/__tests__/utils/filters.test.ts`
- `filterActors` with single filter, multiple filters, AND logic
- `filterActors` with empty filters returns all
- `filterActors` with no-match returns empty
- `sortActors` ascending/descending for each field

### T2: Search utility tests
- **File:** `src/__tests__/utils/search.test.ts`
- `searchActors` ranking by match count
- Case insensitivity
- Empty query returns all
- Special characters don't crash

### T3: Slug utility tests
- **File:** `src/__tests__/utils/slug.test.ts`
- `slugify` handles spaces, special characters, unicode
- Consistent output for same input

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/__tests__/utils/filters.test.ts` | Yes |
| Create | `src/__tests__/utils/search.test.ts` | Yes |
| Create | `src/__tests__/utils/slug.test.ts` | Yes |

## Acceptance Criteria

- [x] All utility tests pass
- [x] Edge cases covered
- [x] Filter AND logic verified
- [x] Search scoring verified

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```
