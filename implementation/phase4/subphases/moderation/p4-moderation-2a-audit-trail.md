# p4-moderation-2a-audit-trail

> **Phase:** 4 — Community Features
> **Group:** Moderation
> **Status:** ⬜ Not Started
> **Dependencies:** p4-moderation-1a-queue, p4-moderation-1b-review-ui

## Objective

Create an audit trail for all moderation actions with an admin-visible history page.

## Scope

- ModerationAction Prisma model (moderator, action, reason, timestamp)
- `/admin/audit` page showing action history
- Filterable by moderator, action type, date range

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/admin/audit/page.tsx` |
| Create | `src/components/admin/AuditLog.tsx` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
