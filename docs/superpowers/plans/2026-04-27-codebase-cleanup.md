# Codebase Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove stale duplicates, consolidate overlapping Playwright docs, refresh the 9.9 remediation score, and import actor website URLs from `actors.md` into Convex before deleting the source file.

**Architecture:** Pure maintenance pass — file deletions, a file move, one doc edit, one new Convex internalMutation, and one CLI invocation. No frontend changes. No schema changes. The actors table already has `websiteUrl: v.optional(v.string())`.

**Tech Stack:** Git (file operations), Convex (`internalMutation`, `npx convex run`), TypeScript.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Delete | `phase2-implementation.md` (repo root) | Stale Phase-2-not-started snapshot |
| Move | `rgv-ecosystem-qa-update-prd.md` → `implementation/phase2/rgv-ecosystem-qa-update-prd.md` | Co-locate PRD with its closeout doc |
| Delete | `implementation/phase2/browser-mobile-visual-qa.md` | Original runbook superseded by Playwright tests |
| Delete | `docs/superpowers/plans/2026-04-26-playwright-visual-qa.md` | Completed implementation plan |
| Modify | `implementation/9.9-remediation-roadmap.md` | Refresh score, backlog, and milestone statuses |
| Modify | `convex/importSeedData.ts` | Add `patchActorWebsiteUrls` internalMutation |
| Delete | `actors.md` (repo root) | Deleted after URL import is confirmed |

---

## Task 1: Root File Cleanup

**Files:**
- Delete: `phase2-implementation.md` (repo root)
- Move: `rgv-ecosystem-qa-update-prd.md` → `implementation/phase2/rgv-ecosystem-qa-update-prd.md`

- [ ] **Step 1: Delete the stale root implementation doc**

```bash
git rm phase2-implementation.md
```

Expected output: `rm 'phase2-implementation.md'`

- [ ] **Step 2: Move the QA PRD into phase2**

```bash
git mv rgv-ecosystem-qa-update-prd.md implementation/phase2/rgv-ecosystem-qa-update-prd.md
```

Expected output: no output (silent success)

- [ ] **Step 3: Verify the staging area**

```bash
git status
```

Expected:
```
Changes to be committed:
  deleted:    phase2-implementation.md
  renamed:    rgv-ecosystem-qa-update-prd.md -> implementation/phase2/rgv-ecosystem-qa-update-prd.md
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove stale root phase2 doc, co-locate QA PRD with closeout"
```

---

## Task 2: Playwright Doc Consolidation

**Files:**
- Delete: `implementation/phase2/browser-mobile-visual-qa.md`
- Delete: `docs/superpowers/plans/2026-04-26-playwright-visual-qa.md`
- Keep (no changes): `implementation/phase2/playwright-visual-qa.md`

- [ ] **Step 1: Delete the original QA runbook**

```bash
git rm implementation/phase2/browser-mobile-visual-qa.md
```

Expected output: `rm 'implementation/phase2/browser-mobile-visual-qa.md'`

- [ ] **Step 2: Delete the completed implementation plan**

```bash
git rm "docs/superpowers/plans/2026-04-26-playwright-visual-qa.md"
```

Expected output: `rm 'docs/superpowers/plans/2026-04-26-playwright-visual-qa.md'`

- [ ] **Step 3: Confirm the canonical doc is untouched**

```bash
git status implementation/phase2/playwright-visual-qa.md
```

Expected output: nothing (no changes staged or unstaged for that file)

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: consolidate Playwright QA docs — keep canonical playwright-visual-qa.md"
```

---

## Task 3: Refresh 9.9 Remediation Roadmap Score

**Files:**
- Modify: `implementation/9.9-remediation-roadmap.md`

Replace the **Current Score** section (lines 1–16) with the updated version below. Do not touch anything from `## 9.9 Target State` onward except the two tables described in Steps 3 and 4.

- [ ] **Step 1: Update the header and score**

Replace the top block of the file (through the end of the Rationale bullet list) with:

