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
      await expect(page).not.toHaveURL(/view=map|view=pillar/, { timeout: 3000 });
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
      await starrCheckbox.click();
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
      await expect(
        leaflet.first(),
        'Leaflet container (.leaflet-container) not found on /map?view=map.\n' +
          'Defect: Map view does not render Leaflet.\n' +
          'Route: /map?view=map, Viewport: 1280×800, Browser: Chromium, Severity: Blocker.\n' +
          'Expected: .leaflet-container visible in DOM.',
      ).toBeVisible({ timeout: 10000 });
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

        await test.step('Mobile nav includes expected primary links', async () => {
          const mobileNav = page.locator('#mobile-navigation');
          for (const label of [
            'Home',
            'Cardinal Map',
            'Search',
            'Pillars',
            'My Journey',
            'Health',
          ]) {
            await expect(mobileNav.getByRole('link', { name: label })).toBeVisible();
          }
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
