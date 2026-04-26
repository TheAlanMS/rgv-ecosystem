# p3-database-1a-convex-init

> **Phase:** 3 - Backend & Persistence
> **Group:** Database
> **Status:** Completed
> **Dependencies:** Phase 2 complete

## Objective

Install and initialize Convex, configure local environment variables, and create the baseline Convex app structure.

## Scope

- Install `convex`.
- Run Convex initialization for this Next.js app.
- Configure `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in `.env.local` and `.env.example`.
- Create the `convex/` directory with baseline config files.
- Add package scripts for Convex development, code generation, and deployment.
- Confirm `convex/_generated/` is committed so TypeScript can resolve generated Convex APIs.

## Acceptance Criteria

- [x] Convex package is installed and package scripts are documented.
- [x] `convex/` exists with a minimal schema/functions structure.
- [x] Environment variable requirements are documented without committing secrets.
- [ ] `npx convex codegen` can run locally after initialization.
- [x] `convex/_generated/` exists and is tracked.
- [x] Existing app tests still run without requiring a live Convex deployment.

## Completion Notes

- Convex, `tsx`, package scripts, `convex/`, `.env.example`, and generated API
  stubs were added.
- `npx convex codegen` is blocked until `CONVEX_DEPLOYMENT` is configured.

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `convex/schema.ts` |
| Create | `convex/README.md` |
| Create | `.env.example` |
| Modify | `package.json` |
| Modify | `.gitignore` |

## Notes

Do not add Prisma, PostgreSQL, or `DATABASE_URL` setup in Phase 3. Convex is the backend/database layer.
