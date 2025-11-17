import { defineConfig, test as baseTest } from '@playwright/test';
import { config } from './configs/config';

const firefoxMaximizedTest = baseTest.extend({
  page: async ({ page }, use) => {
    const { width, height } = await page.evaluate(() => ({
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    }));
    await page.setViewportSize({ width, height });
    await use(page);
  },
});

export default defineConfig({
  timeout: config.globalTimeout,
  testDir: './tests',
  outputDir: 'test-results',
  retries: 0,
  reporter: [['list'], ['allure-playwright']],

  use: {
    headless: config.headless,
    baseURL: config.baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'msedge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        launchOptions: {
          args: [
            '--start-maximized',
          ],
        },
      },
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--start-maximized',
          ],
          ignoreDefaultArgs: ['--disable-extensions'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...firefoxMaximizedTest,
        browserName: 'firefox',
        viewport: null,
        launchOptions: {
        },
      },
    },
  ],

  workers: 4,
});
