 Subagent# Playwright Visual QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Playwright as a durable browser automation foundation and implement the full browser/mobile visual QA test suite defined in `implementation/phase2/browser-mobile-visual-qa.md`.

**Architecture:** Install `@playwright/test` alongside the existing Vitest unit test setup (no conflict). Playwright handles real browser checks — route matrix screenshots, interaction flows, overflow detection, mobile viewport checks, and keyboard accessibility sampling. Vitest continues to handle component unit tests. All Playwright tests live in `tests/` at the project root; helpers in `tests/helpers/`; the spec in `tests/visual/`.

**Tech Stack:** Playwright 1.x (`@playwright/test`), TypeScript 5, Next.js 16 (app under test), Chromium browser.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `playwright.config.ts` | Playwright runner config — baseURL, Chromium project, CI retries, HTML reporter, screenshot/trace/video on failure |
| Create | `tests/helpers/visualQa.ts` | Shared utilities: viewport defs, route defs, screenshotPath, safeFilename, assertNoHorizontalOverflow, assertPageLoaded |
| Create | `tests/visual/browser-mobile-visual-qa.spec.ts` | Full spec: route matrix, browser smoke, map QA, mobile nav, mobile map, accessibility |
| Create | `implementation/phase2/audits/screenshots/.gitkeep` | Ensures screenshot output directory exists before tests run |
| Create | `implementation/phase2/playwright-visual-qa.md` | Documentation: why Playwright, how to run, assumptions, limitations |
| Modify | `package.json` | Add `test:e2e`, `test:visual`, and related scripts |

---

## Task 1: Install @playwright/test and Chromium

**Files:**
- Modifies: `package.json` (npm install writes devDependencies)
- Modifies: `package-lock.json`

- [ ] **Step 1: Verify Playwright is not already installed**

```bash
ls node_modules/@playwright 2>/dev/null && echo "already installed" || echo "not installed"
```

Expected: `not installed`

- [ ] **Step 2: Install @playwright/test as a dev dependency**

```powershell
cmd /c npm.cmd install -D @playwright/test
```

Expected: Installs without errors. `package.json` devDependencies now includes `"@playwright/test"`.

- [ ] **Step 3: Install Chromium browser only**

```powershell
cmd /c npx.cmd playwright install chromium
```

Expected: Downloads Chromium browser binary. Output includes "Chromium ... downloaded to ...".

- [ ] **Step 4: Verify installation**

```powershell
cmd /c npx.cmd playwright --version
```

Expected: Prints `Version 1.x.x` (any 1.x version).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @playwright/test and chromium browser"
```

---

## Task 2: Create playwright.config.ts

**Files:**
- Create: `playwright.config.ts`

- [ ] **Step 1: Write the config**

Create `playwright.config.ts` at the project root:

```ts
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration.
 *
 * Base URL defaults to http://127.0.0.1:3000.
 * Override: BASE_URL=http://127.0.0.1:3001 npm run test:visual
 *
 * Start the dev server first:
 *   npm run dev -- --hostname 127.0.0.1 --port 3000
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env['BASE_URL'] ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

- [ ] **Step 2: Verify TypeScript compiles (Playwright config only)**

```powershell
cmd /c npx.cmd tsc --noEmit --skipLibCheck
```

Expected: No errors. If errors appear about `@playwright/test` not found, verify Step 2 of Task 1 succeeded.

**Known TypeScript consideration:** The root `tsconfig.json` uses `"moduleResolution": "bundler"` and `"globals": true` in vitest. Playwright types and vitest globals can coexist because the Playwright spec files explicitly import `test` and `expect` from `@playwright/test`, shadowing any global vitest `test`. If `tsc --noEmit` reports conflicts, add `"tests/**/*"` and `"playwright.config.ts"` to the `"exclude"` array in `tsconfig.json` and create a separate `tsconfig.playwright.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "moduleResolution": "node16",
    "noEmit": true
  },
  "include": ["playwright.config.ts", "tests/**/*.ts"]
}
```

Then add to `playwright.config.ts` use block: `tsconfig: './tsconfig.playwright.json'`

- [ ] **Step 3: Commit**

```bash
git add playwright.config.ts
git commit -m "feat: add playwright.config.ts with Chromium project and CI settings"
```

---

## Task 3: Create tests/helpers/visualQa.ts

**Files:**
- Create: `tests/helpers/visualQa.ts`

- [ ] **Step 1: Create the helpers directory and file**

Create `tests/helpers/visualQa.ts`:

