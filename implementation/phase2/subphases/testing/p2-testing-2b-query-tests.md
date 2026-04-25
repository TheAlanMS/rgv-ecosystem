# p2-testing-2b-query-tests

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Testing (M7)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-testing-1a-config
> **Parallel with:** p2-testing-2a, p2-testing-2c, p2-testing-2d

## Objective

Write tests for query functions.

## Tasks

### T1: Actor query tests
- **File:** `src/__tests__/queries/actors.test.ts`
- `getActorsByPillar` returns only actors for that pillar
- `getActorsByCounty` returns correct county filter
- `getActorsByStatus` filters correctly
- `getActorBySlug` returns correct actor or undefined for missing
- Edge cases: empty results, invalid inputs

### T2: Gap query tests
- **File:** `src/__tests__/queries/gaps.test.ts`
- `getGapsByPillar` returns correct gaps
- `getGapsByCounty` works
- `getAllGaps` returns all gaps

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/__tests__/queries/actors.test.ts` | Yes |
| Create | `src/__tests__/queries/gaps.test.ts` | Yes |

## Acceptance Criteria

- [ ] All query tests pass
- [ ] Edge cases covered (no matches, invalid slug)
- [ ] Return types match expected schemas

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```
