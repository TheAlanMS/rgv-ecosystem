# p3-database-2a-data-import

> **Phase:** 3 - Backend & Persistence
> **Group:** Database
> **Status:** Not Started
> **Dependencies:** p3-database-1b-convex-schema-models

## Objective

Create an idempotent Convex import path that loads the existing static seed data into Convex while preserving every public field used by Phase 1/2.

## Scope

- Create internal Convex mutations for upserting pillars, actors, gaps, roles, journeys, and journey steps.
- Create a local import script or one-time Convex action that reads existing static data and calls the import mutations.
- Validate source data with existing Zod schemas before import.
- Verify all actors, 10 pillars, 8 roles, 8 journeys, and all gap records import successfully.
- Make re-running the import safe and deterministic.

## Acceptance Criteria

- [ ] Import validates static source data before writing.
- [ ] Import is idempotent and does not duplicate records.
- [ ] Imported records preserve ordering where UI behavior depends on ordering.
- [ ] Import reports counts for actors, pillars, gaps, roles, and journeys.
- [ ] A failed import leaves enough logs/context to identify the bad record.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `convex/importSeedData.ts` |
| Create | `scripts/import-convex-seed.ts` |
| Modify | `package.json` |

## Notes

Convex does not use SQL migrations. Schema changes are represented in `convex/schema.ts`, generated types, and deployed Convex functions.
