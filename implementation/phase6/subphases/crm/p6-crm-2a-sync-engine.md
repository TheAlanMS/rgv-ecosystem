# p6-crm-2a-sync-engine

> **Phase:** 6 — Integrations
> **Group:** CRM
> **Status:** ⬜ Not Started
> **Dependencies:** p6-crm-1b-hubspot-adapter

## Objective

Create bidirectional sync engine between platform and CRM.

## Scope

- Push to CRM on actor create/update
- Create CRM contact on submission approval
- Batch sync command for initial load
- SyncLog model for tracking

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/integrations/crm/sync.ts` |
| Create | `src/app/api/admin/crm/sync/route.ts` |
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
