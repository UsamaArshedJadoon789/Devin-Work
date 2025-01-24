import { test, expect } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';
import { performLogin } from './login-flow';

test('Automated login with CAPTCHA bypass', async ({ page }) => {
    try {
        console.log('[Test] Starting automated login sequence...');
        
        // Navigate to login page with enhanced waiting strategy
        await page.goto('https://digitalqa.contracts.sa/login', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        // Wait for critical content to be ready
        await Promise.all([
            page.waitForLoadState('domcontentloaded'),
            page.waitForSelector('img[alt*="logo"]', { state: 'visible' }),
            page.waitForSelector('button', { state: 'visible' })
        ]);
        
        // Enhanced company login button detection
        console.log('[Navigation] Searching for company login button...');
        const buttonSelector = await Promise.race([
            page.waitForSelector('button:has-text("الدخول للشركات")', { timeout: 5000 })
                .then(() => 'button:has-text("الدخول للشركات")'),
            page.waitForSelector('button:has-text("Company Login")', { timeout: 5000 })
                .then(() => 'button:has-text("Company Login")')
        ]).catch(() => null);

        if (!buttonSelector) {
            throw new Error('Company login button not found');
        }

        console.log(`[Navigation] Found company login button with selector: ${buttonSelector}`);
        
        // Click with human-like behavior
        const button = await page.locator(buttonSelector).first();
        await button.scrollIntoViewIfNeeded();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await button.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await button.click({ force: true });

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

        // Proceed with login regardless of CAPTCHA status
        console.log('[Login] Attempting login with credentials...');
        const loginSuccess = await performLogin(page);
        
        if (!loginSuccess) {
            throw new Error('Login process failed');
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
