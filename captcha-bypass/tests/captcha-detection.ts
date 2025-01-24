import { test, expect, Page } from '@playwright/test';

interface CaptchaDetectionResult {
  detected: boolean;
  type?: 'slider' | 'checkbox' | 'invisible' | 'unknown';
  element?: any;
}

async function detectCaptcha(page: Page): Promise<CaptchaDetectionResult> {
  console.log('[CAPTCHA] Starting enhanced detection sequence...');
  
  try {
    // Monitor network requests for CAPTCHA-related resources
    const captchaNetworkPromise = page.waitForResponse(
      response => response.url().includes('recaptcha') || response.url().includes('gstatic'),
      { timeout: 5000 }
    ).catch(() => null);

    // Check for various CAPTCHA elements
    const selectors = {
      slider: [
        '.slidercaptcha',
        '.slider-captcha',
        '.captcha-slider',
        '[class*="slider"][class*="captcha"]'
      ],
      checkbox: [
        'iframe[src*="recaptcha"]',
        '.g-recaptcha',
        '.recaptcha-checkbox',
        '[class*="recaptcha"][class*="checkbox"]'
      ],
      verify: [
        'button:has-text("Verify")',
        'button:has-text("التحقق")',
        '[class*="verify-button"]',
        '[aria-label*="verify"]',
        '[aria-label*="التحقق"]'
      ]
    };

    // Try to find any CAPTCHA elements
    for (const [type, selectorList] of Object.entries(selectors)) {
      for (const selector of selectorList) {
        const element = await page.$(selector).catch(() => null);
        if (element) {
          console.log(`[CAPTCHA] Detected ${type} CAPTCHA with selector: ${selector}`);
          return {
            detected: true,
            type: type as 'slider' | 'checkbox' | 'invisible' | 'unknown',
            element
          };
        }
      }
    }

    // Check if CAPTCHA was loaded via network
    const captchaResponse = await captchaNetworkPromise;
    if (captchaResponse) {
      console.log('[CAPTCHA] Detected via network request:', captchaResponse.url());
      return {
        detected: true,
        type: 'unknown'
      };
    }

    // Check for invisible reCAPTCHA
    const hasInvisibleCaptcha = await page.evaluate(() => {
      return typeof (window as any).grecaptcha !== 'undefined' ||
             document.querySelector('iframe[src*="recaptcha"]') !== null;
    });

    if (hasInvisibleCaptcha) {
      return {
        detected: true,
        type: 'invisible'
      };
    }

    console.log('[CAPTCHA] No CAPTCHA detected');
    return { detected: false };
  } catch (error) {
    console.error('[CAPTCHA] Detection error:', error);
    return { detected: false };
  }
}

export { detectCaptcha };