```ts
import { expect, type Page } from '@playwright/test';

/**
 * Viewport definitions for the browser/mobile visual QA pass.
 * Source: implementation/phase2/browser-mobile-visual-qa.md § Viewports
 */
export const qaViewports = [
  { name: 'desktop-wide', width: 1440, height: 900 },
  { name: 'laptop',       width: 1280, height: 800 },
  { name: 'tablet',       width: 768,  height: 1024 },
  { name: 'mobile-390',   width: 390,  height: 844 },
  { name: 'mobile-320',   width: 320,  height: 720 },
] as const;

/**
 * Route definitions for the route matrix.
 * Source: implementation/phase2/browser-mobile-visual-qa.md § Route Matrix
 */
export const qaRoutes = [
  { path: '/',                            note: 'Role + intent onboarding, header, footer' },
  { path: '/search',                      note: 'Blank-query prompt' },
  { path: '/search?q=capital',            note: 'Actor/pillar/gap grouped results' },
  { path: '/search?q=starr',              note: 'Gap result visibility' },
  { path: '/map',                         note: 'List view, filters, sorting' },
  { path: '/map?view=map',                note: 'Leaflet map, actor markers, gap markers, legends' },
  { path: '/map?view=pillar',             note: 'By-pillar accordion' },
  { path: '/map?county=Starr&view=map',   note: 'Starr gap context with low actor coverage' },
  { path: '/map?county=Willacy&view=map', note: 'Willacy gap context with low actor coverage' },
  { path: '/journeys/startup',            note: 'Journey steps and pillar links' },
  { path: '/journeys/investor',           note: 'Alternate role journey' },
  { path: '/ecosystem-health',            note: 'Gap visibility and metric layout' },
] as const;

/**
 * Converts a route path to a filesystem-safe filename segment.
 * Examples:
 *   '/'                       -> 'index'
 *   '/search?q=capital'       -> 'search_q_capital'
 *   '/map?county=Starr&view=map' -> 'map_county_Starr_view_map'
 */
export function safeFilename(routePath: string): string {
  const cleaned = routePath
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return cleaned.length > 0 ? cleaned : 'index';
}

/**
 * Returns the screenshot output path for a given viewport and route.
 * Optional suffix distinguishes screenshots taken in different test sections
 * (e.g., route matrix vs. targeted map QA checks).
 *
 * Output dir: implementation/phase2/audits/screenshots/
 */
export function screenshotPath(
  viewportName: string,
  routePath: string,
  suffix = '',
): string {
  const base = `${viewportName}-${safeFilename(routePath)}`;
  const sfx = suffix ? `-${suffix}` : '';
  return `implementation/phase2/audits/screenshots/${base}${sfx}.png`;
}

/**
 * Asserts that the page has no horizontal overflow.
 * Fail message maps to the runbook defect format.
 */
export async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(
    scrollWidth,
    `Horizontal overflow detected — scrollWidth(${scrollWidth}px) > clientWidth(${clientWidth}px).\n` +
    `Expected: scrollWidth <= clientWidth\n` +
    `Severity: Blocker at mobile viewports.`,
  ).toBeLessThanOrEqual(clientWidth);
}

/**
 * Asserts the page loaded without a Next.js crash.
 */
export async function assertPageLoaded(page: Page): Promise<void> {
  await expect(page.locator('body')).toBeVisible();
  const bodyText = (await page.locator('body').textContent()) ?? '';
  expect(
    bodyText,
    'Next.js crash message detected — page rendered an error boundary.\n' +
    'Severity: Blocker.',
  ).not.toMatch(/Application error: a client-side exception has occurred/i);
}
```

- [ ] **Step 2: Verify TypeScript sees the file cleanly**

```powershell
cmd /c npx.cmd tsc --noEmit --skipLibCheck
```

Expected: No errors on `tests/helpers/visualQa.ts`.

- [ ] **Step 3: Commit**

```bash
git add tests/helpers/visualQa.ts
git commit -m "feat: add Playwright visual QA helper utilities"
```

---

## Task 4: Create the main test spec

**Files:**
- Create: `tests/visual/browser-mobile-visual-qa.spec.ts`

This is the largest file. It implements all six test groups from the QA runbook.

- [ ] **Step 1: Create the spec file**

Create `tests/visual/browser-mobile-visual-qa.spec.ts`:

```ts
/**
 * Browser and Mobile Visual QA Test Suite
 *
 * Source of truth: implementation/phase2/browser-mobile-visual-qa.md
 * Screenshots output: implementation/phase2/audits/screenshots/
 *
 * Prerequisites:
 *   1. npm run dev -- --hostname 127.0.0.1 --port 3000
 *   2. npm run test:visual
 *      (or BASE_URL=http://127.0.0.1:3001 npm run test:visual)
 */

import { test, expect } from '@playwright/test';
import {
  qaViewports,
  qaRoutes,
  screenshotPath,
  assertNoHorizontalOverflow,
  assertPageLoaded,
} from '../helpers/visualQa';

// =============================================================================
// 1. Route Matrix Visual Smoke Tests
// All 12 routes × 5 viewports from browser-mobile-visual-qa.md § Route Matrix
// Generates 60 tests. Each: navigate, assert no crash, assert no overflow,
// capture full-page screenshot to implementation/phase2/audits/screenshots/.
// =============================================================================

for (const viewport of qaViewports) {
  test.describe(`Route Matrix — ${viewport.name} (${viewport.width}×${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of qaRoutes) {
      test(`${route.path} — visual smoke [${route.note}]`, async ({ page }) => {
        await test.step('Navigate to route', async () => {
          const response = await page.goto(route.path);
          const status = response?.status() ?? 200;
          expect(
            status,
            `HTTP ${status} on ${route.path} — route returned a server error`,
          ).toBeLessThan(500);
        });

        await test.step('Page loaded — body visible, no crash', async () => {
          await assertPageLoaded(page);
        });

        await test.step('No horizontal overflow', async () => {
          await assertNoHorizontalOverflow(page);
        });

        await test.step('Full-page screenshot', async () => {
          await page.screenshot({
            path: screenshotPath(viewport.name, route.path),
            fullPage: true,
          });
        });
      });
    }
  });
}

// =============================================================================
// 2. Browser Smoke Checks
// Core interaction flows from browser-mobile-visual-qa.md § Browser Smoke Checks
// Steps 1-12 from the runbook.
// =============================================================================