```markdown
# 9.9 Remediation Roadmap

> Last updated: 2026-04-27
> Purpose: Convert the implementation audit into execution-ready constraints, milestones, and success criteria.

## Current Score

Current implementation score: 7.5 / 10.

Rationale:

- Phase 1 static foundation is complete: Next.js, TypeScript, routes, typed domain models, static actor data, pillar pages, journey pages, ecosystem health, and governance pages.
- Phase 2 is complete: filters, ranked search, list/map/by-pillar views, role + intent onboarding (all 8 roles), responsive polish, Vitest suite (52 tests), Playwright browser/mobile QA, and visual QA closeout (2026-04-26).
- Phase 3 database and API layers are complete: Convex schema, data import, query migration, validation bridge, route handlers, submission API, and submit form (8/11 subphases). Clerk/Convex auth foundation is committed; auth guards and role guards remain in progress.
- Remaining work: Phase 3 auth (3 subphases), Phase 4 moderation + profiles + submissions, Phase 5 analytics + health dashboard, Phase 6 integrations. Community submission flow is not yet end-to-end.
- Data readiness gap: actor websiteUrl fields have 21 `[FILL: actor URL]` placeholders under active remediation; 89 actors still have `[FILL: target pillar]`; thumbnails are all placeholder.
```

- [ ] **Step 2: Update the Priority Remediation Backlog table**

Replace the existing `## Priority Remediation Backlog` table with:

```markdown
## Priority Remediation Backlog

| Priority | Gap | Status | Remediation | Success Criteria |
|---|---|:---:|---|---|
| P0 | No filter layer | **Done** | Phase 2 complete | `/map` and pillar pages filter by pillar, county, status, org type, stage; URL state; clear no-result states. |
| P0 | No search | **Done** | Phase 2 complete | Global ranked search, `/search` route, header entry, no-result CTA. |
| P0 | No geographic map | **Done** | Phase 2 complete | Leaflet map with city coordinates, clustering, county gap markers, list/map/pillar toggle. |
| P0 | No tests | **Done** | Phase 2 + Playwright | Vitest (52 tests, 90%+ coverage) + Playwright browser/mobile suite. |
| P0 | No functional submissions | **In Progress** | Phase 3 API done; auth guards remaining | Public submit/correct/gap flow + admin review must work end to end. |
| P1 | Role flow is static | **Done** | Phase 2 onboarding | All 8 roles have intent-based routes to filtered views. |
| P1 | Ecosystem health is hardcoded | **Open** | Phase 5 | Health page derives pillar strength, county coverage, gaps, freshness from Convex data. |
| P1 | Actor data validation incomplete | **Partially done** | Phase 3 schema + bridge | Schema enforced in Convex; URL/pillar/thumbnail placeholders remain (data quality pass ongoing). |
| P1 | Open-source workflow incomplete | **Open** | Post-MVP | License, contribution guide, data dictionary, moderation policy, deployment notes. |
| P2 | Later integrations premature | **Deferred** | Phase 6 post-MVP | Phase 6 starts only after MVP adoption and stakeholder validation. |
```

- [ ] **Step 3: Update the Milestones table**

Replace the existing `## Milestones` table with:

```markdown
## Milestones

| Milestone | Status | Exit Criteria |
|---|:---:|---|
| M1 Interaction Core | **Complete** | Filters, sorting, search, URL state, no-result states pass tests. |
| M2 Map Readiness | **Complete** | Coordinates, map/list toggle, markers, clustering, county context, gap visibility pass checks. |
| M3 Role + Intent Onboarding | **Complete** | Homepage routes all 8 roles and intents to relevant filtered views. |
| M4 Submission MVP | **In Progress** | Public submission/correction/gap flows and admin review flow work end to end. Auth guards blocking. |
| M5 Test and Data Quality Gate | **Partially complete** | Vitest + Playwright complete. CI integration and 100% actor coordinate/pillar coverage remain. |
| M6 Ecosystem Health V1 | **Not started** | Dashboard derives pillar strength, county coverage, gaps, and freshness from Convex data. |
| M7 Open Source Readiness | **Not started** | License, contribution guide, data dictionary, moderation policy, deployment notes, git workflow ready. |
```

- [ ] **Step 4: Verify the file looks correct**

Open `implementation/9.9-remediation-roadmap.md` and confirm:
- Score reads `7.5 / 10`
- Last updated reads `2026-04-27`
- Backlog table has a Status column
- Milestones table has a Status column
- `## 9.9 Target State`, `## MVP Cut Line`, `## Launch Readiness Gates`, and `## Operating Rules For Execution Agents` sections are unchanged

- [ ] **Step 5: Commit**

```bash
git add implementation/9.9-remediation-roadmap.md
git commit -m "docs: refresh 9.9 remediation score to 7.5 — Phase 2 complete, Phase 3 in progress"
```

