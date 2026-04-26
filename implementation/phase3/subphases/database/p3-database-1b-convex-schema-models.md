# p3-database-1b-convex-schema-models

> **Phase:** 3 - Backend & Persistence
> **Group:** Database
> **Status:** Completed
> **Dependencies:** p3-database-1a-convex-init

## Objective

Define Convex tables and validators that mirror the existing Zod schemas for Actor, Pillar, Gap, Role, Journey, and JourneyStep, plus Phase 3 submission and moderation records.

## Scope

- Map all current Zod data contracts to Convex table validators.
- Define tables for actors, pillars, gaps, roles, journeys, journey steps, submissions, moderation decisions, and admin user roles.
- Preserve enum values for County, Status, OrgType, Stage, PillarGroup, GapStatus, role IDs, submission type, and moderation status.
- Model many-to-many relationships explicitly where Convex documents need fast indexed reads.
- Add indexes for public lookup paths: actor slug, actor county/status, pillar slug/id, gap pillar/county/status, journey role, submission status.
- Keep private fields, especially submitter email, isolated from public query return shapes.

## Acceptance Criteria

- [x] Convex schema preserves all fields needed by existing Zod schemas.
- [x] Convex schema includes submission, correction, gap flag, moderation status, reviewer notes, and timestamps.
- [x] Public lookup fields have indexes.
- [x] Schema names and field names are aligned with existing TypeScript domain language.
- [x] Data that remains intentionally static is documented.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `convex/schema.ts` |
| Create | `convex/domain.ts` |

## Modeling Guidance

- Use scalar fields for coordinates: `latitude`, `longitude`, and `coordinateSource`.
- Use ordered arrays for small, document-owned lists such as offers, audiences, industry focus, stage tags, and journey step pillar IDs unless a later moderation workflow requires separate tables.
- Preserve the current split where first-class gap records exist and some actor records also have `status: "Gap"`.
- Store presentation-only role colors as explicit fields or a small object, but keep them out of core domain logic.
