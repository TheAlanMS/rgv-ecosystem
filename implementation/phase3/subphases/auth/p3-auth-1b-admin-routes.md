# p3-auth-1b-admin-routes

> **Phase:** 3 - Backend & Persistence
> **Group:** Auth
> **Status:** Not Started
> **Dependencies:** p3-auth-1a-convex-auth-setup

## Objective

Create protected admin routes with a login page and minimal dashboard backed by Convex queries.

## Scope

- `/admin` layout with auth guard
- `/admin/login` page
- Minimal admin dashboard: submission count, actor count, pending reviews
- Redirect unauthenticated users to login
- Dashboard counts read from Convex through role-protected helpers

## Acceptance Criteria

- [ ] Unauthenticated users cannot access `/admin`.
- [ ] Authenticated admin/moderator users can access the dashboard.
- [ ] Dashboard metrics come from Convex and do not expose private submission payloads unnecessarily.
- [ ] Login route matches the selected Convex-compatible auth provider.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/admin/layout.tsx` |
| Create | `src/app/admin/page.tsx` |
| Create | `src/app/admin/login/page.tsx` |
| Create | `src/middleware.ts` |

## Detailed task breakdown to be completed at phase start.
