# p2-map-2a-clustering

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Map (M3)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-map-1a-dependencies, p2-map-1b-markers
> **Parallel with:** p2-map-2b-data-audit

## Objective

Implement marker clustering for dense areas (McAllen-Edinburg-Mission corridor).

## Tasks

### T1: Install clustering library
- **Package:** `react-leaflet-cluster` or equivalent
- Evaluate options for Leaflet marker clustering compatible with react-leaflet v5

### T2: Integrate clustering into EcosystemMap
- **File:** `src/components/map/EcosystemMap.tsx` (modify)
- Wrap markers in cluster group
- Clusters expand on zoom in, collapse on zoom out
- Cluster count badge visible at zoomed-out levels

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/components/map/EcosystemMap.tsx` | Yes |
| Modify | `package.json` | Yes (this batch only) |

## Acceptance Criteria

- [ ] Markers cluster at lower zoom levels
- [ ] Clusters show count badge
- [ ] Clicking cluster zooms into contained markers
- [ ] Dense areas (McAllen-Edinburg-Mission) cluster cleanly
- [ ] Single markers remain clickable with popups

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
