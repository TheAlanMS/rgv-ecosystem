# p2-onboarding-2a-integration

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Onboarding (M5)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-onboarding-1a-data, p2-onboarding-1b-components

## Objective

Replace the homepage role grid with the onboarding flow and wire routing logic.

## Tasks

### T1: Homepage integration
- **File:** `src/app/page.tsx` (modify)
- Replace the static role grid section with OnboardingFlow component
- Preserve other homepage sections (hero, pillar overview, stats)

### T2: Routing logic
- Wire role + intent selection to navigation
- Use role-intent routing map from intents.ts
- Navigate to target page with pre-applied URL filters

## Files Modified

| Action | Path | Exclusive? |
|--------|------|-----------|
| Modify | `src/app/page.tsx` | Yes |

## Acceptance Criteria

- [ ] Homepage shows OnboardingFlow instead of static role grid
- [ ] Selecting role + intent navigates to correct target page
- [ ] Target pages have correct filters pre-applied in URL
- [ ] "Skip" bypasses onboarding
- [ ] Other homepage sections remain unchanged
- [ ] Works correctly on mobile

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build
```
