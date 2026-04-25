# p4-profiles-1a-claim-flow

> **Phase:** 4 — Community Features
> **Group:** Profiles
> **Status:** ⬜ Not Started
> **Dependencies:** Phase 3 complete

## Objective

Create the backend flow for actor claiming with verification.

## Scope

- ClaimRequest Prisma model (actor, claimant email, verification info, status)
- `POST /api/actors/[slug]/claim` route handler
- Verification logic (email domain match, org affiliation)

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `prisma/schema.prisma` |
| Create | `src/app/api/actors/[slug]/claim/route.ts` |
| Create | `src/lib/types/claim.ts` |

## Detailed task breakdown to be completed at phase start.
