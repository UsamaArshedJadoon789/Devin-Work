import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120000,
  expect: {
    timeout: 45000
  },
  globalTimeout: 600000,
  retries: 3,  // Increased retries for Cloudflare challenges
  workers: 1,  // Single worker to avoid detection
  use: {
    headless: true,
    actionTimeout: 45000,
    navigationTimeout: 60000,
    trace: 'on',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',  // Latest stable Chrome
    launchOptions: {
      args: [
        // Basic configuration
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--headless=new',
        
        // Enhanced stealth configuration
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        '--disable-blink-features=AutomationControlled',
        '--disable-automation',
        
        // Additional stealth arguments
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-extensions',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--disable-sync',
        '--metrics-recording-only',
        '--no-default-browser-check',
        '--no-first-run',
        '--password-store=basic',
        
        // WebRTC protection
        '--force-webrtc-ip-handling-policy=disable_non_proxied_udp'
      ],
      ignoreDefaultArgs: [
        '--enable-automation',
        '--enable-blink-features=AutomationControlled'
      ]
    },
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1'
    },
    screenshot: {
      mode: 'on',
      fullPage: true
    },
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    },
    viewport: {
      width: 1920,
      height: 1080
    },
    // Browser context settings
    bypassCSP: true,  // Bypass Content Security Policy
    ignoreHTTPSErrors: true,  // Handle SSL/TLS errors
    javaScriptEnabled: true,
    hasTouch: true,  // Enable touch events
    isMobile: false,
    locale: 'en-US',
    permissions: ['geolocation'],  // Grant permissions
    timezoneId: 'America/New_York',  // Set timezone
    colorScheme: 'light',  // Prefer light theme
    deviceScaleFactor: 1,  // Standard DPI
    forcedColors: 'none'  // No forced colors
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ]
};

export default config;
