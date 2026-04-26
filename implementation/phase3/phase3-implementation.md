# Phase 3 - Backend & Persistence

> **Status:** Not Started
> **Started:** -
> **Completed:** -
> **Executor:** TBD

## Objective

Migrate from static seed data to a Convex backend and database, add typed server functions for reads and writes, expose bounded public HTTP/API surfaces where needed, create a functional submission system, and implement basic admin/moderator authentication.

## Architecture Decision

Phase 3 now uses **Convex backend + Convex database** instead of Prisma + PostgreSQL.

Convex is the system of record for persisted Phase 3 data. The existing Zod schemas remain the product-facing validation contract so the app can continue to prove that database-backed actors, pillars, gaps, roles, and journeys match the Phase 1/2 data model.

Target backend shape:

```text
Next.js app
  -> Convex React/server clients
  -> Convex queries, mutations, actions, and HTTP actions
  -> Convex database
```

Next.js route handlers may still exist for public HTTP compatibility, CSV/JSON export, or form boundaries, but they should call Convex functions instead of owning persistence logic.

## 9.9 Remediation Focus

Phase 3 should stay narrow. Its MVP job is to provide the minimum persistence and API layer required for trusted public data, submissions, and moderation. It should not become a broad platform rewrite.

Current blockers this phase must close:

- Public submissions cannot be stored or reviewed.
- Actor data cannot be updated without editing source files.
- There is no API contract for actors, pillars, gaps, submissions, or corrections.
- There is no persistence-backed audit path for community input.

The target state is a small, typed Convex backend that preserves the Phase 1/2 data contracts while enabling public submission workflows and admin review in Phase 4.

## Prerequisites

- Phase 2 complete (all interactive features and test suite)
- Convex project available for local development and deployment
- `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` configured in local environment files

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| Database | `subphases/database/` | 5 | - | Convex setup, schema, import, query migration, validation bridge |
| API | `subphases/api/` | 3 | Database | Public route wrappers, submission API, submit form wiring |
| Auth | `subphases/auth/` | 3 | Database, API | Convex-compatible auth setup, admin routes, role guards |

## Dependency Graph

```text
database -> api -> auth
```

## Key Decisions

- Convex is the Phase 3 database and backend function layer.
- Existing Zod schemas remain the validation layer for public data contracts.
- Public read surfaces should be bounded, typed, and callable from Next.js without exposing private submission fields.
- Submission writes should go through Convex mutations and never publish directly.
- Authentication should integrate with Convex user identity and store app roles in Convex.
- CSV/JSON export can be implemented through a Convex HTTP action, a Next.js route handler that calls Convex, or both.

## MVP Backend Cut Line

Build only what the V1 PRD needs:

- Actor, pillar, gap, role, journey, submission, correction, gap flag, moderation decision, and admin user role tables.
- Convex queries for public actors, pillars, gaps, journeys, roles, and health metrics.
- Convex mutations for new listing submissions, corrections, and gap flags.
- Admin-only Convex mutations for approve, request more info, decline, and publish.
- Validation bridge between Convex documents and existing Zod schemas.
- CSV or JSON export for open data access.

Defer:

- Public member accounts.
- Organization claim/self-edit workflows, unless the user explicitly moves them into MVP.
- CRM/event/partner integrations.
- Advanced analytics.

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build && npm test`
- After database subphases: add `npx convex codegen`; when a Convex deployment is configured, run `npx convex dev` during development to push functions/schema and inspect logs
- Before shipping Convex writes: inspect Convex dashboard/runtime logs for failed functions and schema errors

## Phase 3 Success Criteria

- [ ] Convex schema preserves all current actor, pillar, gap, journey, role, and governance data fields required by the PRD.
- [ ] Convex schema supports submissions, corrections, gap flags, moderation status, reviewer notes, private submitter fields, and timestamps.
- [ ] Existing static seed data imports into Convex without data loss.
- [ ] All database-backed actors pass Zod validation after import.
- [ ] Public read APIs/queries are paginated or bounded and typed.
- [ ] Submission mutations validate all user input and never publish directly.
- [ ] Submitter email is stored privately and is never exposed in public APIs.
- [ ] Admin APIs/mutations require authentication and role checks.
- [ ] Open data export is available as CSV or JSON.
- [ ] `npx convex codegen`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `npm test` pass.

## What Phase 3 Does NOT Include

- Community self-service features (Phase 4)
- Analytics or tracking (Phase 5)
- External integrations (Phase 6)
