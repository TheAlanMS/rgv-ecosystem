# p2-map-1b-markers

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Map (M3)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-filters-2a-integration
> **Parallel with:** p2-map-1a-dependencies

## Objective

Create marker and popup components for actors on the map.

## Tasks

### T1: ActorMarker component
- **File:** `src/components/map/ActorMarker.tsx`
- **Create** Leaflet marker component
  - Circular marker colored by primary pillar group (supply=blue, engine=green, demand=gold, infra=gray)
  - Sized by status: Active > Emerging > Gap

### T2: ActorPopup component
- **File:** `src/components/map/ActorPopup.tsx`
- **Create** Leaflet popup component
  - Shows: actor name, org type, city, status badge, link to `/actors/[slug]`
  - Dark theme popup styling

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/map/ActorMarker.tsx` | Yes |
| Create | `src/components/map/ActorPopup.tsx` | Yes |

## Acceptance Criteria

- [ ] Markers render at correct coordinates
- [ ] Colors match pillar group color scheme
- [ ] Popup shows essential actor info
- [ ] Link in popup navigates to actor detail page
- [ ] Components integrate with react-leaflet API

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
