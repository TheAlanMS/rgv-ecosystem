# p6-events-1b-events-api

> **Phase:** 6 — Integrations
> **Group:** Events
> **Status:** ⬜ Not Started
> **Dependencies:** p6-events-1a-event-model

## Objective

Create event API endpoints and query functions.

## Scope

- `GET /api/events` — list, filterable by date range, pillar, county
- `GET /api/events/[id]` — single event
- `POST /api/events` — admin-only create
- Event query functions

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/api/events/route.ts` |
| Create | `src/app/api/events/[id]/route.ts` |
| Create | `src/lib/queries/events.ts` |

## Detailed task breakdown to be completed at phase start.
