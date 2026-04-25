# p4-moderation-1a-queue

> **Phase:** 4 — Community Features
> **Group:** Moderation
> **Status:** ⬜ Not Started
> **Dependencies:** p4-submissions-2a-community-badge

## Objective

Create the admin moderation queue listing all pending listing submissions, corrections, and gap flags.

## Scope

- `/admin/moderation` page
- List pending items filtered by type, status, county, and pillar
- Oldest-first default sort
- Show enough context for a moderator to approve, request more info, or decline without leaving the queue
- Claims can be added later, but they are not required for MVP

## Acceptance Criteria

- [ ] Queue shows pending new listings, corrections, and gap flags.
- [ ] Queue supports approve, request more info, and decline actions.
- [ ] Request-more-info and decline actions require reviewer notes.
- [ ] Each decision records reviewer, timestamp, status transition, and notes.
- [ ] Approving a correction preserves enough history to audit changed fields.
- [ ] Approving a gap flag creates or updates a gap registry record.
- [ ] Queue is admin-only.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/admin/moderation/page.tsx` |
| Create | `src/components/admin/ModerationQueue.tsx` |
| Create | `src/components/admin/ModerationItem.tsx` |

## Detailed task breakdown to be completed at phase start.
