# Convex Backend

Convex is the Phase 3 system of record for persisted ecosystem data.

Required local environment variables:

```text
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

Useful scripts:

```text
npm run convex:dev
npm run convex:codegen
npm run convex:deploy
npm run convex:import-seed
```

The existing Zod schemas in `src/lib/types` remain the public product
validation contract. Convex validators protect stored documents; mapper
functions should parse database documents through Zod before returning data to
components, route handlers, or public exports.