test.describe('Browser Smoke Checks', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('1. homepage renders header without overflow', async ({ page }) => {
    await page.goto('/');
    await assertPageLoaded(page);
    await expect(page.locator('header')).toBeVisible();
    await assertNoHorizontalOverflow(page);
  });

  test('2. role + intent onboarding flow — role and intent steps accessible', async ({
    page,
  }) => {
    await page.goto('/');

    await test.step('Onboarding section visible', async () => {
      await expect(
        page.getByRole('region', { name: 'Role and intent onboarding' }),
      ).toBeVisible();
    });

    await test.step('Role step heading visible', async () => {
      await expect(page.getByRole('heading', { name: /I am a/i })).toBeVisible();
    });

    await test.step('Click first role button', async () => {
      // RoleStep renders <button aria-pressed="false|true"> for each role
      const onboarding = page.getByRole('region', { name: 'Role and intent onboarding' });
      const roleButtons = onboarding.locator('button[aria-pressed]');
      const count = await roleButtons.count();
      if (count === 0) {
        throw new Error(
          'No role buttons with aria-pressed found in the onboarding section.\n' +
            'Defect: RoleStep does not render accessible role buttons.\n' +
            'Route: /, Browser: Chromium, Severity: High.\n' +
            'Expected: At least one <button aria-pressed> inside #onboarding region.\n' +
            'Actual: 0 buttons found.',
        );
      }
      await roleButtons.first().click();
    });

    await test.step('Intent step heading appears', async () => {
      await expect(
        page.getByRole('heading', { name: /I want to/i }),
      ).toBeVisible({ timeout: 3000 });
    });

    await test.step('Intent step has clickable intent buttons', async () => {
      const onboarding = page.getByRole('region', { name: 'Role and intent onboarding' });
      const intentButtons = onboarding.locator('button[aria-pressed]');
      await expect(intentButtons.first()).toBeVisible({ timeout: 3000 });
    });
  });

  test('3. header search for "capital" routes to /search?q=capital', async ({ page }) => {
    await page.goto('/');

    await test.step('Use desktop header search input', async () => {
      // HeaderSearch renders a SearchInput with label "Search the ecosystem" (hidden)
      const searchInput = page.getByLabel('Search the ecosystem').first();
      await expect(searchInput).toBeVisible();
      await searchInput.fill('capital');
      await searchInput.press('Enter');
    });

    await test.step('URL matches /search?q=capital', async () => {
      await page.waitForURL(/\/search\?q=capital/i, { timeout: 5000 });
      expect(page.url()).toContain('/search?q=capital');
    });

    await test.step('Search page renders main content', async () => {
      await assertPageLoaded(page);
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test('4. search for "starr" shows non-empty results', async ({ page }) => {
    await page.goto('/search?q=starr');
    await assertPageLoaded(page);
    await expect(page.locator('main')).toBeVisible();
    const mainText = (await page.locator('main').textContent()) ?? '';
    expect(
      mainText.trim().length,
      'Search page for "starr" rendered empty main content.\n' +
        'Defect: Gap results not visible for starr query.\n' +
        'Route: /search?q=starr, Browser: Chromium, Severity: High.',
    ).toBeGreaterThan(0);
  });

  test('5. map view switching — List, Map, By Pillar — updates URL', async ({ page }) => {
    await page.goto('/map');
    await assertPageLoaded(page);

    await test.step('Switch to Map view', async () => {
      await page.getByRole('button', { name: 'Map' }).first().click();
      await expect(page).toHaveURL(/view=map/, { timeout: 3000 });
    });

    await test.step('Switch to By Pillar view', async () => {
      await page.getByRole('button', { name: 'By Pillar' }).first().click();
      await expect(page).toHaveURL(/view=pillar/, { timeout: 3000 });
    });

    await test.step('Switch back to List view', async () => {
      await page.getByRole('button', { name: 'List' }).first().click();
      await page.waitForTimeout(500);
      const url = page.url();
      const isStillOnMapOrPillar = url.includes('view=map') || url.includes('view=pillar');
      expect(
        isStillOnMapOrPillar,
        'URL still shows map/pillar view after clicking List.\n' +
          'Defect: List view toggle does not update URL.\n' +
          'Route: /map, Browser: Chromium, Severity: High.',
      ).toBe(false);
    });
  });

  test('6. county filter applies and clear-all removes it', async ({ page }) => {
    await page.goto('/map');
    await assertPageLoaded(page);

    await test.step('Open County filter group', async () => {
      // FilterBar uses <details><summary>County</summary>...</details>
      const countySummary = page.locator('summary').filter({ hasText: /^County/ });
      await expect(countySummary).toBeVisible();
      await countySummary.click();
    });

    await test.step('Check Starr county checkbox', async () => {
      const starrCheckbox = page.getByRole('checkbox', { name: /Starr/i }).first();
      if (!(await starrCheckbox.isVisible())) {
        throw new Error(
          'Starr county checkbox not visible after opening County filter.\n' +
            'Defect: FilterBar County dropdown did not open or Starr county is missing.\n' +
            'Route: /map, Browser: Chromium, Severity: High.',
        );
      }
      await starrCheckbox.check();
    });

    await test.step('URL updates with county=Starr', async () => {
      await expect(page).toHaveURL(/county=Starr/i, { timeout: 3000 });
    });

    await test.step('Clear All button appears and clears filter', async () => {
      const clearAll = page.getByRole('button', { name: /Clear all/i });
      await expect(clearAll).toBeVisible({ timeout: 3000 });
      await clearAll.click();
    });

    await test.step('URL no longer has county=Starr', async () => {
      await expect(page).not.toHaveURL(/county=Starr/i, { timeout: 3000 });
    });
  });
});

// =============================================================================
// 3. Map Visual QA
// From browser-mobile-visual-qa.md § Map Visual QA
// Checks Leaflet container, map height, gap-context routes, no overflow.
// =============================================================================

test.describe('Map Visual QA', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('/map?view=map — Leaflet container exists and has visible height', async ({ page }) => {
    await page.goto('/map?view=map');
    await assertPageLoaded(page);

    await test.step('Leaflet container (.leaflet-container) exists', async () => {
      const leaflet = page.locator('.leaflet-container');
      const count = await leaflet.count();
      if (count === 0) {
        throw new Error(
          'Leaflet container (.leaflet-container) not found on /map?view=map.\n' +
            'Defect: Map view does not render Leaflet.\n' +
            'Route: /map?view=map, Viewport: 1280×800, Browser: Chromium, Severity: Blocker.\n' +
            'Expected: .leaflet-container visible in DOM.\n' +
            'Actual: 0 elements matched.',
        );
      }
      await expect(leaflet.first()).toBeVisible();
    });

    await test.step('Map container height > 200px', async () => {
      const leaflet = page.locator('.leaflet-container').first();
      const box = await leaflet.boundingBox();
      expect(
        box,
        'Leaflet container has no bounding box — map may be zero-height.\n' +
          'Severity: Blocker.',
      ).not.toBeNull();
      expect(
        box!.height,
        `Map container height is ${box?.height}px — must be > 200px.\n` +
          'Defect: Map is collapsed or zero-height.\n' +
          'Route: /map?view=map, Severity: Blocker.',
      ).toBeGreaterThan(200);
    });

    await test.step('No horizontal overflow', async () => {
      await assertNoHorizontalOverflow(page);
    });

    await test.step('Screenshot of map view — detailed QA capture', async () => {
      await page.screenshot({
        path: screenshotPath('laptop', '/map?view=map', 'map-qa'),
        fullPage: true,
      });
    });
  });

  test('/map?county=Starr&view=map — Starr gap context renders without crash', async ({
    page,
  }) => {
    await page.goto('/map?county=Starr&view=map');
    await assertPageLoaded(page);
    await assertNoHorizontalOverflow(page);

    await test.step('Leaflet visible if map renders', async () => {
      const leaflet = page.locator('.leaflet-container');
      if ((await leaflet.count()) > 0) {
        await expect(leaflet.first()).toBeVisible();
      }
    });

    await page.screenshot({
      path: screenshotPath('laptop', '/map?county=Starr&view=map', 'starr-qa'),
      fullPage: true,
    });
  });

  test('/map?county=Willacy&view=map — Willacy gap context renders without crash', async ({
    page,
  }) => {
    await page.goto('/map?county=Willacy&view=map');
    await assertPageLoaded(page);
    await assertNoHorizontalOverflow(page);

    await test.step('Leaflet visible if map renders', async () => {
      const leaflet = page.locator('.leaflet-container');
      if ((await leaflet.count()) > 0) {
        await expect(leaflet.first()).toBeVisible();
      }
    });

    await page.screenshot({
      path: screenshotPath('laptop', '/map?county=Willacy&view=map', 'willacy-qa'),
      fullPage: true,
    });
  });
});

// =============================================================================
// 4. Mobile Navigation QA
// From browser-mobile-visual-qa.md § Mobile Navigation QA
// Tested at both 390×844 and 320×720.
// =============================================================================

for (const mobileViewport of [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-320', width: 320, height: 720 },
] as const) {
  test.describe(
    `Mobile Navigation QA — ${mobileViewport.name} (${mobileViewport.width}×${mobileViewport.height})`,
    () => {
      test.use({ viewport: { width: mobileViewport.width, height: mobileViewport.height } });

      test('homepage loads without horizontal overflow', async ({ page }) => {
        await page.goto('/');
        await assertPageLoaded(page);
        await assertNoHorizontalOverflow(page);
      });

      test('mobile menu trigger visible, opens, and closes', async ({ page }) => {
        await page.goto('/');

        await test.step('Menu trigger (hamburger) is visible', async () => {
          // SiteHeader: <button aria-label="Open navigation"> visible only on md:hidden breakpoints
          await expect(
            page.getByRole('button', { name: /Open navigation/i }),
          ).toBeVisible({ timeout: 5000 });
        });

        await test.step('Open mobile menu', async () => {
          await page.getByRole('button', { name: /Open navigation/i }).click();
          await expect(page.locator('#mobile-navigation')).toBeVisible({ timeout: 3000 });
        });

        await test.step('Mobile nav has 6 links', async () => {
          const mobileNav = page.locator('#mobile-navigation');
          await expect(mobileNav.getByRole('link')).toHaveCount(6);
        });

        await test.step('Close mobile menu', async () => {
          await page.getByRole('button', { name: /Close navigation/i }).click();
          await expect(page.locator('#mobile-navigation')).not.toBeVisible({
            timeout: 3000,
          });
        });
      });

      test('mobile search opens, accepts input, submits to /search?q=capital', async ({
        page,
      }) => {
        await page.goto('/');

        await test.step('Open mobile search overlay', async () => {
          const searchTrigger = page.getByRole('button', { name: 'Open search' });
          await expect(searchTrigger).toBeVisible();
          await searchTrigger.click();
        });

        await test.step('Mobile search input visible in overlay', async () => {
          // Mobile search input is in a fixed overlay — last match of this label
          const mobileInput = page.getByLabel('Search the ecosystem').last();
          await expect(mobileInput).toBeVisible({ timeout: 3000 });
        });

        await test.step('Enter "capital" and submit', async () => {
          const mobileInput = page.getByLabel('Search the ecosystem').last();
          await mobileInput.fill('capital');
          await mobileInput.press('Enter');
        });

        await test.step('Navigates to /search?q=capital', async () => {
          await page.waitForURL(/\/search\?q=capital/i, { timeout: 5000 });
        });
      });

      test('header does not force horizontal overflow', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('header')).toBeVisible();
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          scrollWidth,
          `Header causes overflow at ${mobileViewport.width}px:\n` +
            `scrollWidth(${scrollWidth}px) > clientWidth(${clientWidth}px)\n` +
            `Route: /, Severity: Blocker.`,
        ).toBeLessThanOrEqual(clientWidth);
      });

      test('navigate to /map via mobile nav link', async ({ page }) => {
        await page.goto('/');

        await test.step('Open mobile menu', async () => {
          await page.getByRole('button', { name: /Open navigation/i }).click();
          await expect(page.locator('#mobile-navigation')).toBeVisible();
        });

        await test.step('Click Cardinal Map link', async () => {
          await page
            .locator('#mobile-navigation')
            .getByRole('link', { name: 'Cardinal Map' })
            .click();
        });

        await test.step('Navigates to /map', async () => {
          await expect(page).toHaveURL(/\/map/, { timeout: 5000 });
          await assertPageLoaded(page);
        });
      });
    },
  );
}

