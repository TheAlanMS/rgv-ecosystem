# p2-polish-1a-navigation

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Polish (M6)
> **Status:** Complete
> **Dependencies:** All previous Phase 2 groups (filters, search, map, pillar, onboarding)
> **Parallel with:** p2-polish-1b-touch-targets

## Objective

Add mobile navigation and search overlay.

## Tasks

### T1: Mobile hamburger menu
- **File:** `src/components/layout/SiteHeader.tsx` (modify)
- Add hamburger menu icon at `sm:` breakpoint
- Slide-out or dropdown navigation panel
- Close on link click or outside tap
- Include all navigation links + search

### T2: Search input mobile
- **File:** `src/components/search/SearchInput.tsx` (modify)
- Full-width search overlay on mobile tap
- Search icon in header expands to full-width input
- Close button to dismiss

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/components/layout/SiteHeader.tsx` | Yes |
| Modify | `src/components/search/SearchInput.tsx` | Yes |

## Acceptance Criteria

- [x] Navigation collapses to hamburger at mobile breakpoint
- [x] Mobile menu opens/closes by button, outside tap, Escape, and link click
- [x] Search overlay works on mobile
- [x] All navigation links accessible in mobile view

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
