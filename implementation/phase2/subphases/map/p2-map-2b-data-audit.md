# p2-map-2b-data-audit

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Map (M3)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-map-1a-dependencies
> **Parallel with:** p2-map-2a-clustering

## Objective

Audit all actors for missing lat/lng coordinates and populate them.

## Audit Finding To Resolve

The 2026-04-24 audit found 58 actor records and 0 `coordinates` fields. It also found no current actor records counted in Starr or Willacy County. This subphase must solve both map readiness and geographic honesty:

- Add city-level coordinates for actors.
- Document when city-center coordinates are used instead of exact addresses.
- Add or verify explicit gap records for underserved Starr and Willacy contexts where active actors are absent.
- Do not hide missing coverage by omitting counties from filters, map views, or health metrics.

## Tasks

### T1: Audit actor coordinates
- Review all ~50 actors across 10 pillar files
- Identify actors missing `coordinates` field
- Research correct lat/lng for each actor's city/address
- Record whether each coordinate is exact, city-center, or outside-region representative.

### T2: Populate missing coordinates
- **Files:** `src/lib/data/actors/pillar-*.ts` (all 10 files as needed)
- Add `coordinates: { lat: number, lng: number }` to every actor
- Use city center coordinates as fallback if exact address unknown

### T3: Geography honesty check
- Confirm actor and gap data surface Cameron, Hidalgo, Starr, Willacy, and OutsideRGV.
- If Starr or Willacy have no active actors in a pillar, ensure that the gap registry and product surfaces make that absence visible.
- Add tests or documented checks proving underserved counties are represented intentionally.

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/lib/data/actors/pillar-01-innovation-customers.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-02-talent-pool.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-03-capital-providers.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-04-education-pipelines.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-05-professional-services.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-06-communities-peer-groups.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-07-incubators-accelerators.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-08-advocacy-policy.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-09-shared-platform.ts` | Yes |
| Modify | `src/lib/data/actors/pillar-10-governance-accountability.ts` | Yes |

## Acceptance Criteria

- [ ] 100% of actors have coordinates
- [ ] RGV actor coordinates are within RGV bounding box (approx 25.8-26.8 lat, -98.8--97.1 lng)
- [ ] OutsideRGV actors have coordinates for their home city or a documented representative location
- [ ] All actors still pass Zod schema validation
- [ ] No duplicate coordinates (unless actors share exact location)
- [ ] Starr and Willacy County absence/coverage is visible through gap records or health metrics
- [ ] Coordinate source type is documented in code comments or data metadata when not exact

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