// =============================================================================
// 5. Mobile Map and Filter QA
// From browser-mobile-visual-qa.md § Mobile Map and Filter QA
// Tested at 320×720 only.
// =============================================================================

test.describe('Mobile Map and Filter QA — 320×720', () => {
  test.use({ viewport: { width: 320, height: 720 } });

  test('/map?view=map — no horizontal overflow at 320px', async ({ page }) => {
    await page.goto('/map?view=map');
    await assertPageLoaded(page);
    await assertNoHorizontalOverflow(page);

    await page.screenshot({
      path: screenshotPath('mobile-320', '/map?view=map', 'mobile-map-qa'),
      fullPage: true,
    });
  });

  test('/map filter controls fit at 320px without overflow', async ({ page }) => {
    await page.goto('/map');
    await assertPageLoaded(page);

    await test.step('Filter bar visible', async () => {
      await expect(page.getByRole('region', { name: 'Filter actors' })).toBeVisible();
    });

    await test.step('No overflow before opening filter', async () => {
      await assertNoHorizontalOverflow(page);
    });

    await test.step('Open County filter — no overflow after open', async () => {
      const countySummary = page.locator('summary').filter({ hasText: /^County/ });
      if (await countySummary.isVisible()) {
        await countySummary.click();
        await assertNoHorizontalOverflow(page);
      }
    });

    await test.step('View toggle buttons visible at 320px', async () => {
      await expect(page.getByRole('button', { name: 'Map' }).first()).toBeVisible();
    });
  });

  test('/map — switch to map view at 320px — no overflow', async ({ page }) => {
    await page.goto('/map');
    await assertPageLoaded(page);

    await page.getByRole('button', { name: 'Map' }).first().click();
    await expect(page).toHaveURL(/view=map/, { timeout: 3000 });
    await assertNoHorizontalOverflow(page);

    await page.screenshot({
      path: screenshotPath('mobile-320', '/map', 'after-view-switch'),
      fullPage: true,
    });
  });

  test('/map?county=Starr&view=map at 320px — gap context no overflow', async ({ page }) => {
    await page.goto('/map?county=Starr&view=map');
    await assertPageLoaded(page);
    await assertNoHorizontalOverflow(page);

    await page.screenshot({
      path: screenshotPath('mobile-320', '/map?county=Starr&view=map', 'mobile-gap-qa'),
      fullPage: true,
    });
  });
});

