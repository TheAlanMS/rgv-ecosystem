# RGV Ecosystem Repository Update PRD

## Codex Execution Purpose

Use this document as the source of truth for planning and implementing updates to the `rgv-ecosystem` repository.

Target repository:

```text
https://github.com/TheAlanMS/rgv-ecosystem
```

Visual reference:

```text
https://startupgenome.com/ecosystems
```

This specification translates QA notes into a structured, implementation-ready PRD for Codex or Claude Code.

---

## 1. Purpose

Update the RGV ecosystem repository based on QA notes so the application better reflects the intended actor database, pillar taxonomy, navigation requirements, visual direction, and future data model.

The repository should treat the QA notes in this document as the source of truth for this update pass.

---

## 2. Goals

- Add missing ecosystem actors from the QA notes.
- Remove or relocate incorrectly placed actors.
- Improve actor-to-pillar accuracy by cross-referencing each actor with its website or public-facing description.
- Update visual styling direction, especially the color palette.
- Ensure every actor page supports a URL field.
- Prepare the data model for future thumbnails and contact information.
- Add a persistent Home button accessible from any page.
- Create an implementation path that Codex or Claude Code can execute in a few focused prompts.

---

## 3. Non-Goals

- Do not fully redesign the application architecture unless required by the existing implementation.
- Do not invent actor facts, URLs, contacts, or pillar placements without verification.
- Do not remove actor names unless explicitly listed for removal.
- Do not implement V5 or V6 contact-data features beyond preparing the schema and placeholders.
- Do not treat visual reference sites as content sources for the RGV ecosystem.
- Do not copy proprietary styles, assets, code, or content from Startup Genome.

---

## 4. Visual Design Update

### Requirement

Update the color palette because the current palette is not acceptable.

### Direction

Use `startupgenome.com/ecosystems` as the visual reference for a more credible ecosystem-mapping aesthetic.

### High-Level Style Targets

- Cleaner, more modern ecosystem-map feel.
- More polished and credible color system.
- Better contrast and readability.
- Reduced visual clutter.
- Palette should support:
  - Pillar distinction
  - Actor cards
  - Maps or geographic views
  - List views
  - Profile/detail pages
  - Calls to action

### Implementation Guidance

- Audit current theme tokens, Tailwind config, CSS variables, or equivalent styling system.
- Replace the current palette with a more refined ecosystem-oriented palette.
- Keep the app consistent across home, pillar pages, actor pages, list views, and map views.
- Do not directly copy proprietary styles or assets from the reference site.

---

## 5. Navigation Requirement

### Requirement

A Home button must be accessible from any page within the project.

### Acceptance Criteria

- Every route/page includes a clear way to return home.
- The Home button should be visible or available in the global navigation.
- The Home button should work consistently across:
  - Actor detail pages
  - Pillar pages
  - Map views
  - List views
  - Search or filter pages
  - Any future detail pages

### Implementation Guidance

- Prefer a shared layout or global navigation component.
- Avoid adding separate one-off Home buttons to every individual page if a shared layout exists.

---

## 6. Actor Data Model Requirements

### Current Update Requirements

Every actor should support the following fields:

```text
name
pillarAssignments
url
thumbnail
notes
status
```

### Field Definitions

- `name`: Actor name exactly as provided.
- `pillarAssignments`: One or more assigned ecosystem pillars.
- `url`: Public website or official page.
- `thumbnail`: Optional image, logo, or placeholder.
- `notes`: Internal implementation notes, including whether placement needs verification.
- `status`: Suggested values:
  - `active`
  - `needs_url`
  - `needs_pillar_review`
  - `needs_thumbnail`
  - `future_contact_data_needed`
  - `needs_removal_review`

### Placeholder Rules

Use placeholders where information is missing:

```text
[FILL: actor URL]
[FILL: target pillar]
[FILL: thumbnail source]
[FILL: verification notes]
```

---

## 7. Future Data Model Planning

### V5 Contact Data Fields

