# p2-map-1a-dependencies

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Map (M3)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-filters-2a-integration
> **Parallel with:** p2-map-1b-markers, p2-search-1a-utilities, p2-search-1b-components

## Objective

Install Leaflet dependencies and create the base EcosystemMap component shell.

## Tasks

### T1: Install dependencies
- **Packages:** `leaflet`, `react-leaflet`, `@types/leaflet`
- Run: `npm install leaflet react-leaflet && npm install -D @types/leaflet`

### T2: EcosystemMap shell component
- **File:** `src/components/map/EcosystemMap.tsx`
- **Create** client component with dynamic import (`next/dynamic`, `ssr: false`)
- Center on RGV: lat ~26.2, lng ~-97.7, zoom level 9
- OpenStreetMap tile layer
- Import Leaflet CSS within component (avoid SSR issues)
- Accept `actors: Actor[]` prop for markers (rendered in next subphase)

## Files

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `package.json` | Yes (this batch only) |
| Create | `src/components/map/EcosystemMap.tsx` | Yes |

## Acceptance Criteria

- [ ] `npm install` succeeds with new dependencies
- [ ] EcosystemMap renders a map centered on RGV
- [ ] Map does not break SSR (dynamic import with `ssr: false`)
- [ ] OpenStreetMap tiles load correctly
- [ ] Component accepts actors prop (markers come in 1b)

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
