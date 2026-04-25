# p4-submissions-1a-enhanced-form

> **Phase:** 4 — Community Features
> **Group:** Submissions
> **Status:** ⬜ Not Started
> **Dependencies:** Phase 3 submission API and SubmitForm complete

## Objective

Enhance the submission form for V1 community stewardship without adding account ownership.

## Scope

- Multi-step wizard: org info -> contact -> pillar selection -> description
- Dedicated flows for new listing, correction, and gap flag
- Prominent privacy language for submitter email
- Submitter confirmation state that explains human review
- Field-level validation errors
- No file upload in MVP unless a reviewer workflow for uploaded proof is explicitly approved

## Acceptance Criteria

- [ ] Form covers all PRD-required new listing fields.
- [ ] Correction flow can be launched from an actor profile with actor context prefilled.
- [ ] Gap flag flow can be launched from map, pillar, or health contexts with pillar/county context when available.
- [ ] Field-level validation is clear and keyboard accessible.
- [ ] Form does not require login.
- [ ] Form does not publish directly.
- [ ] Submitter email privacy is explicit.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `src/components/forms/SubmitForm.tsx` |
| Modify | `src/app/submit/page.tsx` |
| Create | `src/components/forms/MultiStepForm.tsx` |
| Create | `src/components/forms/PillarSelector.tsx` |

## Detailed task breakdown to be completed at phase start.
