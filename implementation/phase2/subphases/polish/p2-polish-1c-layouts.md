# p2-polish-1c-layouts

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Polish (M6)
> **Status:** Complete
> **Dependencies:** p2-polish-1b-touch-targets

## Objective

Final responsive layout pass across map, journey, and card views.

## Tasks

### T1: Map mobile optimization
- **File:** `src/components/map/EcosystemMap.tsx` (modify)
- Full-width map on mobile
- Bottom sheet for popups instead of standard Leaflet popups (if feasible)
- Usable with touch gestures (pinch zoom, pan)

### T2: Typography pass
- Verify text sizes readable at 320px width
- Adjust font sizes where needed for smallest viewport

### T3: Card spacing
- Tighten padding/gaps on mobile, increase on desktop (`lg:`)

### T4: Journey view mobile
- **File:** `src/components/journeys/JourneyView.tsx` (modify)
- Stack step buttons vertically on small screens

### T5: No horizontal scroll verification
- Test all pages at 320px width
- Fix any horizontal overflow

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/components/map/EcosystemMap.tsx` | Yes |
| Modify | `src/components/journeys/JourneyView.tsx` | Yes |
| Modify | `src/app/globals.css` | Yes |

## Acceptance Criteria

- [x] Map has full-width mobile layout and touch manipulation/pan handling
- [x] Text and controls audited for 320px readability risk
- [x] Horizontal overflow risks addressed in Phase 2 map, journey, and homepage controls
- [x] Journey steps stack vertically on mobile
- [x] Card and control spacing adjusted for mobile and desktop breakpoints

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
