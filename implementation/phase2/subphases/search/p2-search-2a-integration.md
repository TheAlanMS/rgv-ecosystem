# p2-search-2a-integration

> **Phase:** 2 - Interactive Features & Polish
> **Group:** Search (M2)
> **Status:** Complete
> **Dependencies:** p2-search-1a-utilities, p2-search-1b-components

## Objective

Create the `/search` page, add search to the site header, and wire search with filters.

## Tasks

### T1: Search page
- **File:** `src/app/search/page.tsx`
- **Created** search results page:
  - SearchInput at top.
  - SearchResults below.
  - FilterBar integration.
  - URL persistence with `/search?q=...`.

### T2: Header search
- **File:** `src/components/layout/SiteHeader.tsx`
- **Modified** header navigation:
  - Added compact search input.
  - Added Search nav item.
  - Submit/Enter routes to `/search?q=...`.

### T3: Search + filter interop
- **File:** `src/hooks/useFilters.ts`
- **Modified** filter URL updates to preserve unrelated params, including `q`.
- Combined URLs such as `/search?q=tech&county=Cameron` remain stable while filters change.

## Files

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/app/search/page.tsx` | Yes |
| Modify | `src/components/layout/SiteHeader.tsx` | Yes |
| Modify | `src/hooks/useFilters.ts` | Shared |

## Acceptance Criteria

- [x] Typing in header search navigates to `/search?q=...`
- [x] Results grouped: Actors first, then Pillars
- [x] Empty query shows prompt text, not empty results
- [x] Search query persists in URL (shareable)
- [x] Results use existing ActorCard and PillarCard components
- [x] Search combines with filters if both active

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Passed on 2026-04-25 using `cmd /c npx tsc --noEmit`, `cmd /c npm run lint`, and `cmd /c npm run build`.