Prepare the actor model so future versions can support contact information.

Recommended V5 fields:

```text
primaryContactName
primaryContactTitle
primaryContactEmail
primaryContactPhone
organizationAddress
city
region
state
country
contactSourceUrl
lastVerifiedDate
```

### V6 Enhanced Actor Intelligence Fields

Recommended V6 fields:

```text
relationshipOwner
ecosystemRole
servicesOffered
audienceServed
eligibilityRequirements
programsOffered
eventsHosted
fundingAvailable
partnershipOpportunities
dataConfidenceScore
verificationStatus
```

### Implementation Guidance

- Do not require these fields in the current UI unless already supported.
- Add schema placeholders only if low-risk.
- Avoid blocking actor creation because future contact data is missing.

---

## 8. Actor Website Cross-Reference Requirement

### Requirement

Each actor should be cross-referenced with its official website or reliable public page to determine accurate pillar placement.

### Process

For each actor:

1. Locate official website or public page.
2. Identify what the actor does.
3. Determine the most appropriate pillar or pillars.
4. Add URL to actor profile.
5. Add thumbnail if readily available.
6. Mark uncertain placements with `needs_pillar_review`.

### Do Not Infer Beyond Evidence

If the website or public page does not clearly support a pillar assignment, use:

```text
pillarAssignments: ["[FILL: target pillar]"]
status: "needs_pillar_review"
notes: "[FILL: verification notes]"
```

---

## 9. Actor Additions

Add the following actors to the repository. Preserve actor names exactly.

Each actor should be added with:

```text
name: "[actor name]"
pillarAssignments: ["[FILL: target pillar]"]
url: "[FILL: actor URL]"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "Added from QA notes. Cross-reference website to confirm pillar placement."
```

### Actors to Add

- eBridge Center for Business & Commercialization
- Brownsville Community Improvement Corporation
- Greater Brownsville Incentives Corporation
- UTRGV Center for Innovation & Commercialization
- Brownsville Chamber
- COSTEP
- 1 Million Cups Brownsville
- Leadership Brownsville
- RGV Startup Week
- StartUp Texas
- City of Brownsville, TX - Municipal Government
- Port of Brownsville, TX
- Mitte Cultural District
- RGV LEAD - Rio Grande Valley Linking Economic and Academic Development
- RGV FOCUS
- South Texas Manufacturing Association
- Region One Education Service Center
- Region One Gear Up
- BISD
- Rio Grande Guardian
- TSC
- TSC Performing Arts Center
- Cameron County Education Initiative CCEI
- ITEC
- CEO Brownsville
- Cameron County Regional Mobility
- Index Reynosa
- Index Matamoros
- Index Nuevo Laredo
- Index Nuevo Leon
- ProMexico Industry
- Asociacion de Maquiladoras de Matamoros
- CODEMatamoros
- South Texas Manufacturers Association
- Cobifer
- Rio Grande Valley Partnership
- Rio South Texas Economic Council
- Rio-South Texas Education & Community Develop
- Collaborative Action Board
- TSTC Harlingen
- Business Development Fund
- Texas Border Business
- RGV Builders Association
- Brownsville SpaceX
- Brownsville Public Utilities Board
- Brownsville Parks & Recreation Department
- Brownsville Historical Association
- Brownsville Museum of Fine Art
- Gladys Porter Zoo
- Brownsville Wellness Coalition
- Brownsville Farmers Market
- Historic Brownsville Museum
- Holiday Village
- Brownsville Living
- Ride for Rotary
- The Rotary Club of Historic Brownsville
- Rio Grande Valley Partnership
- Brownsville Careers & Technical Training
- Keep Brownsville Beautiful
- BTX Downtown First Friday
- Grants and Community Development Department
- Brownsville South Padre Island Airport
- Visit Brownsville TX
- Caracara Trail
- West Rail Trail
- Belden Trail
- ROCA at Brownsville Performing Arts Academy/George Ramírez PAA
- CycloBia Brownsville
- Brownsville Society of Performing Arts
- Youth Build
- CDCB
- Buho
- Mr Amigo Association
- Crossroads Festival
- AIA Lower Rio Grande Architects
- Brownsville Community Foundation
- Expanding Frontiers
- Dean Porter Park Renovation Inc
- Hike & Bike Trails
- Old City Cemetary Center
- South Texas Ecotourism
- The Challenge RGV
- Revitalize Downtown Brownsville
- Via Americas Front Door Reimagined
- Zonta Club
- Cameron County
- Conoce Matamoros
- Museo MACT
- South Texas College
- City of San Antonio
- City of Austin
- Business Development Fund of Texas
- The Texas Bucket List
- UTRGV Rusteburg Art Gallery
- SPI Life
- Valley Alliance of Mentors for Opp & Scholarship
- VIDA Valley Initiative

