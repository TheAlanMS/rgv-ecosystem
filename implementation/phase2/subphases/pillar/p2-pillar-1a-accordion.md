# p2-pillar-1a-accordion

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Pillar (M4)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-map-3a-integration

## Objective

Create collapsible pillar accordion components for inline actor exploration.

## Tasks

### T1: PillarAccordion component
- **File:** `src/components/pillars/PillarAccordion.tsx`
- **Create** client component
  - Renders a list of PillarAccordionItem components
  - Multiple pillars can be open simultaneously

### T2: PillarAccordionItem component
- **File:** `src/components/pillars/PillarAccordionItem.tsx`
- **Create** client component
  - Left side: pillar name, group tag, capacity indicator
  - Right side: actor count badge, expand/collapse chevron
  - Expanded state shows actors using ActorCard
  - Smooth height transition animation
  - Chevron rotates on expand/collapse

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/pillars/PillarAccordion.tsx` | Yes |
| Create | `src/components/pillars/PillarAccordionItem.tsx` | Yes |

## Acceptance Criteria

- [ ] Each pillar shows as a collapsible row with name, group tag, actor count
- [ ] Expanding a pillar reveals its actors using ActorCard
- [ ] Multiple pillars can be open simultaneously
- [ ] Collapse/expand is animated smoothly
- [ ] Empty pillars (after filtering) show "No matching actors"

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
