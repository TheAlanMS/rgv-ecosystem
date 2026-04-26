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
