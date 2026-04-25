# p2-onboarding-1a-data

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Onboarding (M5)
> **Status:** ⬜ Not Started
> **Dependencies:** None (independent of other Phase 2 groups)
> **Parallel with:** p2-filters-1a, p2-filters-1b, p2-onboarding-1b

## Objective

Define intent options and the role-intent routing map.

## Tasks

### T1: Intent definitions
- **File:** `src/lib/data/intents.ts`
- **Create** intent options: "Explore the ecosystem", "Find resources", "Connect with others", "Understand gaps", "Get started"
- Define `IntentSchema` with Zod
- Create role-intent routing map: each (role, intent) pair maps to a target URL with pre-applied filters
  - Example: startup + "find resources" → `/journeys/startup`
  - Example: startup + "explore" -> `/map?pillar=4,6,7`
  - Example: investor + "understand gaps" → `/ecosystem-health`

### T2: PRD alignment notes
- Each route must be traceable to the PRD player-type jobs to be done.
- Prefer pillar ids over pillar groups for specific role-intent routes.
- Use `/ecosystem-health` for EDO and policy gap-diagnosis intents.
- Use `/journeys/[role]` when the user intent is path education rather than actor discovery.

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/lib/data/intents.ts` | Yes |

## Acceptance Criteria

- [ ] All 8 roles have intent mappings
- [ ] Each role exposes 2-3 PRD-backed intents, not generic marketing options
- [ ] Each intent maps to a valid route with appropriate filters
- [ ] Routes use numeric `pillar` filters when the intent targets specific I2E pillars
- [ ] IntentSchema validates correctly
- [ ] Routing map covers all role-intent combinations

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
