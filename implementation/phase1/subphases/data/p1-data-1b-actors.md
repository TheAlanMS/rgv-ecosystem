# p1-data-1b-actors

> **Phase:** 1 — Foundations
> **Group:** Data
> **Status:** ✅ Complete
> **Dependencies:** p1-data-1a-static-seed

## Objective

Create comprehensive actor seed data organized by pillar.

## Tasks

### T1: Actor data files (10 pillar files)
- **Files:**
  - `src/lib/data/actors/pillar-01-innovation-customers.ts`
  - `src/lib/data/actors/pillar-02-talent-pool.ts`
  - `src/lib/data/actors/pillar-03-capital-providers.ts`
  - `src/lib/data/actors/pillar-04-education-pipelines.ts`
  - `src/lib/data/actors/pillar-05-professional-services.ts`
  - `src/lib/data/actors/pillar-06-communities-peer-groups.ts`
  - `src/lib/data/actors/pillar-07-incubators-accelerators.ts`
  - `src/lib/data/actors/pillar-08-advocacy-policy.ts`
  - `src/lib/data/actors/pillar-09-shared-platform.ts`
  - `src/lib/data/actors/pillar-10-governance-accountability.ts`
- ~50 actors total, deduped across pillars

### T2: Actor barrel
- **File:** `src/lib/data/actors/index.ts`
- Aggregates and deduplicates actors from all pillar files

## Acceptance Criteria

- [x] ~50 actors with unique slugs
- [x] All actors pass ActorSchema validation
- [x] No duplicate actors across pillar files
- [x] Each actor has at least one pillar assignment
- [x] Geography data (county, city) present for all actors
