# p2-map-3a-integration

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Map (M3)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-map-2a-clustering, p2-map-2b-data-audit

## Objective

Create the map/list toggle and integrate the map into the /map page with filter connectivity.

## Tasks

### T1: MapToggle component
- **File:** `src/components/map/MapToggle.tsx`
- **Create** client component with two modes: "List" and "Map"
- Toggle button/tabs with icons
- Preserve view state across filter changes

### T2: Integrate into /map page
- **File:** `src/app/map/page.tsx` (modify)
- Add MapToggle above content area
- When "Map" selected, render EcosystemMap; when "List" selected, render actor grid
- Both views consume same filtered actor list

### T3: Connect FilterBar to map
- Filtered actors reflected in visible markers
- Changing filters updates both list and map views simultaneously

### T4: County boundary overlays (optional)
- Add GeoJSON polygons for Cameron, Hidalgo, Starr, Willacy with subtle fill
- Only if time permits; not a blocking requirement

## Files

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/map/MapToggle.tsx` | Yes |
| Modify | `src/app/map/page.tsx` | Yes |

## Acceptance Criteria

- [ ] Toggle switches between list grid and map view
- [ ] View state preserved across filter changes
- [ ] Filters apply to both list and map simultaneously
- [ ] Map renders all actors with coordinates as markers
- [ ] Map is responsive — fills container width, reasonable height on mobile

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
