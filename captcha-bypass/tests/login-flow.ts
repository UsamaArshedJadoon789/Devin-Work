import { test, expect, Page } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';

async function performLogin(page: Page): Promise<boolean> {
    try {
        console.log('[Login] Starting login sequence...');
        
        // Wait for form fields with retry mechanism
        const emailInput = await page.waitForSelector('input[type="text"]', { timeout: 10000 });
        const passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 10000 });
        
        if (!emailInput || !passwordInput) {
            throw new Error('Login form fields not found');
        }

        // Get credentials from environment variables
        const email = process.env.email;
        const password = process.env.password;

        if (!email || !password) {
            throw new Error('Missing required login credentials');
        }

        // Enter credentials with human-like timing
        await page.waitForTimeout(Math.random() * 500 + 300);
        await emailInput.fill(email);
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordInput.fill(password);

        // Find and click submit button
        const submitButton = await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
        if (!submitButton) {
            throw new Error('Submit button not found');
        }

        // Click with human-like behavior
        await page.waitForTimeout(Math.random() * 400 + 300);
        await submitButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await submitButton.click();

        // Wait for navigation and verify login success
        await Promise.all([
            page.waitForNavigation({ timeout: 30000 }),
            page.waitForLoadState('networkidle', { timeout: 30000 })
        ]);

        // Check for successful login indicators
        const dashboardSelectors = [
            '.dashboard-container',
            '[data-testid="dashboard"]',
            '#dashboard-content',
            '[aria-label*="Dashboard"]',
            '[aria-label*="لوحة التحكم"]'
        ];

        for (const selector of dashboardSelectors) {
            const element = await page.$(selector);
            if (element) {
                console.log('[Login] Successfully logged in - Dashboard verified');
                return true;
            }
        }

        console.log('[Login] Login might have failed - Dashboard not found');
        return false;
    } catch (error) {
        console.error('[Login] Login process failed:', error);
        return false;
    }
}

export { performLogin };
