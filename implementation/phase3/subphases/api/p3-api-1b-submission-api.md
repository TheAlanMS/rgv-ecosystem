# p3-api-1b-submission-api

> **Phase:** 3 — Backend & Persistence
> **Group:** API
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-3a-validation-bridge

## Objective

Create the submission API endpoint for community-submitted actors, corrections, and gap flags.

## Scope

- `POST /api/submissions` with Zod validation
- Submission model in Prisma: type, data, status (pending), submitter name/email, timestamps
- Supported submission types: new listing, correction, gap flag
- Store submitter email privately; never expose it through public read APIs
- Status values: pending, needs_more_info, approved, declined, published
- Basic rate limiting (IP-based, in-memory for V1)
- Define SubmissionSchema

## Acceptance Criteria

- [ ] New listing, correction, and gap flag payloads have discriminated Zod schemas.
- [ ] Invalid payloads return typed 400 responses with field-level errors.
- [ ] Valid payloads create pending submissions only.
- [ ] Public API response never includes submitter email beyond the submitter's own confirmation response.
- [ ] Rate limiting prevents obvious spam without blocking normal users.
- [ ] Submission records include audit-ready timestamps.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/api/submissions/route.ts` |
| Create | `src/lib/types/submission.ts` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
