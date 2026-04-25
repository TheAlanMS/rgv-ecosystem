# p3-database-2a-migration

> **Phase:** 3 — Backend & Persistence
> **Group:** Database
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-1b-schema-models

## Objective

Generate and run the initial database migration. Create a seed script that imports all existing static data into the database.

## Scope

- Run `npx prisma migrate dev --name init`
- Create `prisma/seed.ts` importing all static data
- Configure `prisma db seed` command
- Verify all ~50 actors, 10 pillars, 8 roles, 8 journeys, 6 gaps seeded correctly

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `prisma/seed.ts` |
| Create | `prisma/migrations/*/migration.sql` |
| Modify | `package.json` |

## Detailed task breakdown to be completed at phase start.
