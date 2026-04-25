# p6-partners-1b-import-engine

> **Phase:** 6 — Integrations
> **Group:** Partners
> **Status:** ⬜ Not Started
> **Dependencies:** p6-partners-1a-feed-adapter

## Objective

Create data import engine with deduplication and conflict detection.

## Scope

- Validate incoming data against Zod schemas
- Deduplicate against existing actors (name + city matching)
- Flag conflicts for moderator review
- Auto-merge non-conflicting updates

## Preliminary Files

| Action | Path |
|--------|------|
| Create | `src/lib/integrations/partners/import.ts` |
| Create | `src/lib/integrations/partners/dedup.ts` |
| Create | `src/lib/integrations/partners/conflict.ts` |

## Detailed task breakdown to be completed at phase start.
