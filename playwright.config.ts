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
