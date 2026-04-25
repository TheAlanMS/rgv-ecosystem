# p5-tracking-1a-event-schema

> **Phase:** 5 — Analytics & Insights
> **Group:** Tracking
> **Status:** ⬜ Not Started
> **Dependencies:** Phase 4 complete

## Objective

Define the analytics event schema and database model.

## Scope

- Zod schemas for event types: PageView, ActorView, JourneyStart, JourneyComplete, SearchPerformed, FilterApplied, MapInteraction, SubmissionStarted
- AnalyticsEvent Prisma model with JSONB payload

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/types/analytics.ts` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
