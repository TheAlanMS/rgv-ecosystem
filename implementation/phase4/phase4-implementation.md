# Phase 4 — Community Features

> **Status:** ⬜ Not Started
> **Started:** —
> **Completed:** —
> **Executor:** TBD

## Objective

Enable community participation through actor claiming, self-service editing with moderation review, enhanced submission workflows, and a full moderation queue for admins.

## 9.9 Remediation Focus

Phase 4 must make the platform a living community-maintained map without weakening trust. The MVP priority is public submissions, corrections, gap flags, moderation, auditability, and clear submitter feedback.

Current blockers this phase must close:

- `/submit` describes a future form but does not collect data.
- Actor profiles do not expose a working correction path.
- Gap flagging is not actionable from map or pillar contexts.
- There is no moderation queue, review decision history, or community-added publishing signal.

The target state is not full self-service account ownership. It is accountable community input with human review before publication.

## Prerequisites

- Phase 3 complete (database, API, auth)
- Admin authentication working

## Subphase Groups

| Group | Folder | Subphases | Depends On | Description |
|-------|--------|-----------|------------|-------------|
| Submissions | `subphases/submissions/` | 3 | Phase 3 API | Enhanced forms, tracking, community badges |
| Moderation | `subphases/moderation/` | 4 | Submissions | Queue, review UI, audit trail, notifications |
| Profiles | `subphases/profiles/` | 3 | Moderation | Actor claiming, verification, self-editing (post-MVP unless explicitly pulled forward) |

## Dependency Graph

```
submissions -> moderation -> profiles
```

## MVP Community Cut Line

Must include:

- Public new listing submission form.
- Public correction form from every actor profile.
- Public gap flag form from map, pillar, and health contexts.
- Moderation queue for listing submissions, corrections, and gap flags.
- Review actions: approve, request more info, decline.
- Reviewer notes and decision timestamps.
- Community-added badge for approved listings for 90 days.
- Submitter confirmation state and status-friendly language.

Can defer:

- Actor claiming.
- Self-service organization editing.
- Public user accounts.
- Account transfer and annual verification automation.

If execution capacity is limited, build submissions and moderation before profile claiming.

## Gate Checks

- After each subphase: `npx tsc --noEmit && npm run lint && npm run build && npm test`

## Phase 4 Success Criteria

- [ ] `/submit` provides working forms for new listings, corrections, and gap flags.
- [ ] Every actor profile has a visible working "Suggest a correction" path.
- [ ] Every gap card or gap context has a working "Suggest an organization" or "Flag a gap" path.
- [ ] Form validation covers required fields, valid email, valid URL, valid county, valid pillar, and description length.
- [ ] Approved submissions never publish without an authenticated moderator action.
- [ ] Declined and request-more-info decisions require reviewer notes.
- [ ] Moderation decisions are auditable with reviewer, timestamp, previous value, and new value where applicable.
- [ ] Submitter email is private and not rendered in public views.
- [ ] Community-added badge is rendered for approved community listings for 90 days.
- [ ] Spam/rate-limit protection exists for public forms.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` pass.

## What Phase 4 Does NOT Include

- Analytics or tracking (Phase 5)
- External integrations (Phase 6)
- Public user accounts (admin/moderator only)
