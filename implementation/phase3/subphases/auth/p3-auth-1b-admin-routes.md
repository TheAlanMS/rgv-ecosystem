# p3-auth-1b-admin-routes

> **Phase:** 3 - Backend & Persistence
> **Group:** Auth
> **Status:** In Progress
> **Dependencies:** p3-auth-1a-convex-auth-setup

## Objective

Create protected admin routes with a login page and minimal dashboard backed by Convex queries.

## Scope

- `/admin` page with server-side auth guard
- `/admin/login` page
- Minimal admin dashboard: submission count, actor count, pending reviews
- Redirect unauthenticated users to login
- Dashboard counts read from Convex through role-protected helpers

## Acceptance Criteria

- [x] Unauthenticated users cannot access `/admin`.
- [ ] Authenticated admin/moderator users can access the dashboard.
- [ ] Dashboard metrics come from Convex and do not expose private submission payloads unnecessarily.
- [x] Login route matches the selected Convex-compatible auth provider.

## Implementation Notes

- `/admin` redirects unauthenticated visitors through Clerk sign-in.
- `/admin/login` renders Clerk's sign-in component and remains outside the protected page guard.
- Dashboard metrics are intentionally static-query backed until Convex role guards and admin queries are implemented.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/app/admin/page.tsx` |
| Create | `src/app/admin/login/page.tsx` |
| Create | `src/proxy.ts` |

## Detailed task breakdown to be completed at phase start.
