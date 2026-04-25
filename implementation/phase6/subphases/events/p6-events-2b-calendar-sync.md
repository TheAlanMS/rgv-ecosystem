# p6-events-2b-calendar-sync

> **Phase:** 6 — Integrations
> **Group:** Events
> **Status:** ⬜ Not Started
> **Dependencies:** p6-events-2a-events-page

## Objective

Add iCal export and calendar integration.

## Scope

- .ics file generation for individual events and filtered sets
- `GET /api/events/[id]/ical` endpoint
- "Add to Calendar" button on event cards
- Optional Google Calendar API integration (adapter pattern)

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/integrations/calendar/ical.ts` |
| Create | `src/app/api/events/[id]/ical/route.ts` |
| Create | `src/lib/integrations/calendar/google.ts` |

## Detailed task breakdown to be completed at phase start.
