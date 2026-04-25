# p6-crm-1a-adapter-pattern

> **Phase:** 6 — Integrations
> **Group:** CRM
> **Status:** ⬜ Not Started
> **Dependencies:** Phase 5 complete

## Objective

Create the CRM adapter interface designed for provider swap-in.

## Scope

- CRMAdapter interface: syncActor(), syncSubmission(), getContact()
- Abstract base and null adapter (logs only)
- Designed for HubSpot/Salesforce swap-in

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/integrations/crm/types.ts` |
| Create | `src/lib/integrations/crm/adapter.ts` |
| Create | `src/lib/integrations/crm/null-adapter.ts` |

## Detailed task breakdown to be completed at phase start.
