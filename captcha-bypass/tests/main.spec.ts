import { test, expect } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';
import { performLogin } from './login-flow';

test('Automated login with CAPTCHA bypass', async ({ page }) => {
    try {
        console.log('[Test] Starting automated login sequence...');
        
        // Navigate to login page
        await page.goto('https://digitalqa.contracts.sa/login');
        await page.waitForLoadState('networkidle');
        
        // Wait for and click Company Login button
        const companyLoginSelectors = [
            'button:has-text("الدخول للشركات")',
            'button:has-text("Company Login")',
            '[aria-label*="Company Login"]',
            '[aria-label*="الدخول للشركات"]'
        ];

        let companyLoginButton = null;
        for (const selector of companyLoginSelectors) {
            try {
                companyLoginButton = await page.waitForSelector(selector, { timeout: 5000 });
                if (companyLoginButton) {
                    console.log(`[Navigation] Found company login button with selector: ${selector}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!companyLoginButton) {
            throw new Error('Company login button not found');
        }

        // Click with human-like behavior
        await page.waitForTimeout(Math.random() * 500 + 300);
        await companyLoginButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await companyLoginButton.click();

        // Check for CAPTCHA
        const isCaptchaPresent = await detectCaptcha(page);
        
        if (isCaptchaPresent) {
            console.log('[CAPTCHA] CAPTCHA detected, implementing bypass...');
            // CAPTCHA handling will be implemented in next iteration
            await page.waitForTimeout(2000);
        }

        // Attempt login
        const loginSuccess = await performLogin(page);
        
        if (!loginSuccess) {
            throw new Error('Login process failed');
        }

        console.log('[Test] Login sequence completed successfully');
        
    } catch (error) {
        console.error('[Test] Test failed:', error);
        throw error;
    }
});