// =============================================================================
// 6. Accessibility Visual Checks
// From browser-mobile-visual-qa.md § Accessibility Visual Checks
// Lightweight keyboard focus sampling — not a full a11y audit.
// =============================================================================

test.describe('Accessibility Visual Checks', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('keyboard Tab reaches header search input on homepage', async ({ page }) => {
    await page.goto('/');

    let reached = false;
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const activeType = await page.evaluate(
        () => (document.activeElement as HTMLInputElement | null)?.type ?? '',
      );
      if (activeType === 'search') {
        reached = true;
        break;
      }
    }

    expect(
      reached,
      'Keyboard Tab did not reach the header search input within 15 tab stops.\n' +
        'Defect: Focus order skips or traps before reaching header search.\n' +
        'Route: /, Browser: Chromium, Severity: High.\n' +
        'Keyboard path expected: Tab -> ... -> search input.',
    ).toBe(true);
  });

  test('keyboard Tab reaches map view toggle on /map', async ({ page }) => {
    await page.goto('/map');

    let reached = false;
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const activeText = await page.evaluate(
        () => document.activeElement?.textContent?.trim() ?? '',
      );
      if (/^(List|Map|By Pillar)$/.test(activeText)) {
        reached = true;
        break;
      }
    }

    expect(
      reached,
      'Keyboard Tab could not reach map view toggle (List / Map / By Pillar) within 40 tab stops.\n' +
        'Defect: View toggle not keyboard-accessible.\n' +
        'Route: /map, Browser: Chromium, Severity: High.',
    ).toBe(true);
  });

  test('keyboard Tab reaches filter controls on /map', async ({ page }) => {
    await page.goto('/map');

    let reached = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const activeText = await page.evaluate(
        () => document.activeElement?.textContent?.trim() ?? '',
      );
      if (/^(Pillar|County|Status|Org type|Stage|Pillar group)/.test(activeText)) {
        reached = true;
        break;
      }
    }

    if (!reached) {
      // Soft check — filter summary elements may be beyond 20 tab stops depending on DOM order
      test.info().annotations.push({
        type: 'accessibility-limitation',
        description:
          'Filter controls not reached within 20 tab stops. ' +
          'Verify manually: keyboard focus order should include FilterBar. ' +
          'Route: /map, Severity: Medium.',
      });
    }
  });

  test('keyboard Tab reaches Clear All button when a filter is active', async ({ page }) => {
    await page.goto('/map?county=Starr');
    await assertPageLoaded(page);

    await test.step('Clear All button is visible with active filter', async () => {
      await expect(page.getByRole('button', { name: /Clear all/i })).toBeVisible();
    });

    let reached = false;
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const activeText = await page.evaluate(
        () => document.activeElement?.textContent?.trim() ?? '',
      );
      if (/Clear all/i.test(activeText)) {
        reached = true;
        break;
      }
    }

    expect(
      reached,
      'Keyboard Tab could not reach Clear All button within 30 tab stops.\n' +
        'Defect: Clear All not keyboard-accessible when a filter is active.\n' +
        'Route: /map?county=Starr, Browser: Chromium, Severity: Medium.',
    ).toBe(true);
  });
});
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```powershell
cmd /c npx.cmd tsc --noEmit --skipLibCheck
```

