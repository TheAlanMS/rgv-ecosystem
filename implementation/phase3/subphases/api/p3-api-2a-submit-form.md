# p3-api-2a-submit-form

> **Phase:** 3 - Backend & Persistence
> **Group:** API
> **Status:** Completed
> **Dependencies:** p3-api-1a-route-handlers, p3-api-1b-submission-api

## Objective

Wire the existing /submit page to the submission API with actual form fields and client-side validation.

## Scope

- Create SubmitForm component with fields required by the PRD for new listings, corrections, and gap flags
- New listing fields: org name, org type, pillars, city/county, description, what they offer, who they serve, website/contact, submitter name, submitter email
- Correction fields: actor, what is wrong, what the correct information should be, submitter name, submitter email
- Gap flag fields: missing actor type, county, pillar, why it matters, submitter name, submitter email
- Client-side Zod validation before API call
- Success/error state handling
- Wire into existing `/submit` page
- No file upload in MVP unless explicitly approved later

## Acceptance Criteria

- [x] `/submit` no longer says submission forms are coming later.
- [x] Users can choose new listing, correction, or gap flag.
- [x] Required fields match the PRD submission and correction workflows.
- [x] Client and server validation share schemas or equivalent field rules.
- [x] Success state confirms that submission is under review, not published.
- [x] Error state is actionable and does not lose user-entered data.
- [x] Submitter email is labeled as private and not published.

## Preliminary Files

| Action | Path |
|--------|------|
| Modify | `src/app/submit/page.tsx` |
| Create | `src/components/forms/SubmitForm.tsx` |
| Create | `src/components/forms/FormField.tsx` |

## Detailed task breakdown to be completed at phase start.
