# p5-metrics-1a-aggregation

> **Phase:** 5 — Analytics & Insights
> **Group:** Metrics
> **Status:** ⬜ Not Started
> **Dependencies:** p5-tracking-2a-journey-tracking

## Objective

Create metrics aggregation functions for daily/weekly/monthly rollups.

## Scope

- Aggregate: pageviews, top actors, top search terms, filter usage, geographic heat
- MetricSnapshot Prisma model for storing aggregates
- Cron-ready aggregation function (not actual cron in V1)

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/analytics/aggregation.ts` |
| Create | `src/lib/analytics/metrics.ts` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
