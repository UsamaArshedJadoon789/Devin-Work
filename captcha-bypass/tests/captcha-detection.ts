import { test, expect, Page } from '@playwright/test';

async function detectCaptcha(page: Page): Promise<boolean> {
  console.log('[CAPTCHA] Starting enhanced detection sequence...');
  
  // Setup performance observer for network requests
  await page.evaluate(() => {
    window._captchaRequests = [];
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.name.includes('recaptcha') || entry.name.includes('gstatic')) {
          window._captchaRequests.push(entry.name);
        }
      });
    });
    observer.observe({ entryTypes: ['resource'] });
  });

  try {
    // Try multiple detection methods in parallel
    const [hasIframe, hasWidget, hasAPI] = await Promise.all([
      page.waitForSelector('iframe[src*="recaptcha"]', { timeout: 5000 })
        .then(() => true)
        .catch(() => false),
      page.waitForSelector('.g-recaptcha', { timeout: 5000 })
        .then(() => true)
        .catch(() => false),
      page.evaluate(() => typeof window.grecaptcha !== 'undefined')
        .catch(() => false)
    ]);

    // Check network requests
    const captchaRequests = await page.evaluate(() => window._captchaRequests || []);
    const hasNetworkRequests = captchaRequests.length > 0;

    const isDetected = hasIframe || hasWidget || hasAPI || hasNetworkRequests;
    console.log('[CAPTCHA] Detection results:', {
      iframe: hasIframe,
      widget: hasWidget,
      api: hasAPI,
      networkRequests: hasNetworkRequests,
      detected: isDetected
    });

    return isDetected;
  } catch (error) {
    console.error('[CAPTCHA] Detection error:', error);
    return false;
  }
}

export { detectCaptcha };