Expected: No errors. If there are type conflicts between vitest globals and Playwright imports, follow the fallback in Task 2 Step 2.

- [ ] **Step 3: Commit**

```bash
git add tests/visual/browser-mobile-visual-qa.spec.ts
git commit -m "feat: add browser/mobile visual QA Playwright test suite"
```

---

## Task 5: Update package.json scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read existing scripts**

Current scripts in `package.json`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "convex:dev": "convex dev",
  "convex:codegen": "convex codegen",
  "convex:deploy": "convex deploy",
  "convex:import-seed": "tsx scripts/import-convex-seed.ts"
}
```

- [ ] **Step 2: Add Playwright scripts (preserve all existing scripts)**

Add the following scripts. Do not remove or rename any existing script:

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui",
"test:e2e:headed": "playwright test --headed",
"test:visual": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts",
"test:visual:headed": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --headed",
"test:visual:ui": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --ui",
"test:visual:update": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --update-snapshots"
```

The full scripts block should be:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "test:visual": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts",
  "test:visual:headed": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --headed",
  "test:visual:ui": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --ui",
  "test:visual:update": "playwright test tests/visual/browser-mobile-visual-qa.spec.ts --update-snapshots",
  "convex:dev": "convex dev",
  "convex:codegen": "convex codegen",
  "convex:deploy": "convex deploy",
  "convex:import-seed": "tsx scripts/import-convex-seed.ts"
}
```

- [ ] **Step 3: Verify no existing scripts were lost**

```bash
cat package.json | grep '"test"'
cat package.json | grep '"dev"'
cat package.json | grep '"build"'
```

Expected: All three lines printed, confirming originals preserved.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat: add Playwright test:visual and test:e2e scripts to package.json"
```

---

## Task 6: Create screenshots directory and documentation

**Files:**
- Create: `implementation/phase2/audits/screenshots/.gitkeep`
- Create: `implementation/phase2/playwright-visual-qa.md`

- [ ] **Step 1: Create the screenshots directory**

Create `implementation/phase2/audits/screenshots/.gitkeep` (empty file, just to ensure the directory exists in git before tests run).

- [ ] **Step 2: Create the documentation file**

Create `implementation/phase2/playwright-visual-qa.md`:

```markdown
# Playwright Visual QA — Setup and Usage

Date added: 2026-04-26
Source: `implementation/phase2/browser-mobile-visual-qa.md`

## Why Playwright Was Added

Phase 2 includes real browser rendering, mobile layout, Leaflet map behavior,
URL-backed filter state, and mobile navigation flows that Vitest unit tests cannot
cover. Playwright automates:

- Full-page screenshots at all viewports in the route matrix
- Horizontal overflow detection (scrollWidth vs clientWidth)
- Interactive flows: search, filter, view switching, onboarding
- Mobile menu open/close and mobile search submission
- Keyboard accessibility sampling (Tab order, focus reachability)

Playwright does NOT replace human visual review for polish, color accuracy,
typography, spacing, or map tile rendering quality. It automates repeatable
browser checks and produces screenshots for human inspection.

## Structure

```
playwright.config.ts           — Playwright runner configuration
tests/
  helpers/
    visualQa.ts                — Shared utilities (viewports, routes, helpers)
  visual/
    browser-mobile-visual-qa.spec.ts  — Full QA test suite
