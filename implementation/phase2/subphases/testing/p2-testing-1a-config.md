# p2-testing-1a-config

> **Phase:** 2 — Interactive Features & Polish
> **Group:** Testing (M7)
> **Status:** ⬜ Not Started
> **Dependencies:** p2-polish-1c-layouts

## Objective

Install and configure Vitest with React Testing Library.

## Tasks

### T1: Install test dependencies
- **Packages:** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`

### T2: Vitest configuration
- **File:** `vitest.config.ts`
- **Create** config with: path aliases matching tsconfig, jsdom environment, coverage config

### T3: Package.json scripts
- **File:** `package.json` (modify)
- Add: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`

## Files

| Action | Path | Exclusive? |
|--------|------|-----------|
| Create | `vitest.config.ts` | Yes |
| Modify | `package.json` | Yes |

## Acceptance Criteria

- [ ] `npm test` runs without errors (even with 0 test files)
- [ ] Path aliases resolve correctly in test environment
- [ ] jsdom environment available for component tests
- [ ] Coverage reporting configured

## Gate Check

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```
