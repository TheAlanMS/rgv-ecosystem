# Phase 3 — Backend & Persistence

> **Status:** ⬜ Not Started
> **Started:** —
> **Completed:** —
> **Executor:** TBD

## Objective

Migrate from static seed data to a persistent database layer with Prisma + PostgreSQL, add API route handlers for CRUD operations, create a functional submission system, and implement basic authentication for admin/moderator access.

## 9.9 Remediation Focus

Phase 3 should stay narrow. Its MVP job is to provide the minimum persistence and API layer required for trusted public data, submissions, and moderation. It should not become a broad platform rewrite.

Current blockers this phase must close:

- Public submissions cannot be stored or reviewed.
- Actor data cannot be updated without editing source files.
- There is no API contract for actors, pillars, gaps, submissions, or corrections.
- There is no persistence-backed audit path for community input.

The target state is a small, typed backend that preserves the Phase 1/2 data contracts while enabling public submission workflows and admin review in Phase 4.

## Prerequisites

- Phase 2 complete (all interactive features and test suite)
- PostgreSQL instance available (local or hosted)

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| Database | `subphases/database/` | 5 | — | Prisma setup, schema, migration, query migration, validation bridge |
| API | `subphases/api/` | 3 | Database | Route handlers, submission API, submit form wiring |
| Auth | `subphases/auth/` | 3 | Database, API | NextAuth setup, admin routes, role guards |

## Dependency Graph

```
database ──> api ──> auth
```

## Key Decisions (to be made at phase start)

- PostgreSQL hosting provider (prefer Supabase or Neon unless the user chooses otherwise)
- NextAuth v5 provider strategy (email/password for V1, OAuth later)
- API response format and pagination strategy
- Whether CSV/JSON export is implemented through an API endpoint, static generation, or both

## MVP Backend Cut Line

Build only what the V1 PRD needs:

- Actor, pillar, gap, submission, correction, and moderation decision models.
- Read APIs for public actors, pillars, gaps, and health metrics.
- Write APIs for new listing submissions, corrections, and gap flags.
- Admin-only review APIs for approve, request more info, decline, and publish.
- Validation bridge between Prisma models and existing Zod schemas.
- CSV or JSON export for open data access.

Defer:

- Public member accounts.
- Organization claim/self-edit workflows, unless the user explicitly moves them into MVP.
- CRM/event/partner integrations.
- Advanced analytics.

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build && npm test`
- After database subphases: add `npx prisma validate && npx prisma generate`

## Phase 3 Success Criteria

- [ ] Database schema preserves all current actor, pillar, gap, journey, and governance data fields required by the PRD.
- [ ] Database schema supports submissions, corrections, gap flags, moderation status, reviewer notes, and timestamps.
- [ ] Existing static seed data migrates without data loss.
- [ ] All actors pass Zod validation after migration.
- [ ] Public read APIs are paginated or bounded and typed.
- [ ] Submission APIs validate all user input and never publish directly.
- [ ] Submitter email is stored privately and is never exposed in public APIs.
- [ ] Admin APIs require authentication and role checks.
- [ ] Open data export is available as CSV or JSON.
- [ ] `npx prisma validate`, `npx prisma generate`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` pass.

## What Phase 3 Does NOT Include

- Community self-service features (Phase 4)
- Analytics or tracking (Phase 5)
- External integrations (Phase 6)
