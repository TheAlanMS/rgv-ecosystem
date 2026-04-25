# p2-onboarding-1b-components

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Onboarding (M5)
> **Status:** ⬜ Not Started
> **Dependencies:** None
> **Parallel with:** p2-onboarding-1a-data, p2-filters-1a, p2-filters-1b

## Objective

Create the multi-step onboarding flow components.

## Tasks

### T1: OnboardingFlow component
- **File:** `src/components/onboarding/OnboardingFlow.tsx`
- **Create** client component with 2-step state machine
  - Step 1: Role selection → Step 2: Intent selection → Navigate
  - "Back" button on Step 2
  - "Skip — explore freely" bypass link
  - Smooth slide/fade animation between steps

### T2: RoleStep component
- **File:** `src/components/onboarding/RoleStep.tsx`
- **Create** "I am a..." display with 8 role cards
  - Reuse existing role color scheme
  - Grid layout responsive to viewport

### T3: IntentStep component
- **File:** `src/components/onboarding/IntentStep.tsx`
- **Create** "I want to..." display with 4-6 intent cards
  - Contextual to selected role (some intents may be role-specific)
  - Each card shows intent name + brief description

## Files Created

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `src/components/onboarding/OnboardingFlow.tsx` | Yes |
| Create | `src/components/onboarding/RoleStep.tsx` | Yes |
| Create | `src/components/onboarding/IntentStep.tsx` | Yes |

## Acceptance Criteria

- [ ] Two-step flow: role → intent → navigate
- [ ] "Back" button returns to Step 1 from Step 2
- [ ] "Skip" link bypasses onboarding
- [ ] Animation between steps is smooth
- [ ] Role cards use existing color scheme
- [ ] Works on mobile (single-column layout)

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