---

## Task 4: Add `patchActorWebsiteUrls` Mutation to Convex

**Files:**
- Modify: `convex/importSeedData.ts` (append new export at the end)

- [ ] **Step 1: Read `convex/importSeedData.ts` to confirm current end of file**

The file currently ends at line 114 (`}`). Append the following block after line 114.

- [ ] **Step 2: Append the mutation**

Add to the end of `convex/importSeedData.ts`. The URL map is hardcoded to avoid Windows CLI JSON-escaping issues with `cmd /c npx.cmd convex run`.

```typescript
const ACTOR_URL_MAP: { name: string; url: string }[] = [
  { name: "eBridge Center for Business & Commercialization", url: "https://ebridgecenter.com/" },
  { name: "Brownsville Community Improvement Corporation", url: "https://brownsvillecic.com/" },
  { name: "Greater Brownsville Incentives Corporation", url: "https://greaterbrownsville.com/" },
  { name: "UTRGV Center for Innovation & Commercialization", url: "https://www.utrgv.edu/rcvcobe/center-for-innovation-and-commercialization/" },
  { name: "Brownsville Chamber", url: "https://brownsvillechamber.com/" },
  { name: "COSTEP", url: "https://riosouthtexasregion.com/" },
  { name: "1 Million Cups Brownsville", url: "https://www.1millioncups.com/s/account/0014W00002mtNjNQAU/brownsville-tx" },
  { name: "Leadership Brownsville", url: "https://brownsvillechamber.com/leadership-brownsville/" },
  { name: "RGV Startup Week", url: "https://www.rgvstartup.com/" },
  { name: "StartUp Texas", url: "https://www.rgvstartup.com/" },
  { name: "City of Brownsville, TX - Municipal Government", url: "https://www.brownsvilletx.gov/" },
  { name: "Port of Brownsville, TX", url: "https://www.portofbrownsville.com/" },
  { name: "Mitte Cultural District", url: "https://mitteculturaldistrict.org/" },
  { name: "RGV LEAD - Rio Grande Valley Linking Economic and Academic Development", url: "https://www.rgvlead.org/" },
  { name: "RGV FOCUS", url: "https://edtx.org/program/rgv-focus/" },
  { name: "South Texas Manufacturing Association", url: "https://stma-tx.org/" },
  { name: "Region One Education Service Center", url: "https://www.esc1.net/" },
  { name: "Region One Gear Up", url: "https://www.esc1.net/services/family/gear-up" },
  { name: "BISD", url: "https://www.bisd.us/" },
  { name: "Rio Grande Guardian", url: "https://riograndeguardian.com/" },
  { name: "TSC", url: "https://www.tsc.edu/" },
  { name: "TSC Performing Arts Center", url: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/texas-southmost-college-performing-arts-center/" },
  { name: "Cameron County Education Initiative CCEI", url: "https://www.myccei.org/" },
  { name: "ITEC", url: "https://www.tsc.edu/institutional-divisions/institutional-advancement/facility-rentals/itec-center/" },
  { name: "CEO Brownsville", url: "https://www.facebook.com/CEOBrownsville/" },
  { name: "Cameron County Regional Mobility", url: "https://ccrma.org/" },
  { name: "Index Reynosa", url: "https://indexreynosa.org.mx/" },
  { name: "Index Matamoros", url: "https://www.indexmatamoros.org.mx/" },
  { name: "Index Nuevo Laredo", url: "https://www.indexnld.org.mx/" },
  { name: "Index Nuevo Leon", url: "https://indexnuevoleon.org.mx/en/" },
  { name: "ProMexico Industry", url: "https://www.promexicoindustry.com/" },
  { name: "Asociacion de Maquiladoras de Matamoros", url: "https://www.indexmatamoros.org.mx/" },
  { name: "South Texas Manufacturers Association", url: "https://stma-tx.org/" },
  { name: "Rio Grande Valley Partnership", url: "https://rgvpartnership.com/" },
  { name: "Rio South Texas Economic Council", url: "https://riosouthtexasregion.com/" },
  { name: "Rio-South Texas Education & Community Develop", url: "https://rstef.org/" },
  { name: "Collaborative Action Board", url: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/collaborative-action-board" },
  { name: "TSTC Harlingen", url: "https://www.tstc.edu/campuses/harlingen/" },
  { name: "Business Development Fund", url: "https://www.bdfoftexas.com/" },
  { name: "Texas Border Business", url: "https://texasborderbusiness.com/" },
  { name: "RGV Builders Association", url: "https://rgvba.org/" },
  { name: "Brownsville SpaceX", url: "https://www.spacex.com/vehicles/starship" },
  { name: "Brownsville Public Utilities Board", url: "https://www.brownsville-pub.com/" },
  { name: "Brownsville Parks & Recreation Department", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Historical Association", url: "https://www.brownsvillehistory.org/" },
  { name: "Brownsville Museum of Fine Art", url: "https://bmfa.us/" },
  { name: "Gladys Porter Zoo", url: "https://gpz.org/" },
  { name: "Brownsville Wellness Coalition", url: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Brownsville Farmers Market", url: "https://www.brownsvillewellnesscoalition.com/" },
  { name: "Historic Brownsville Museum", url: "https://www.brownsvillehistory.org/historic-brownsville-museum.html" },
  { name: "Holiday Village", url: "https://holidayvillagebrownsville.com/" },
  { name: "Brownsville Living", url: "https://www.brownsvillelife.com/" },
  { name: "Ride for Rotary", url: "https://rotarybrownsvillehistoric.org/event/ride-for-rotary" },
  { name: "The Rotary Club of Historic Brownsville", url: "https://rotarybrownsvillehistoric.org/" },
  { name: "Brownsville Careers & Technical Training", url: "https://www.bisd.us/page/career-technical-education" },
  { name: "Keep Brownsville Beautiful", url: "https://www.facebook.com/KBB.BTX/" },
  { name: "BTX Downtown First Friday", url: "https://www.facebook.com/FirstFridayDTBrownsville/" },
  { name: "Grants and Community Development Department", url: "https://www.brownsvilletx.gov/375/Grants-and-Community-Development" },
  { name: "Brownsville South Padre Island Airport", url: "https://flybrownsville.com/" },
  { name: "Visit Brownsville TX", url: "https://visitbtx.com/" },
  { name: "Caracara Trail", url: "https://caracaratrails.org/" },
  { name: "West Rail Trail", url: "https://caracaratrails.org/trails/west-rail-trail-2/" },
  { name: "Belden Trail", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "ROCA at Brownsville Performing Arts Academy/George Ramírez PAA", url: "https://revivalofculturalarts.org/" },
  { name: "CycloBia Brownsville", url: "https://www.brownsvilletx.gov/308/Parks-Recreation" },
  { name: "Brownsville Society of Performing Arts", url: "https://brosoperformingarts.org/" },
  { name: "Youth Build", url: "https://cdcb.org/youthbuild/" },
  { name: "CDCB", url: "https://cdcb.org/" },
  { name: "Buho", url: "https://www.buhobtx.com/" },
  { name: "Mr Amigo Association", url: "https://www.mramigo.net/" },
  { name: "AIA Lower Rio Grande Architects", url: "https://lrgvaia.org/" },
  { name: "Brownsville Community Foundation", url: "https://www.rbvfoundation.org/" },
  { name: "Hike & Bike Trails", url: "https://caracaratrails.org/trails/" },
  { name: "Old City Cemetary Center", url: "https://www.brownsvillehistory.org/old-city-cemetery-center.html" },
  { name: "South Texas Ecotourism", url: "https://www.cameroncountytx.gov/south-texas-ecotourism-center/" },
  { name: "The Challenge RGV", url: "https://sph.uth.edu/research/centers/hispanic-health/tu-salud-si-cuenta/our-initiatives/the-challenge-rgv/" },
  { name: "Revitalize Downtown Brownsville", url: "https://brownsvillecic.com/community-projects/big-program/" },
  { name: "Zonta Club", url: "https://www.facebook.com/p/Zonta-Club-of-Brownsville-61568325620539/" },
  { name: "Cameron County", url: "https://www.cameroncountytx.gov/" },
  { name: "Conoce Matamoros", url: "https://www.conocematamoros.com.mx/" },
  { name: "South Texas College", url: "https://www.southtexascollege.edu/" },
  { name: "City of San Antonio", url: "https://www.sa.gov/" },
  { name: "City of Austin", url: "https://www.austintexas.gov/" },
  { name: "Business Development Fund of Texas", url: "https://www.bdfoftexas.com/" },
  { name: "The Texas Bucket List", url: "https://thetexasbucketlist.com/" },
  { name: "UTRGV Rusteburg Art Gallery", url: "https://www.utrgv.edu/cofa/schools-and-departments/school-of-art-and-design/galleries/index.htm" },
  { name: "SPI Life", url: "https://spilife.com/" },
  { name: "Valley Alliance of Mentors for Opp & Scholarship", url: "https://www.vamosscholars.org/" },
  { name: "VIDA Valley Initiative", url: "https://vidacareers.org/" },
];

export const patchActorWebsiteUrls = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const results: { patched: number; skipped: number; unmatched: string[] } = {
      patched: 0,
      skipped: 0,
      unmatched: [],
    };

    const allActors = await ctx.db.query("actors").take(500);
    const actorsByName = new Map(
      allActors.map((a) => [a.name.toLowerCase(), a]),
    );

    for (const { name, url } of ACTOR_URL_MAP) {
      const actor = actorsByName.get(name.toLowerCase());

      if (!actor) {
        results.unmatched.push(name);
        continue;
      }

      const currentUrl = actor.websiteUrl;
      if (currentUrl && !currentUrl.startsWith("[FILL:")) {
        results.skipped++;
        continue;
      }

      await ctx.db.patch(actor._id, { websiteUrl: url, updatedAt: now });
      results.patched++;
    }

    return results;
  },
});
```

