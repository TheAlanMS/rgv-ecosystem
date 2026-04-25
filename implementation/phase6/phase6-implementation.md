# Phase 6 — Integrations

> **Status:** ⬜ Not Started
> **Started:** —
> **Completed:** —
> **Executor:** TBD

## Objective

Connect the ecosystem platform to external systems: CRM for relationship management, calendar/events for community coordination, and partner data feeds for keeping actor data current.

## 9.9 Remediation Focus

Phase 6 is post-MVP candidate work. None of these integrations should block the first strong MVP unless stakeholders explicitly validate that a specific integration is required for launch operations.

Current risk:

- CRM, events, and partner feeds can add operational complexity before the core map is useful.
- Integration failures can damage trust if the underlying moderation and data quality workflows are not already stable.
- External systems may introduce licensing, privacy, or data ownership constraints that conflict with the open-source and community-owned mission.

The target state is a plugin-like integration layer that imports or syncs data without weakening moderation, auditability, or open data access.

## Prerequisites

- Phase 5 complete (analytics and metrics infrastructure)
- Stakeholder validation that each integration is worth building
- Documented data ownership, privacy, and failure-mode decisions for each integration

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| CRM | `subphases/crm/` | 3 | — | Adapter pattern, HubSpot integration, sync engine |
| Events | `subphases/events/` | 4 | — | Event model, API, page, calendar sync |
| Partners | `subphases/partners/` | 4 | — | Feed adapter, import engine, admin UI, webhooks |

## Dependency Graph

```
crm (independent)
events (independent)
partners (independent)
All three groups can run in parallel.
```

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build && npm test`
- Integration tests with mock external services

## Phase 6 Success Criteria

- [ ] Each integration has a written business owner and user value statement.
- [ ] Each integration has documented data ownership and privacy rules.
- [ ] Imported records enter moderation or review before public publication unless explicitly trusted.
- [ ] Sync failures are visible to admins and do not corrupt public data.
- [ ] Integrations are isolated behind adapter interfaces.
- [ ] Tests use mocked external services and cover failure states.
- [ ] Open data export remains available without requiring third-party accounts.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` pass.

## Scope Control

Do not begin Phase 6 until the MVP cut line in `implementation/9.9-remediation-roadmap.md` is complete. If stakeholders request one integration earlier, split it into a separate approved exception with explicit scope and success criteria.

## What Phase 6 Does NOT Include

- Real-time bidirectional sync (batch only)
- Multi-tenant partner isolation
- Public API for third-party developers
