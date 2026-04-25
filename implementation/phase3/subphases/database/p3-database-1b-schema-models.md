# p3-database-1b-schema-models

> **Phase:** 3 — Backend & Persistence
> **Group:** Database
> **Status:** ⬜ Not Started
> **Dependencies:** p3-database-1a-prisma-init

## Objective

Define Prisma models mirroring existing Zod schemas: Actor, Pillar, Gap, Role, Journey, JourneyStep, with enums and relations.

## Scope

- Map all Zod types to Prisma models
- Define relations: Actor-to-Pillars (many-to-many), Gap-to-Pillar, Journey-to-Role
- Define enums: County, Status, OrgType, Stage, PillarGroup, GapStatus

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `prisma/schema.prisma` |

## Detailed task breakdown to be completed at phase start.
