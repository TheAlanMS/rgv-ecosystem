# p3-database-3a-validation-bridge

> **Phase:** 3 — Backend & Persistence
> **Group:** Database
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-2b-query-migration

## Objective

Ensure Zod schemas remain the validation layer on top of Prisma data, parsing database results before returning to components.

## Scope

- Create validator functions that parse Prisma results through Zod schemas
- Update type exports to work with both static and DB sources
- Ensure no runtime type mismatches between Prisma output and Zod expectations

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/validators/actor.ts` |
| Create | `src/lib/validators/pillar.ts` |
| Modify | `src/lib/types/index.ts` |

## Detailed task breakdown to be completed at phase start.
