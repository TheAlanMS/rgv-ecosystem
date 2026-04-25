# p4-profiles-2a-edit-flow

> **Phase:** 4 — Community Features
> **Group:** Profiles
> **Status:** ⬜ Not Started
> **Dependencies:** p4-profiles-1a-claim-flow, p4-profiles-1b-claim-ui

## Objective

Allow claimed actor owners to edit their listing, with changes going through moderation review.

## Scope

- `/actors/[slug]/edit` protected page
- Edit form pre-filled with current data
- Changes create pending ActorRevision (not immediate update)
- ActorRevision Prisma model

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/actors/[slug]/edit/page.tsx` |
| Create | `src/components/actors/EditActorForm.tsx` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
