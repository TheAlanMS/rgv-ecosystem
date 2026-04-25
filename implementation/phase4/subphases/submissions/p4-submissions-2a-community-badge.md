# p4-submissions-2a-community-badge

> **Phase:** 4 — Community Features
> **Group:** Submissions
> **Status:** ⬜ Not Started
> **Dependencies:** p4-submissions-1a-enhanced-form, p4-submissions-1b-submission-tracking

## Objective

Display a "Community Added" badge on recently approved community submissions.

## Scope

- 90-day badge display after approval
- `approvedAt` and badge expiry fields
- Badge on ActorCard and ActorProfile
- Badge only appears for approved community submissions, not admin-seeded actors

## Acceptance Criteria

- [ ] Community-added badge appears on ActorCard for approved community listings within 90 days.
- [ ] Community-added badge appears on ActorProfile with published date context.
- [ ] Badge disappears automatically after 90 days.
- [ ] Badge state is derived from persisted approval metadata.
- [ ] Badge does not expose submitter identity or email.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `src/components/actors/ActorCard.tsx` |
| Modify | `src/components/actors/ActorProfile.tsx` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
