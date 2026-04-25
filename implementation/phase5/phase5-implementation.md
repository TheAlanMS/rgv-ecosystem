# Phase 5 — Analytics & Insights

> **Status:** ⬜ Not Started
> **Started:** —
> **Completed:** —
> **Executor:** TBD

## Objective

Add event tracking, metrics aggregation, and enhanced dashboards to understand how the ecosystem platform is used and how the ecosystem itself is evolving.

## 9.9 Remediation Focus

Phase 5 is post-MVP unless the user explicitly asks to prioritize analytics earlier. The MVP should not wait for full event tracking, but the ecosystem health view must become data-derived before a 9.9 score is credible.

Current blockers this phase should close after MVP launch:

- Ecosystem health is partly hardcoded.
- There is no trend line for actor count, gap closure, or verification freshness.
- There is no usage data to show which roles, filters, actors, or journeys are most valuable.

The first Phase 5 deliverable should be a data-derived public health dashboard, not a broad analytics platform.

## Prerequisites

- Phase 4 complete (community features, moderation)

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| Tracking | `subphases/tracking/` | 3 | — | Event schema, client tracker, journey analytics |
| Metrics | `subphases/metrics/` | 3 | Tracking | Aggregation, health scoring, API endpoints |
| Dashboard | `subphases/dashboard/` | 3 | Metrics | Public health page, admin analytics, trends |

## Dependency Graph

```
tracking ──> metrics ──> dashboard
```

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build && npm test`

## Phase 5 Success Criteria

- [ ] Public ecosystem health metrics are derived from actor, gap, submission, and verification data.
- [ ] Pillar strength, county coverage, open gaps, and freshness are visible.
- [ ] Trend data is available for actor count, gap status, and verification freshness where historical data exists.
- [ ] Event tracking avoids third-party analytics by default.
- [ ] User analytics never expose submitter emails or private moderation data.
- [ ] Admin analytics separate product usage metrics from ecosystem health metrics.
- [ ] Metrics aggregation is documented and reproducible.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` pass.

## Scope Control

Do not add tracking before the public product has usable filters, search, map views, submissions, and moderation. Analytics should measure validated workflows, not compensate for missing product value.

## What Phase 5 Does NOT Include

- External integrations (Phase 6)
- Real-time analytics (batch aggregation only)
- Third-party analytics services (self-hosted)
