import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 300000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: 1,
  expect: {
    timeout: 60000
  },
  reporter: [
    ['html'],
    ['list']
  ],
  retries: process.env.CI ? 2 : 3,
  use: {
    baseURL: 'https://digitalqa.contracts.sa',
    trace: 'retain-on-failure',
    screenshot: { mode: 'on', fullPage: true },
    viewport: { width: 1920, height: 1080 },
    video: { mode: 'retain-on-failure', size: { width: 1920, height: 1080 } },
    headless: true,
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    },
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    navigationTimeout: 60000,
    actionTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--allow-running-insecure-content',
            '--headless=new'
          ],
          timeout: 120000,
          ignoreDefaultArgs: ['--enable-automation']
        }
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--allow-running-insecure-content',
            '-headless'
          ],
          firefoxUserPrefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
            'privacy.trackingprotection.enabled': false,
            'network.websocket.allowInsecureFromHTTPS': true,
            'security.fileuri.strict_origin_policy': false,
            'security.enterprise_roots.enabled': true,
            'browser.tabs.remote.autostart': false,
            'browser.tabs.remote.autostart.2': false
          }
        }
      }
    }
  ],
});