---

## 10. Duplicate or Similar Actor Names

### Potential Duplicate Review Needed

The QA notes include similar or repeated actor names. Do not automatically delete any of them without verification.

Potential duplicate or near-duplicate records:

- Rio Grande Valley Partnership
- Rio Grande Valley Partnership
- South Texas Manufacturing Association
- South Texas Manufacturers Association
- Business Development Fund
- Business Development Fund of Texas

### Chosen Resolution

Preserve all names exactly as provided during the first implementation pass.

Add an internal note:

```text
notes: "Potential duplicate or naming variant. Verify before deduplication."
status: "needs_pillar_review"
```

### Post-Audit Resolution

The implemented QA closeout supersedes the first-pass duplicate-preservation
instruction for user-confirmed canonical cleanup only. The current seed data
keeps canonical records where later QA direction clarified the desired name:

- `RGV Partnership` replaces `Rio Grande Valley Partnership`.
- `Business Development Fund of Texas` replaces `Business Development Fund`.

This is not a general deduplication policy. Other unresolved naming variants
remain review items and should not be merged without verification.

---

## 11. Pillar-Specific Changes

## Pillar 1

### Required Change

CBP/Border Ops should not be in Pillar 1.

### Removal Guidance

- Remove `CBP/Border Ops` from Pillar 1.
- Also evaluate whether `CBP/Border Ops` should exist in the repository at all.
- If removal from the entire repository is not safe in the first pass, mark it as:

```text
status: "needs_removal_review"
notes: "QA notes state CBP/Border Ops should not be in Pillar 1 or possibly not included at all."
```

### Acceptance Criteria

- `CBP/Border Ops` is no longer displayed under Pillar 1.
- If retained elsewhere, it must be clearly marked for review.

---

## Pillar 2: Talent Pool

### Required Change

Include Trade Schools.

### Rationale

The QA notes state that infrastructure is not great, but the talent pool is significant.

### Actor or Category Additions

Add or support:

- Trade Schools

### Implementation Guidance

If `Trade Schools` is a category rather than a single actor, represent it consistently with the repository’s existing taxonomy.

Suggested placeholder record:

```text
name: "Trade Schools"
pillarAssignments: ["Pillar 2"]
url: "[FILL: actor URL]"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "QA notes specify inclusion in Pillar 2 because the talent pool is large."
```

---

## Pillar 4

### Required Additions

Add the following to Pillar 4:

- Hidalgo County School Districts
- Jubilee Schools
- Alpha School
- South Texas ISD

### Implementation Guidance

Each actor should include:

```text
pillarAssignments: ["Pillar 4"]
url: "[FILL: actor URL]"
thumbnail: "[FILL: thumbnail source]"
status: "needs_url"
notes: "Added to Pillar 4 from QA notes."
```

---

## Pillar 6

### Required Removals

Remove the following from Pillar 6:

- 1909 Community
- Valley Young Professionals

### Required Additions

Add the following to Pillar 6:

- RGV Partnership
- Fem City
- Chamber of Commerce for Hidalgo County
- RGV Tech Club
- 1 Million Cups Brownsville
- 1 Million Cups McAllen
- 1 Million Cups Alton

