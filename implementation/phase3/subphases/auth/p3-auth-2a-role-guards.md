# p3-auth-2a-role-guards

> **Phase:** 3 — Backend & Persistence
> **Group:** Auth
> **Status:** ⬜ Not Started
> **Dependencies:** p3-auth-1b-admin-routes

## Objective

Add role-based access control with admin and moderator roles.

## Scope

- Add role field to User model (admin, moderator)
- Middleware-based route protection
- `requireAuth()` and `requireRole()` utilities for route handlers
- Role-specific access to admin features

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `src/middleware.ts` |
| Modify | `prisma/schema.prisma` |
| Create | `src/lib/auth/guards.ts` |

## Detailed task breakdown to be completed at phase start.
