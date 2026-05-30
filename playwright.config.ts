import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: ENV.CI,
  retries: ENV.CI ? 2 : 0,
  workers: ENV.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ENV.CI ? ['github'] : ['list'],
  ],
  use: {
    baseURL: ENV.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'auth-setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['auth-setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['auth-setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['auth-setup'],
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      dependencies: ['auth-setup'],
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
      dependencies: ['auth-setup'],
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: ENV.BASE_URL,
    reuseExistingServer: !ENV.CI,
    timeout: 120_000,
  },
  outputDir: 'test-results',
});
