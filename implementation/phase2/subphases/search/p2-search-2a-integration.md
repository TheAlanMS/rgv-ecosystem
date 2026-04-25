# p2-search-2a-integration

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Search (M2)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-search-1a-utilities, p2-search-1b-components

## Objective

Create the /search page, add search to the site header, and wire search with filters.

## Tasks

### T1: Search page
- **File:** `src/app/search/page.tsx`
- **Create** search results page
  - SearchInput at top
  - SearchResults below
  - FilterBar integration (search narrows within active filters)
  - URL persistence: `/search?q=...`

### T2: Header search
- **File:** `src/components/layout/SiteHeader.tsx` (modify)
  - Add compact SearchInput to navigation bar
  - On submit/enter, navigate to `/search?q=...`

### T3: Search + filter interop
- Search narrows within active filters, or vice versa
- Combined URL: `/search?q=tech&county=Cameron`

## Files

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/app/search/page.tsx` | Yes |
| Modify | `src/components/layout/SiteHeader.tsx` | Yes |

## Acceptance Criteria

- [ ] Typing in header search navigates to `/search?q=...`
- [ ] Results grouped: Actors first, then Pillars
- [ ] Empty query shows prompt text, not empty results
- [ ] Search query persists in URL (shareable)
- [ ] Results use existing ActorCard and PillarCard components
- [ ] Search combines with filters if both active

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
