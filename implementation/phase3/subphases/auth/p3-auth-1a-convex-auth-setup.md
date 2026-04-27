# p3-auth-1a-convex-auth-setup

> **Phase:** 3 - Backend & Persistence
> **Group:** Auth
> **Status:** In Progress
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

- [x] Auth provider is compatible with Convex function authorization.
- [x] Admin and moderator roles are represented in Convex.
- [x] Unauthenticated users cannot access admin routes.
- [ ] Convex admin mutations can assert user role server-side.

## Implementation Notes

- V1 uses Clerk with the Convex Clerk integration.
- Clerk app keys belong in `.env.local`; `CLERK_JWT_ISSUER_DOMAIN` must also be set on the Convex development deployment so `convex/auth.config.ts` can validate Clerk tokens.
- The first admin account is `thealanms@gmail.com`; role seeding and Convex-side role assertions remain for `p3-auth-2a-role-guards`.

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
