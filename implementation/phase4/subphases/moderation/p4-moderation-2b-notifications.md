# p4-moderation-2b-notifications

> **Phase:** 4 — Community Features
> **Group:** Moderation
> **Status:** ⬜ Not Started
> **Dependencies:** p4-moderation-1a-queue, p4-moderation-1b-review-ui

## Objective

Add email notifications for submission lifecycle events.

## Scope

- Email adapter pattern (interface + console logger dev, ready for SendGrid/Resend production)
- Confirmation on submission
- Notification on approval/decline
- Email templates

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/email/types.ts` |
| Create | `src/lib/email/adapter.ts` |
| Create | `src/lib/email/templates.ts` |
| Create | `src/lib/email/send.ts` |

## Detailed task breakdown to be completed at phase start.
