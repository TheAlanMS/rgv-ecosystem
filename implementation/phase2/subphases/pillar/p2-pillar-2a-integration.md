# p2-pillar-2a-integration

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Pillar (M4)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-pillar-1a-accordion

## Objective

Add "By Pillar" as a third view mode on the /map page.

## Tasks

### T1: Update MapToggle
- **File:** `src/components/map/MapToggle.tsx` (modify)
- Add third option: "By Pillar" alongside "List" and "Map"

### T2: Integrate accordion into /map page
- **File:** `src/app/map/page.tsx` (modify)
- When "By Pillar" selected, render PillarAccordion
- Pass filtered actors to accordion (filters apply within expanded pillars)

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/components/map/MapToggle.tsx` | Yes |
| Modify | `src/app/map/page.tsx` | Yes |

## Acceptance Criteria

- [ ] Three view modes: List, Map, By Pillar
- [ ] Toggle shows all three options
- [ ] Filters apply to actors within expanded pillars
- [ ] View mode persists across filter changes
- [ ] Transition between views is smooth

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
