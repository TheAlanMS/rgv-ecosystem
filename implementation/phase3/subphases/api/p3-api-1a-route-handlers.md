# p3-api-1a-route-handlers

> **Phase:** 3 — Backend & Persistence
> **Group:** API
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-3a-validation-bridge

## Objective

Create Next.js Route Handlers for actors and pillars with pagination and filtering.

## Scope

- `GET /api/actors` — list with pagination, filtering by county/status/pillarGroup
- `GET /api/actors/[slug]` — single actor by slug
- `GET /api/pillars` — list all pillars
- `GET /api/pillars/[slug]` — single pillar with related actors

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/api/actors/route.ts` |
| Create | `src/app/api/actors/[slug]/route.ts` |
| Create | `src/app/api/pillars/route.ts` |
| Create | `src/app/api/pillars/[slug]/route.ts` |

## Detailed task breakdown to be completed at phase start.