### Known URLs

- Fem City Brownsville: `https://femcity.com/brownsville-tx`
- Fem City McAllen: `https://femcity.com/mcallen-tx`

### Implementation Guidance

For `Fem City`, determine whether to model as:

1. One actor with multiple location URLs.
2. Separate actors for Brownsville and McAllen.

Chosen first-pass resolution:

```text
name: "Fem City"
pillarAssignments: ["Pillar 6"]
url: "https://femcity.com/brownsville-tx"
additionalUrls: ["https://femcity.com/mcallen-tx"]
status: "needs_pillar_review"
notes: "QA notes reference both Brownsville and McAllen pages."
```

If the current data model does not support `additionalUrls`, use notes until schema support is added.

---

## Pillar 7

### Required Removal

Remove the following from Pillar 7:

- 1909

### Required Additions

Add the following to Pillar 7:

- EBridge Business Academy
- UTRGV Center for Innovation and Commercialization (CIC)
- Pharr Global Business Hub

### Implementation Guidance

Use exact names as provided in this pillar section.

Potential naming conflict:

- Actor additions list includes `UTRGV Center for Innovation & Commercialization`
- Pillar 7 notes include `UTRGV Center for Innovation and Commercialization (CIC)`

Chosen first-pass resolution:

Preserve both references in notes, but create one canonical actor only after verification.

Suggested first-pass actor:

```text
name: "UTRGV Center for Innovation and Commercialization (CIC)"
pillarAssignments: ["Pillar 7"]
url: "[FILL: actor URL]"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "QA notes also reference UTRGV Center for Innovation & Commercialization. Verify canonical naming before deduplication."
```

---

## Pillar 8

### Required Additions

Add the following to Pillar 8:

- Texas Congressional Offices
- Texas Venture Alliance / Texas Venture Fest

### Implementation Guidance

For `Texas Venture Alliance / Texas Venture Fest`, preserve the provided name unless the repository requires separate actors.

Suggested first-pass actor:

```text
name: "Texas Venture Alliance / Texas Venture Fest"
pillarAssignments: ["Pillar 8"]
url: "[FILL: actor URL]"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "Verify whether this should be one combined actor or two separate actors."
```

---

## Pillar 9

### Required Additions or References

Add or cross-reference the following Pillar 9 sources:

- `https://riosouthtexasregion.com/`
- `https://autocluster.riosouthtexasregion.com/public-dashboard`
- `https://stma-tx.org/council-for-south-texas-economic-progress-costep/`
- COSTEP

### Implementation Guidance

Create or update actors associated with these URLs.

Suggested placeholder records:

```text
name: "Rio South Texas Economic Council"
pillarAssignments: ["Pillar 9"]
url: "https://riosouthtexasregion.com/"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "Added from Pillar 9 QA notes."
```

```text
name: "Auto Cluster Rio South Texas"
pillarAssignments: ["Pillar 9"]
url: "https://autocluster.riosouthtexasregion.com/public-dashboard"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "Added from Pillar 9 QA notes. Verify canonical actor name."
```

```text
name: "COSTEP"
pillarAssignments: ["Pillar 9"]
url: "https://stma-tx.org/council-for-south-texas-economic-progress-costep/"
thumbnail: "[FILL: thumbnail source]"
status: "needs_pillar_review"
notes: "Added from Pillar 9 QA notes."
```

---

## 12. Actor Profile Page Requirements

### Current-Version Requirements

Every actor detail page should display:

- Actor name
- Assigned pillar or pillars
- URL
- Thumbnail or placeholder thumbnail
- Notes or description, if available
- Clear navigation back to home
- Clear navigation back to pillar or list view, if supported

### Empty-State Handling

If URL is missing:

```text
URL: [FILL: actor URL]
```

If thumbnail is missing:

```text
thumbnail: [FILL: thumbnail source]
```

If pillar placement is uncertain:

```text
status: needs_pillar_review
```

---

## 13. Acceptance Criteria

### Data Acceptance Criteria

