# p4-submissions-1b-submission-tracking

> **Phase:** 4 — Community Features
> **Group:** Submissions
> **Status:** ⬜ Not Started
> **Dependencies:** p4-submissions-1a-enhanced-form

## Objective

Allow submitters to check the status of their submissions.

## Scope

- `/submit/status` page — lookup by email + submission ID
- Timeline display of submission stages (submitted, under review, approved/declined)
- Status lookup must not reveal private submitter data to other users
- Include request-more-info state if moderation uses it

## Acceptance Criteria

- [ ] Submitter can check status with submission id plus email verification.
- [ ] Status view shows submitted, under review, needs more info, approved, declined, or published.
- [ ] Status view never exposes reviewer-only notes unless explicitly marked public to submitter.
- [ ] Invalid lookup shows a neutral not-found message.
- [ ] Status route is optional for MVP launch if email notifications are already working.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/submit/status/page.tsx` |
| Create | `src/components/submissions/StatusTracker.tsx` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
