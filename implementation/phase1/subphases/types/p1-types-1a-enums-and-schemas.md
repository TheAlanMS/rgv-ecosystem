# p1-types-1a-enums-and-schemas

> **Phase:** 1 — Foundations
> **Group:** Types
> **Status:** ✅ Complete
> **Dependencies:** None

## Objective

Define all shared enums and base schema utilities for the ecosystem data model.

## Tasks

### T1: Status and classification enums
- **File:** `src/lib/types/enums.ts`
- Defined: `Status` (Active, Emerging, Gap, Proposed), `OrgType`, `Stage`, `PillarGroup` (Supply, Engine, Demand, Infrastructure), `GapStatus`, `County` (Cameron, Hidalgo, Starr, Willacy)
- Includes human-readable label maps for each enum

### T2: Geography types
- **File:** `src/lib/types/geography.ts`
- Defined: `CITY_COUNTY_MAP` mapping 16 cities to 4 counties
- `CountyInfo` type with county metadata

### T3: Type barrel export
- **File:** `src/lib/types/index.ts`
- Re-exports all types from enums, geography, and domain model files

## Acceptance Criteria

- [x] All enums are Zod-validated
- [x] Label maps exist for display purposes
- [x] All 16 RGV cities mapped to correct counties
- [x] Barrel export provides single import path
