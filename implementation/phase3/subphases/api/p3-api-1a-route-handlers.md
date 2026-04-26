# p3-api-1a-route-handlers

> **Phase:** 3 - Backend & Persistence
> **Group:** API
> **Status:** Completed
> **Dependencies:** p3-database-3a-validation-bridge

## Objective

Create public Next.js Route Handlers for actors and pillars with pagination and filtering. Route handlers should delegate persistence reads to Convex queries or validated Convex-backed server helpers.

## Scope

- `GET /api/actors` - list with pagination, filtering by county/status/pillarGroup
- `GET /api/actors/[slug]` - single actor by slug
- `GET /api/pillars` - list all pillars
- `GET /api/pillars/[slug]` - single pillar with related actors
- Responses use the Zod validation bridge before returning public data
- Private submission fields are never exposed through public route handlers

## Acceptance Criteria

- [x] Public responses are typed and bounded.
- [x] Invalid filters return typed 400 responses.
- [x] Missing records return typed 404 responses.
- [x] Route handlers do not duplicate Convex query logic.
- [x] Public responses contain only validated public fields.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/api/actors/route.ts` |
| Create | `src/app/api/actors/[slug]/route.ts` |
| Create | `src/app/api/pillars/route.ts` |
| Create | `src/app/api/pillars/[slug]/route.ts` |

## Detailed task breakdown to be completed at phase start.
