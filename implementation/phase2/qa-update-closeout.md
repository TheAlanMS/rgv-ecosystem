# QA Update PRD Closeout

Date: 2026-04-26
Source PRD: `rgv-ecosystem-qa-update-prd.md`

## PRD Reconciliation

| Area | Result | Evidence |
|------|--------|----------|
| QA actor representation | Pass with explicit placeholders | `src/lib/data/actors/qa-update-actors.ts` exports 109 QA update actors. |
| Pillar removals | Pass | Data tests assert `CBP / Border Operations`, `1909 Community`, and `Valley Young Professionals` are absent from the actor set. |
| Pillar additions | Pass with placeholders | Pillar 2, 4, 6, 7, 8, and 9 QA additions are represented in `qa-update-actors.ts`. |
| URL field support | Pass with unresolved URL gaps | Actor schema and profile UI support `websiteUrl`; missing URLs remain `[FILL: actor URL]`. |
| Thumbnail support | Pass with unresolved thumbnail gaps | Actor schema, cards, and profiles support `thumbnailUrl`; missing thumbnails render initials and keep `[FILL: thumbnail source]`. |
| Actor review status | Pass | `qaStatus`, `internalNotes`, `publicVisibility`, and future contact fields are included in the actor model. |
| Global Home navigation | Pass | `SiteHeader` is mounted from `src/app/layout.tsx` and includes `Home`, covering actor, pillar, map, search, submit, and ecosystem-health routes. |
| Palette accessibility | Pass after token refresh | `src/app/globals.css` now uses a light ecosystem-data palette with high-contrast text, blue primary actions, muted categorical tags, and accessible gap colors. |

## Duplicate Policy Decision

The original PRD first-pass instruction was to preserve potential duplicates until verification. The implemented closeout accepts a later canonical cleanup for records that now have user-confirmed preferred names:

- `RGV Partnership` is retained; `Rio Grande Valley Partnership` is not retained.
- `Business Development Fund of Texas` is retained; `Business Development Fund` is not retained.

This is a narrow product decision, not a blanket deduplication rule. Remaining name variants should still be treated as verification items before any future merge.

## Placeholder Summary

Runtime audit of `QA_UPDATE_ACTORS`:

| Placeholder / status | Count |
|----------------------|-------|
| Total QA update actors | 109 |
| `[FILL: actor URL]` | 21 |
| `[FILL: target pillar]` | 89 |
| `[FILL: thumbnail source]` | 109 |
| `[FILL: verification notes]` | 109 |
| `needs_url` | 13 |
| `needs_pillar_review` | 89 |
| `needs_thumbnail` | 7 |

These placeholders are intentional because the PRD forbids inventing actor facts, URLs, thumbnails, or pillar placements without verification.

## Route/UI Review

Actor profiles display the required current-version fields:

- name, org type, city, county, and status
- assigned pillars or `[FILL: target pillar]`
- website URL or `[FILL: actor URL]`
- thumbnail image or initials placeholder
- QA status and internal review notes
- system metadata

Global navigation is shared through `SiteHeader`, so `Home` remains available from:

- `/actors/[slug]`
- `/pillars`
- `/pillars/[slug]`
- `/map`
- `/search`
- `/submit`
- `/ecosystem-health`

## Validation Results

Completed after final cleanup:

- `cmd /c npm.cmd run lint` - passed with 4 warnings in generated Convex files only.
- `cmd /c npx.cmd tsc --noEmit` - passed.
- `cmd /c npm.cmd test` - passed, 17 files / 66 tests.
- `cmd /c npm.cmd run build` - passed, 91 static pages generated.
- `BASE_URL=http://localhost:3000 cmd /c npm.cmd run test:visual` - passed, 87 tests against a production `next start` server.

## Self-Critique

- The data layer intentionally represents many QA actors with placeholders. That is correct for the PRD's "do not invent facts" rule, but it means this pass is not a completed actor-research pass.
- The duplicate policy is now explicit, but it is narrower than the original first-pass PRD wording. Future cleanup should not merge additional variants without source-backed verification.
- The palette update is token-based and intentionally conservative. It improves contrast without a broad component rewrite; the successful Playwright screenshot pass should still be reviewed by a human for final color judgment.

## Deferred Verification Items

- Replace placeholder URLs after official pages are confirmed.
- Replace placeholder thumbnails after logo/image source rights are confirmed.
- Resolve `[FILL: target pillar]` records through website-backed pillar review.
- Replace generic `[FILL: verification notes]` with actor-specific source notes.
- Revisit remaining near-duplicate names only after source verification.

## Status

Passed.

## Resolution

The visual QA run was previously blocked by Clerk middleware returning 500s on public routes. The proxy was updated so public routes such as `/`, `/map`, `/search`, `/journeys/*`, and `/ecosystem-health` remain publicly accessible while admin routes remain protected.

## Evidence

- `curl -I http://localhost:3000` returns `200 OK`
- `curl -I http://localhost:3000/map` returns `200 OK`
- `BASE_URL=http://localhost:3000 npm run test:visual` completed successfully
- Screenshots generated in `implementation/phase2/audits/screenshots/`
