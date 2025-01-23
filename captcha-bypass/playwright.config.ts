import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://digitalqa.contracts.sa',
    trace: 'retain-on-failure',
    screenshot: { mode: 'on', fullPage: true },
    viewport: { width: 1920, height: 1080 },
    video: 'retain-on-failure',
    headless: true,
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--headless=new',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--hide-scrollbars',
        '--mute-audio'
      ],
      timeout: 120000
    },
    contextOptions: {
      reducedMotion: 'reduce',
      forcedColors: 'none'
    },
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    permissions: ['clipboard-read', 'clipboard-write'],
    serviceWorkers: 'block',
    navigationTimeout: 60000,
    actionTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
