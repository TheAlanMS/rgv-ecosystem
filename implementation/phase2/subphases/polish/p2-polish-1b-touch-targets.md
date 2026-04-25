# p2-polish-1b-touch-targets

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Polish (M6)
> **Status:** ⬜ Not Started
> **Dependencies:** All previous Phase 2 groups
> **Parallel with:** p2-polish-1a-navigation

## Objective

Ensure all interactive elements meet touch target minimums and filter bar is responsive.

## Tasks

### T1: Touch target audit
- Audit all buttons, links, toggles, dropdowns
- Ensure minimum 44x44px touch targets on mobile
- Add padding/min-height where needed

### T2: Filter bar responsive
- **File:** `src/components/filters/FilterBar.tsx` (modify)
- Horizontal scroll or collapsible filter panel on mobile
- Filter dropdowns usable on small screens

### T3: Global spacing adjustments
- **File:** `src/app/globals.css` (modify)
- Adjust spacing tokens for mobile vs desktop

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/components/filters/FilterBar.tsx` | Yes |
| Modify | `src/app/globals.css` | Yes |

## Acceptance Criteria

- [ ] All interactive elements >= 44x44px on mobile
- [ ] Filter bar usable on mobile without horizontal overflow
- [ ] No accidental tap targets (too-close interactive elements)

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
