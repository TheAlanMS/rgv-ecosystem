# p2-testing-2a-data-tests

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Testing (M7)
> **Status:** Complete
> **Dependencies:** p2-testing-1a-config
> **Parallel with:** p2-testing-2b, p2-testing-2c, p2-testing-2d

## Objective

Write data validation tests verifying all seed data passes schemas.

## Tasks

### T1: Actor validation tests
- **File:** `src/__tests__/data/actors.test.ts`
- All actors pass ActorSchema
- Merged `ALL_ACTORS` validates with `z.array(ActorSchema)`
- No duplicate ids
- No duplicate slugs
- All counties are valid
- All pillarIds reference valid pillars
- All non-gap actors have at least one way to connect (`websiteUrl`, `applyUrl`, or `contactEmail`) unless explicitly documented
- All RGV actors have coordinates after p2-map-2b
- Starr and Willacy are represented by active actors, explicit gaps, or both

### T2: Pillar validation tests
- **File:** `src/__tests__/data/pillars.test.ts`
- All pillars pass PillarSchema
- 10 pillars total, covering all 4 groups

### T3: Journey validation tests
- **File:** `src/__tests__/data/journeys.test.ts`
- All journeys pass JourneySchema
- Each journey has exactly 4 steps
- All role references are valid

### T4: Geography tests
- **File:** `src/__tests__/data/geography.test.ts`
- City-county mapping completeness
- All actor cities have valid county mappings
- OutsideRGV actor handling is explicit and does not pollute RGV county counts

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/__tests__/data/actors.test.ts` | Yes |
| Create | `src/__tests__/data/pillars.test.ts` | Yes |
| Create | `src/__tests__/data/journeys.test.ts` | Yes |
| Create | `src/__tests__/data/geography.test.ts` | Yes |

## Acceptance Criteria

- [x] All data validation tests pass
- [x] Zero invalid actors, pillars, journeys
- [x] Geography mapping is complete
- [x] Zero duplicate actor ids or slugs
- [x] Coordinates and county representation pass the 9.9 remediation checks

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```
