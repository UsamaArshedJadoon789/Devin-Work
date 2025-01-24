import { test, expect } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';
import { performLogin } from './login-flow';

test('Automated login with CAPTCHA bypass', async ({ page }) => {
    try {
        console.log('[Test] Starting automated login sequence...');
        
        // Configure page timeout and viewport
        page.setDefaultTimeout(30000);
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Enhanced navigation with retry mechanism
        let navigationSuccess = false;
        for (let attempt = 1; attempt <= 3 && !navigationSuccess; attempt++) {
            try {
                console.log(`[Navigation] Attempt ${attempt}/3`);
                await page.goto('https://digitalqa.contracts.sa/login', {
                    waitUntil: 'networkidle',
                    timeout: 30000
                });
                
                // Wait for critical content with detailed logging
                console.log('[Page] Waiting for critical elements...');
                await Promise.all([
                    page.waitForLoadState('domcontentloaded').then(() => console.log('[Page] DOM content loaded')),
                    page.waitForSelector('img[alt*="logo"]', { state: 'visible' })
                        .then(() => console.log('[Page] Logo found')),
                    page.waitForSelector('button', { state: 'visible' })
                        .then(() => console.log('[Page] Buttons visible'))
                ]);
                
                navigationSuccess = true;
                console.log('[Navigation] Successfully loaded login page');
            } catch (error) {
                console.error(`[Navigation] Attempt ${attempt} failed:`, error);
                if (attempt === 3) throw error;
                await page.waitForTimeout(2000);
            }
        }
        
        // Enhanced company login button detection with retry
        console.log('[Navigation] Searching for company login button...');
        let buttonSelector = null;
        const selectors = [
            'button:has-text("الدخول للشركات")',
            'button:has-text("Company Login")',
            '[aria-label*="Company Login"]',
            '[aria-label*="الدخول للشركات"]'
        ];
        
        for (const selector of selectors) {
            try {
                console.log(`[Button] Trying selector: ${selector}`);
                const isVisible = await page.isVisible(selector);
                if (isVisible) {
                    buttonSelector = selector;
                    console.log(`[Button] Found visible button with selector: ${selector}`);
                    break;
                }
            } catch (error) {
                console.log(`[Button] Selector ${selector} not found:`, error.message);
            }
        }

        if (!buttonSelector) {
            throw new Error('Company login button not found after trying all selectors');
        }

        console.log(`[Navigation] Found company login button with selector: ${buttonSelector}`);
        
        // Enhanced click with retry mechanism
        let clickSuccess = false;
        for (let attempt = 1; attempt <= 3 && !clickSuccess; attempt++) {
            try {
                console.log(`[Click] Attempt ${attempt}/3 to click company login button`);
                const button = await page.locator(buttonSelector).first();
                
                // Ensure button is visible and clickable
                await button.scrollIntoViewIfNeeded();
                await page.waitForTimeout(Math.random() * 300 + 200);
                
                // Check if button is actually clickable
                const isClickable = await button.isEnabled();
                if (!isClickable) {
                    throw new Error('Button is not clickable');
                }
                
                // Human-like interaction
                await button.hover();
                await page.waitForTimeout(Math.random() * 200 + 100);
                await button.click({ force: true, timeout: 5000 });
                
                clickSuccess = true;
                console.log('[Click] Successfully clicked company login button');
            } catch (error) {
                console.error(`[Click] Attempt ${attempt} failed:`, error);
                if (attempt === 3) throw error;
                await page.waitForTimeout(1000);
            }
        }

        // Enhanced CAPTCHA detection and handling
        console.log('[CAPTCHA] Starting detection sequence...');
        
        // Wait for potential CAPTCHA to load
        await page.waitForTimeout(2000);
        
        const captchaResult = await detectCaptcha(page);
        
        if (captchaResult.detected) {
            console.log(`[CAPTCHA] Detected ${captchaResult.type} CAPTCHA`);
            
            if (captchaResult.type === 'slider') {
                // Handle slider CAPTCHA
                const verifyButton = await page.waitForSelector(
                    'button:has-text("Verify"), button:has-text("التحقق")',
                    { timeout: 5000 }
                ).catch(() => null);
                
                if (verifyButton) {
                    // Click verify with human-like behavior
                    await page.waitForTimeout(Math.random() * 500 + 300);
                    await verifyButton.hover();
                    await page.waitForTimeout(Math.random() * 200 + 100);
                    await verifyButton.click();
                    
                    // Wait for verification result
                    await page.waitForTimeout(2000);
                }
            } else if (captchaResult.type === 'checkbox') {
                // Handle checkbox CAPTCHA
                const frame = await page.frameLocator('iframe[src*="recaptcha"]').first();
                const checkbox = await frame.locator('.recaptcha-checkbox-border').first();
                
                if (checkbox) {
                    await page.waitForTimeout(Math.random() * 500 + 300);
                    await checkbox.click();
                    await page.waitForTimeout(2000);
                }
            }
            
            // Wait for any CAPTCHA animations to complete
            await page.waitForTimeout(2000);
        } else {
            console.log('[CAPTCHA] No CAPTCHA detected, proceeding with login');
        }

        // Enhanced login attempt with retry mechanism
        console.log('[Login] Starting login process...');
        let loginAttempted = false;
        let loginSuccess = false;
        
        for (let attempt = 1; attempt <= 3 && !loginSuccess; attempt++) {
            try {
                console.log(`[Login] Attempt ${attempt}/3`);
                loginAttempted = true;
                loginSuccess = await performLogin(page);
                
                if (loginSuccess) {
                    console.log('[Login] Successfully logged in');
                    break;
                } else {
                    console.log(`[Login] Attempt ${attempt} failed, retrying...`);
                    await page.waitForTimeout(2000);
                }
            } catch (error) {
                console.error(`[Login] Attempt ${attempt} failed with error:`, error);
                if (attempt === 3) throw error;
                await page.waitForTimeout(2000);
            }
        }
        
        if (!loginAttempted || !loginSuccess) {
            throw new Error('Login process failed after all attempts');
        }

        console.log('[Test] Login sequence completed successfully');
        
    } catch (error) {
        console.error('[Test] Test failed:', error);
        throw error;
    } finally {
        // Ensure we capture a screenshot of the final state
        await page.screenshot({ path: 'test-result.png', fullPage: true });
    }
});