- [ ] **Step 3: Typecheck**

```bash
cmd /c npx.cmd tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add convex/importSeedData.ts
git commit -m "feat: add patchActorWebsiteUrls internalMutation to Convex"
```

---

## Task 5: Run the URL Patch and Verify

**Files:** None modified — this is a runtime operation against the Convex deployment.

- [ ] **Step 1: Ensure the Convex dev server is running (or use production)**

```bash
cmd /c npx.cmd convex dev
```

Leave it running in a separate terminal, or use `npx convex run` pointing at the production deployment.

- [ ] **Step 2: Run the patch mutation**

The mutation takes no args — the URL map is embedded in the code.

```bash
cmd /c npx.cmd convex run importSeedData:patchActorWebsiteUrls
```

Expected output (counts will vary based on what already has URLs):
```json
{ "patched": 42, "skipped": 0, "unmatched": ["CODEMatamoros", ...] }
```

- [ ] **Step 3: Review the unmatched list**

Any names in `unmatched` mean no actor record with that exact name exists in Convex. Common causes:
- Name in `actors.md` uses a slightly different spelling than the actor record
- Actor was not imported (QA update actors with `[FILL: target pillar]` may not have been seeded yet)

For each unmatched name, check the Convex dashboard (Data → actors table) and search manually. If a close match exists, run the mutation again with only that corrected entry. If no match exists, the actor is not yet seeded — this is expected for the 109 QA update actors with placeholders.

