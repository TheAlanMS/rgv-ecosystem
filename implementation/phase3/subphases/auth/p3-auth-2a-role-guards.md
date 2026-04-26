# p3-auth-2a-role-guards

> **Phase:** 3 - Backend & Persistence
> **Group:** Auth
> **Status:** Not Started
> **Dependencies:** p3-auth-1b-admin-routes

## Objective

Add role-based access control with admin and moderator roles across Next.js routes and Convex functions.

## Scope

- Add user role records in Convex (admin, moderator).
- Middleware-based route protection.
- `requireAuth()` and `requireRole()` utilities for route handlers.
- Convex-side role assertions for admin queries and mutations.
- Role-specific access to admin features.

## Acceptance Criteria

- [ ] Admin routes reject unauthenticated users.
- [ ] Moderator users can access moderation workflows but not admin-only settings.
- [ ] Convex mutations enforce role checks server-side.
- [ ] Role guard tests cover allowed and denied paths.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `src/middleware.ts` |
| Modify | `convex/schema.ts` |
| Create | `src/lib/auth/guards.ts` |
| Create | `convex/lib/guards.ts` |

## Detailed task breakdown to be completed at phase start.