- All actors from the QA notes are represented in the data layer.
- Explicit pillar removals are completed.
- Pillar-specific additions are represented.
- All actors have a URL field, even if placeholder.
- All actors have thumbnail support, even if placeholder.
- Potential duplicates are flagged, not silently removed.
- Unverified pillar placements are marked clearly.

### UI Acceptance Criteria

- Home button is accessible from every page.
- Updated color palette is applied consistently.
- Actor pages can display URL and thumbnail fields.
- Pillar pages reflect additions and removals.
- The UI remains usable on desktop, tablet, and mobile.

### Implementation Acceptance Criteria

- Missing data is represented with placeholders rather than invented facts.
- Actor names and pillar references are preserved exactly as provided.
- Codex should produce a plan before making changes.
- Codex should summarize changed files after implementation.
- Codex should report remaining placeholders and unresolved verification items.

---

## 14. Recommended Codex Implementation Plan

### Prompt 1: Audit Current Repository Structure

Codex should:

- Inspect data model for actors and pillars.
- Identify where actor data is stored.
- Identify route structure for home, pillar pages, actor pages, map views, and list views.
- Identify styling system.
- Identify global layout or navigation components.
- Produce a brief implementation plan before editing.

### Prompt 2: Update Actor Data and Pillar Mapping

Codex should:

- Add all actors from the QA notes.
- Add placeholders for missing URLs and thumbnails.
- Apply known pillar additions and removals.
- Mark uncertain placements with `needs_pillar_review`.
- Preserve potential duplicates with review notes.
- Ensure each actor has a URL field.

### Prompt 3: Update UI Requirements

Codex should:

- Add Home button to shared layout or global navigation.
- Update actor detail pages to show URL and thumbnail.
- Ensure missing URL and thumbnail fields render gracefully.
- Ensure pillar pages reflect updated data.
- Confirm mobile and desktop usability.

### Prompt 4: Update Visual Palette

Codex should:

- Audit current color palette.
- Replace weak or inconsistent palette with a cleaner ecosystem-map-inspired palette.
- Apply updated colors across cards, navigation, backgrounds, buttons, links, maps, and pillar tags.
- Preserve readability and contrast.
- Avoid copying assets or proprietary visual elements from the reference site.

### Prompt 5: Validation Pass

Codex should:

- Run available tests, linting, and build commands.
- Manually verify key routes.
- Confirm Home button appears across pages.
- Confirm actor URLs and thumbnails render.
- Confirm pillar additions and removals.
- Create a short summary of changed files and remaining placeholders.

---

## 15. Known Open Items

Use these placeholders until verified:

```text
[FILL: actor URL]
[FILL: target pillar]
[FILL: thumbnail source]
[FILL: contact person]
[FILL: contact email]
[FILL: contact phone]
[FILL: organization address]
[FILL: verification notes]
```

---

## 16. Conflict Resolution Notes

### Duplicate Names

Some names appear more than once or appear as close variants. Do not delete them automatically. Preserve them and flag for review.

### Pillar Placement Uncertainty

Where pillar placement is not explicitly stated, do not guess. Add the actor with `[FILL: target pillar]` and mark as `needs_pillar_review`.

### URL Gaps

Every actor needs a URL field. If the URL is unknown, use `[FILL: actor URL]`.

### Future Contact Info

Contact fields should be planned for V5 and V6, but they should not block the current update.

---

## 17. Codex Guardrails

Before editing, Codex should:

- Read this PRD fully.
- Inspect the existing repo structure.
- Identify the minimal files needed for the update.
- Create a plan.
- Avoid broad rewrites.
- Avoid inventing facts.
- Preserve actor names exactly as written.
- Prefer placeholders over assumptions.
- Run available validation commands before finishing.

At completion, Codex should provide:

- Files changed.
- Summary of actor and pillar updates.
- Summary of UI updates.
- Summary of palette updates.
- Tests or checks run.
- Remaining placeholders.
- Remaining manual verification tasks.