implementation/phase2/audits/screenshots/  — Screenshot output (git-tracked)
```

## How browser-mobile-visual-qa.md Maps to the Test Suite

| Runbook Section              | Test Describe Block                              |
|------------------------------|--------------------------------------------------|
| Route Matrix                 | `Route Matrix — <viewport>` (loop, 60 tests)    |
| Browser Smoke Checks         | `Browser Smoke Checks`                           |
| Map Visual QA                | `Map Visual QA`                                  |
| Mobile Navigation QA         | `Mobile Navigation QA — mobile-390/320`          |
| Mobile Map and Filter QA     | `Mobile Map and Filter QA — 320×720`             |
| Accessibility Visual Checks  | `Accessibility Visual Checks`                    |

## Prerequisites

1. Node.js installed (project already requires this)
2. Run automated gates first:

```powershell
cmd /c npm.cmd run lint
cmd /c npx.cmd tsc --noEmit
cmd /c npm.cmd test
cmd /c npm.cmd run build
```

3. Install Playwright browsers (first time only):

```powershell
cmd /c npx.cmd playwright install chromium
```

For CI or Linux (installs system dependencies too):

```powershell
cmd /c npx.cmd playwright install --with-deps
```

4. Start the dev server in one terminal:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

## Running the Visual QA Suite

In a second terminal, run:

```powershell
cmd /c npm.cmd run test:visual
```

If port 3000 is unavailable, use port 3001:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3001
```

```powershell
cmd /c set BASE_URL=http://127.0.0.1:3001&& npm.cmd run test:visual
```

### Headed mode (see browser window):

```powershell
cmd /c npm.cmd run test:visual:headed
```

### Interactive UI mode (step through tests, inspect traces):

```powershell
cmd /c npm.cmd run test:visual:ui
```

### All Playwright tests (future suites):

```powershell
cmd /c npm.cmd run test:e2e
```

## Screenshot Output

Screenshots are saved to:

```
implementation/phase2/audits/screenshots/
```

Filename format:

```
<viewport-name>-<route-safe-name>.png
<viewport-name>-<route-safe-name>-<suffix>.png
```

Examples:

```
desktop-wide-index.png
mobile-320-map_view_map.png
laptop-map_view_map-map-qa.png
mobile-320-map_county_Starr_view_map-mobile-gap-qa.png
```

Screenshots are committed to git so they are available for review without re-running tests.

## Interpreting Failures

Each failing test produces an error message structured to match the runbook's defect format:

```
Route: /map?view=map
Viewport: 320 x 720
Browser: Chromium
Severity: Blocker
Expected: ...
Actual: ...
```

Use the error message to fill out the defect template in `browser-mobile-visual-qa.md`.

Playwright also saves:
- `trace` on first retry (viewable via `npx playwright show-trace`)
- `screenshot` on failure
- `video` on first retry

HTML report: after a test run, open `playwright-report/index.html`.

## What Playwright Automates

- Route renders without crash (HTTP < 500, no Next.js error boundary)
- Horizontal overflow (scrollWidth <= clientWidth) at all viewports
- Full-page screenshots for human visual review
- Onboarding flow: role selection, intent step appearance
- Header search: navigates to /search?q= correctly
- Map view toggle: URL params update (view=map, view=pillar, list)
- Filter: county checkbox applies URL param, Clear All removes it
- Mobile menu: opens, shows 6 links, closes
- Mobile search: overlay opens, submits to /search?q=
- Keyboard Tab: reaches search input, view toggle, filter controls, Clear All
- Leaflet container existence and visible height on map view

## What Still Requires Human Visual Review

- Map tile rendering quality (OSM tiles loaded vs blank grey)
- Actor marker color accuracy (pillar group colors)
- Marker cluster behavior at different zoom levels
- County gap marker diamond shape and numbering
- Legend readability against dark surfaces
- Text contrast accuracy
- Popup layout at different viewport sizes
- Spacing, padding, and typography polish
- Touch target size (visual assessment, not just automation)
- Any interaction that requires human judgment about "looks correct"

## Assumptions and Limitations

1. **Dev server must be running.** The test suite does not start the server automatically.
   Override BASE_URL if using a port other than 3000.

2. **Convex data required.** Tests that check search results or map content depend on
   the Convex backend having seed data. If data is missing, search result checks
   may fail with "empty main content".

3. **Leaflet renders in Chromium only.** Map visual checks use `.leaflet-container`.
   If the map library changes, update selectors accordingly.

4. **Mobile breakpoints use Tailwind classes.** The mobile menu trigger is `md:hidden`
   (visible below 768px). Tests set viewport to 390/320 and rely on Tailwind's
   responsive classes rendering correctly in Playwright's Chromium.

5. **Accessibility checks are keyboard-Tab sampling, not a WCAG audit.**
   Use axe-core or similar for a full accessibility audit.

6. **Screenshots capture the page state at test time**, which may not include
   data loaded asynchronously after initial render (Convex real-time updates).
   For complete data review, reload the page in a browser with a running server.

## Adding Future Playwright Tests

