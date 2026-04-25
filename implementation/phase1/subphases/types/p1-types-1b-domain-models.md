# p1-types-1b-domain-models

> **Phase:** 1 — Foundations
> **Group:** Types
> **Status:** ✅ Complete
> **Dependencies:** p1-types-1a-enums-and-schemas

## Objective

Define Zod schemas for all domain entities in the ecosystem.

## Tasks

### T1: Actor schema
- **File:** `src/lib/types/actor.ts`
- `ActorSchema` with fields: name, slug, orgType, status, pillarIds, county, city, coordinates (optional), whatTheyOffer, whoTheyServe, website, description, stage
- Includes Zod refinements for data integrity

### T2: Pillar schema
- **File:** `src/lib/types/pillar.ts`
- `PillarSchema` with fields: id, name, slug, group, description, capacity, diagnosticQuestions

### T3: Role schema
- **File:** `src/lib/types/role.ts`
- `RoleSchema` with fields: id, name, slug, description, icon, color

### T4: Journey schema
- **File:** `src/lib/types/journey.ts`
- `JourneyStepSchema` and `JourneySchema`
- Journey requires exactly 4 steps (Zod tuple)

### T5: Gap schema
- **File:** `src/lib/types/gap.ts`
- `GapSchema` with fields: id, title, description, pillarId, counties, status

## Acceptance Criteria

- [x] All schemas validate with Zod at runtime
- [x] TypeScript types inferred from Zod schemas (no manual duplication)
- [x] Journey enforces exactly 4 steps
- [x] Actor coordinates are optional
