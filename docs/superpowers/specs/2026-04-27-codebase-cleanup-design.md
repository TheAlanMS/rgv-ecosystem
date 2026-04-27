# Codebase Cleanup & Maintenance Design

> **Date:** 2026-04-27
> **Approach:** Option B — Root Cleanup + Doc Consolidation
> **Scope:** Remove stale duplicates, consolidate overlapping docs, refresh stale scores, import actor URLs then delete the source file.

---

## 1. Root Cleanup

Two file operations with no ambiguity.

| File | Action | Rationale |
|---|---|---|
| `phase2-implementation.md` (root) | Delete | Stale April-23 snapshot showing Phase 2 at 0%. Canonical version lives at `implementation/phase2/phase2-implementation.md`. |
| `rgv-ecosystem-qa-update-prd.md` (root) | Move → `implementation/phase2/rgv-ecosystem-qa-update-prd.md` | Co-locates source PRD with its closeout doc (`qa-update-closeout.md`). Cross-reference in the closeout remains valid — same filename, same folder. |

---

## 2. Playwright Doc Consolidation

Three docs cover the same completed effort. Reduce to one.

| File | Action | Rationale |
|---|---|---|
| `implementation/phase2/playwright-visual-qa.md` | Keep (canonical) | Already covers why Playwright was added, how to run it, structure, and limitations. No merge needed. |
| `implementation/phase2/browser-mobile-visual-qa.md` | Delete | Its checklist scope is fully covered by `tests/visual/browser-mobile-visual-qa.spec.ts`. The spec filename preserves the lineage. |
| `docs/superpowers/plans/2026-04-26-playwright-visual-qa.md` | Delete | Implementation is done and committed. Completed plans are not kept as living docs. |

---

## 3. `9.9-remediation-roadmap.md` Score Refresh

Update score and progress narrative to reflect actual state. Do not change the 9.9 target criteria or MVP cut line — those remain accurate forward-looking constraints.

| Area | Old state in doc | Actual state |
|---|---|---|
| Overall score | 4.7 / 10 | Update to ~7.5 / 10 |
| Phase 2 | 0 / 20 subphases | 24/24 delivered, visual QA closed (2026-04-26) |
| Phase 3 | Not mentioned | 8/11 subphases — database and API complete, auth in progress |
| Clerk/Convex auth | Not mentioned | Foundation committed (`18c6d3e`) |

Score rationale for 7.5: the core navigable map and persistence layer are real and tested. Auth, moderation (Phase 4), analytics (Phase 5), and partner integrations (Phase 6) remain open.

---

## 4. `actors.md` URL Import + Delete

`actors.md` contains 30+ verified actor website URLs. The Convex `actors` table has a `websiteUrl` field with 21 `[FILL: actor URL]` placeholders.

**Step 1 — Import:**
Write a Convex mutation or update the existing import function to cross-reference actor names from `actors.md` against the `actors` table and populate `websiteUrl` where names match. Unmatched rows in `actors.md` are surfaced in a short report rather than silently skipped.

**Step 2 — Delete:**
Once the import is confirmed (via Convex dashboard query or a verification query), delete `actors.md`. Convex becomes the single source of truth for actor URLs.

**Scope boundary:** Import `websiteUrl` only. Do not touch pillar assignments, thumbnails, or other `[FILL:]` placeholders — those require manual verification and belong to a separate data quality pass.

---

## Out of Scope

- Phase 1 and Phase 2 subphase docs — kept in place as institutional memory for multi-agent execution (agents read these by known path conventions).
- Any code changes beyond the Convex import mutation.
- Pillar assignments, thumbnails, or other actor data quality items.
- Any changes to Phase 3–6 planning docs.
