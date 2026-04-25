# p3-database-2b-query-migration

> **Phase:** 3 — Backend & Persistence
> **Group:** Database
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-2a-migration

## Objective

Replace static data queries with Prisma database queries while maintaining identical function signatures for backward compatibility.

## Scope

- Create Prisma client singleton (`src/lib/db.ts`)
- Migrate `src/lib/queries/actors.ts` to use Prisma
- Migrate `src/lib/queries/pillars.ts` to use Prisma
- Migrate `src/lib/queries/journeys.ts` to use Prisma
- Migrate `src/lib/queries/gaps.ts` to use Prisma
- Add connection pooling

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/db.ts` |
| Modify | `src/lib/queries/actors.ts` |
| Modify | `src/lib/queries/pillars.ts` |
| Modify | `src/lib/queries/journeys.ts` |
| Modify | `src/lib/queries/gaps.ts` |

## Detailed task breakdown to be completed at phase start.
