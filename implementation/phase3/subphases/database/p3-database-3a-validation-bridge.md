# p3-database-3a-validation-bridge

> **Phase:** 3 - Backend & Persistence
> **Group:** Database
> **Status:** Completed
> **Dependencies:** p3-database-2b-query-migration

## Objective

Ensure Zod schemas remain the validation layer on top of Convex documents before data is returned to components, route handlers, or public exports.

## Scope

- Create validator/mapper functions that convert Convex documents into existing domain shapes.
- Parse database-backed actors, pillars, gaps, roles, and journeys through existing Zod schemas.
- Keep private database fields out of public domain objects.
- Add tests for mapper behavior and validation failure paths.
- Update type exports only where needed to avoid duplicating Convex-generated types and Zod-inferred domain types.

## Acceptance Criteria

- [x] Convex actor documents map to `Actor` and pass `ActorSchema`.
- [x] Convex pillar documents map to `Pillar` and pass `PillarSchema`.
- [x] Convex gap documents map to `Gap` and pass `GapSchema`.
- [x] Convex role and journey documents map to existing `Role` and `Journey` shapes.
- [x] Invalid Convex documents fail loudly at the validation bridge, not inside UI components.
- [x] Public exports and API wrappers use validated domain objects.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/validators/actor.ts` |
| Create | `src/lib/validators/pillar.ts` |
| Create | `src/lib/validators/gap.ts` |
| Create | `src/lib/validators/journey.ts` |
| Create | `src/lib/validators/role.ts` |
| Modify | `src/lib/types/index.ts` |

## Notes

Convex validators protect stored document shape. Zod protects the public product contract. Keep both layers aligned, but do not replace the existing Zod schemas with Convex validators.