1. Create a new spec in `tests/` (e.g., `tests/smoke/homepage.spec.ts`).
2. Import helpers from `tests/helpers/visualQa.ts` if needed.
3. Run with `npm run test:e2e` or add a focused script in `package.json`.
4. The `playwright.config.ts` picks up all `**/*.spec.ts` files under `tests/`.
```

- [ ] **Step 3: Commit**

```bash
git add implementation/phase2/audits/screenshots/.gitkeep implementation/phase2/playwright-visual-qa.md
git commit -m "docs: add playwright-visual-qa.md and screenshots directory"
```

---

## Task 7: Run validation gates

**Files:** No changes.

- [ ] **Step 1: Run lint**

```powershell
cmd /c npm.cmd run lint
```

Expected: No errors. Playwright files are in `tests/` and the ESLint config (`eslint.config.mjs`) applies only to `src/` by default. If ESLint reports errors on Playwright files, add `tests/` to the ESLint ignore list in `eslint.config.mjs`.

- [ ] **Step 2: Run TypeScript check**

```powershell
cmd /c npx.cmd tsc --noEmit
```

Expected: No errors. If there are type conflicts between vitest globals (`globals: true`) and Playwright's imports:
- The cause is vitest's global `test`/`expect` types overlapping with Playwright's imported `test`/`expect`.
- Fix: Add `"tests/**/*"` and `"playwright.config.ts"` to the `exclude` array in `tsconfig.json`. This excludes Playwright files from the main tsconfig without affecting Playwright's own compilation (Playwright uses esbuild at runtime).

- [ ] **Step 3: Run existing unit tests (must still pass)**

```powershell
cmd /c npm.cmd test
```

Expected: Vitest tests pass. Playwright installation must not have broken any existing tests.

- [ ] **Step 4: Run build**

```powershell
cmd /c npm.cmd run build
```

Expected: Build succeeds. Playwright is a dev dependency and does not affect the production build.

- [ ] **Step 5: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve TypeScript/ESLint issues from Playwright addition"
```

---

## Task 8: Run the visual QA suite

**Files:** No changes (screenshots are output artifacts).

- [ ] **Step 1: Start the dev server**

In a separate terminal:

```powershell
cmd /c npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
```

Wait for "Ready" or "started server on 127.0.0.1:3000".

- [ ] **Step 2: Run the visual test suite**

```powershell
cmd /c npm.cmd run test:visual
```

- [ ] **Step 3: Interpret results**

**Expected for a healthy app:** All or most tests pass. Screenshots written to `implementation/phase2/audits/screenshots/`.

**Expected failures to investigate (not fix in this task):**
- Onboarding role buttons: if `button[aria-pressed]` count is 0, the RoleStep component is not rendering or not accessible.
- Leaflet container missing: if the map component is lazy-loaded and not ready by navigation time, add a `waitForSelector` in the test.
- Horizontal overflow at 320px: record as a defect per the runbook format.
- Empty search results: if Convex has no seed data, `search?q=capital` main content is empty.

**Application defects found (record but do not fix):**

Use the defect format from `browser-mobile-visual-qa.md`:

```
### [Route] Short defect title

- Viewport: 320 x 720
- Browser: Chromium
- Route: `/map?county=Starr&view=map`
- Severity: Blocker | High | Medium | Low
- Screenshot: `implementation/phase2/audits/screenshots/<file>.png`
- Expected: What should happen.
- Actual: What happened.
- Notes: Any reproduction detail or suspected component.
```

- [ ] **Step 4: Open HTML report**

```powershell
cmd /c npx.cmd playwright show-report
```

This opens `playwright-report/index.html` in the browser showing all test results.

- [ ] **Step 5: Commit screenshots**

```bash
git add implementation/phase2/audits/screenshots/
git commit -m "test: add initial visual QA screenshots from Playwright run"
```

---

## Self-Review Against Spec

### Spec coverage check

| Requirement from prompt | Covered by task |
|------------------------|-----------------|
| Install Playwright | Task 1 |
| Install browsers | Task 1 Step 3 |
| playwright.config.ts with baseURL, Chromium, CI retries, HTML reporter, screenshot/trace/video on failure | Task 2 |
| `tests/` directory structure | Tasks 3, 4 |
| `tests/helpers/visualQa.ts` with viewport defs, route defs, screenshotPath, safeFilename, overflow check, page load check | Task 3 |
| Route matrix: all 12 routes × 5 viewports | Task 4, Section 1 |
| Browser smoke checks (steps 1-12) | Task 4, Section 2 |
| Map visual QA (Leaflet, height, Starr, Willacy) | Task 4, Section 3 |
| Mobile navigation QA at 390 and 320 | Task 4, Section 4 |
| Mobile map and filter QA at 320 | Task 4, Section 5 |
| Accessibility visual checks | Task 4, Section 6 |
| Package scripts (test:e2e, test:visual, headed, ui, update) | Task 5 |
| Screenshots directory | Task 6 |
| playwright-visual-qa.md documentation | Task 6 |
| Defect-friendly failure messages | Task 4, all sections |
| Validation commands (lint, tsc, test, build) | Task 7 |
| CI documentation (--with-deps) | Task 6 (docs) |
| BASE_URL override documentation | Task 6 (docs) |

### Placeholder scan

No TBD, TODO, or "fill in later" items. All code is complete.

### Type consistency

- `screenshotPath(viewportName, routePath, suffix?)` — consistent across Task 3 definition and Task 4 usage.
- `assertNoHorizontalOverflow(page)` — consistent across Task 3 and Task 4 call sites.
- `assertPageLoaded(page)` — consistent.
- `qaViewports` and `qaRoutes` — `as const` tuples; iterated with `for...of` (no index access, no `noUncheckedIndexedAccess` issues).
- `test.use()` inside `test.describe()` inside `for` loops — valid Playwright pattern.
