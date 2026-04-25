# p1-data-1a-static-seed

> **Phase:** 1 — Foundations
> **Group:** Data
> **Status:** ✅ Complete
> **Dependencies:** p1-types-1b-domain-models

## Objective

Create static seed data files for all non-actor domain entities.

## Tasks

### T1: Pillars data
- **File:** `src/lib/data/pillars.ts`
- 10 pillars defined with full metadata (name, group, capacity, diagnostic questions)
- Runtime Zod validation on export

### T2: Roles data
- **File:** `src/lib/data/roles.ts`
- 8 user roles: Founder/Entrepreneur, Investor/Funder, Educator/University, EDO/Ecosystem Builder, Corporate/Innovation Buyer, Service Provider, Student/Builder, Government/Policy

### T3: Journeys data
- **File:** `src/lib/data/journeys.ts`
- 8 journeys (one per role), each with 4 steps

### T4: Gaps data
- **File:** `src/lib/data/gaps.ts`
- 6 identified gaps in the ecosystem

### T5: Geography data
- **File:** `src/lib/data/geography.ts`
- 4 RGV counties, 16 cities, city-county mapping

### T6: Data barrel
- **File:** `src/lib/data/index.ts`
- Re-exports all data modules

## Acceptance Criteria

- [x] All data passes Zod validation at import time
- [x] 10 pillars across 4 pillar groups
- [x] 8 roles with distinct descriptions
- [x] 8 journeys with exactly 4 steps each
- [x] All 16 cities correctly mapped to counties
