# p3-auth-1a-convex-auth-setup

> **Phase:** 3 - Backend & Persistence
> **Group:** Auth
> **Status:** Not Started
> **Dependencies:** p3-api-2a-submit-form

## Objective

Install and configure authentication for admin/moderator access, with user identity and app roles available to Convex functions.

## Scope

- Choose and install the Convex-compatible auth provider for V1.
- Configure admin-only sign-in.
- Store app-specific user role records in Convex.
- Ensure Convex queries/mutations can read authenticated identity.
- Add a session/auth provider to the app layout as needed by the selected provider.
- Add root/app auth configuration.

## Acceptance Criteria

- [ ] Auth provider is compatible with Convex function authorization.
- [ ] Admin and moderator roles are represented in Convex.
- [ ] Unauthenticated users cannot access admin routes.
- [ ] Convex admin mutations can assert user role server-side.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `package.json` |
| Modify | `convex/schema.ts` |
| Modify | `src/app/layout.tsx` |
| Create | `auth.ts` |
| Create | `src/lib/auth/config.ts` |
| Create | `convex/auth.ts` |

## Detailed task breakdown to be completed at phase start.