- [ ] **Step 4: Spot-check three actors in the Convex dashboard**

Open the Convex dashboard → Data → actors table. Filter or search for:
- `Brownsville Chamber` — should show `websiteUrl: "https://brownsvillechamber.com/"`
- `Gladys Porter Zoo` — should show `websiteUrl: "https://gpz.org/"`
- `South Texas College` — should show `websiteUrl: "https://www.southtexascollege.edu/"`

If any of these show `undefined` or `[FILL: actor URL]`, the name did not match — cross-reference the actual actor name in the dashboard and add a targeted re-run.

---

## Task 6: Delete `actors.md`

**Files:**
- Delete: `actors.md` (repo root)

Run this task only after Task 5 Step 4 spot-checks pass.

- [ ] **Step 1: Delete the source file**

```bash
git rm actors.md
```

Expected output: `rm 'actors.md'`

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: delete actors.md — URLs imported to Convex websiteUrl fields"
```

---

## Self-Review Notes

**Skipped entries from `actors.md`** (not included in the URL map — no reliable official URL found):
- `CODEMatamoros` — needs manual verification
- `Cobifer` — needs manual verification
- `Crossroads Festival` — city references exist, no official site found
- `Expanding Frontiers` — nonprofit confirmed, no homepage found
- `Dean Porter Park Renovation Inc` — public-agenda references only
- `Via Americas Front Door Reimagined` — no clear RGV official URL
- `Museo MACT` — likely Museo de Arte Contemporáneo de Tamaulipas; no official URL surfaced

These 7 remain as `[FILL: actor URL]` in Convex and require manual lookup before a future data quality pass.
