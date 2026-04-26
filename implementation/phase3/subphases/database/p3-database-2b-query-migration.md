# p3-database-2b-query-migration

> **Phase:** 3 - Backend & Persistence
> **Group:** Database
> **Status:** Completed
> **Dependencies:** p3-database-2a-data-import

## Objective

Add Convex-backed query functions while preserving the existing synchronous static query API until all call sites are intentionally migrated.

## Scope

- Create Convex public queries for actors, pillars, journeys, roles, gaps, and health metrics.
- Create Next.js/server helper functions for calling Convex queries from route handlers and server components.
- Preserve existing synchronous `src/lib/queries/*` functions as static fallback/query compatibility functions unless a call site is explicitly migrated to async.
- Add async database-backed equivalents where needed for API routes and future server-rendered pages.
- Keep result shapes compatible with existing domain types after validation.

## Acceptance Criteria

- [x] Existing synchronous query tests continue to pass unless deliberately updated.
- [x] Convex query functions return bounded, ordered, typed results.
- [x] Missing slug/id lookups return `null` or `undefined` consistently at the adapter boundary.
- [x] Public queries never return private submitter fields.
- [x] Query helpers document whether they read static data or Convex data.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `convex/actors.ts` |
| Create | `convex/pillars.ts` |
| Create | `convex/journeys.ts` |
| Create | `convex/gaps.ts` |
| Create | `src/lib/convex/server.ts` |
| Modify | `src/lib/queries/actors.ts` |
| Modify | `src/lib/queries/pillars.ts` |
| Modify | `src/lib/queries/journeys.ts` |
| Modify | `src/lib/queries/gaps.ts` |

## Notes

The current app calls query functions synchronously during render and static parameter generation. Do not turn those functions async as a hidden breaking change. Add explicit async Convex-backed functions first, then migrate call sites in small, reviewable steps.
