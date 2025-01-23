import { test, expect } from '@playwright/test';
import { CaptchaSolver } from './utils/captcha-solver';

test.describe('CAPTCHA Tests', () => {
    let solver: CaptchaSolver;

    test.beforeEach(() => {
        solver = new CaptchaSolver();
    });

    test('should solve click-to-verify CAPTCHA', async ({ page }) => {
        // Navigate to login page
        await page.goto('https://digitalqa.contracts.sa/login', { 
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // Wait for and click company login button
        const companyLoginButton = page.locator('button:has-text("الدخول للشركات")');
        await companyLoginButton.waitFor({ state: 'visible', timeout: 10000 });
        await page.waitForTimeout(Math.random() * 1000 + 500);  // Natural delay
        await companyLoginButton.click();

        // Enter credentials with human-like delays
        const usernameField = page.locator('input[formcontrolname="username"]');
        const passwordField = page.locator('input[formcontrolname="password"]');

        await usernameField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await usernameField.fill('Azmadmin');

        await page.waitForTimeout(Math.random() * 700 + 800);

        await passwordField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordField.fill('P@ssw0rd');

        // Submit form
        const submitButton = page.locator('button[type="submit"]');
        await page.waitForTimeout(Math.random() * 1000 + 1000);
        await submitButton.click();

        // Wait for CAPTCHA with multiple selectors
        const captchaElement = await Promise.race([
            page.waitForSelector('.captcha-container', { timeout: 10000 }),
            page.waitForSelector('dc-captcha-dialog', { timeout: 10000 }),
            page.waitForSelector('[class*="captcha-dialog"]', { timeout: 10000 })
        ]);

        expect(captchaElement).toBeTruthy();

        // Take screenshot for verification
        const screenshotBuffer = await captchaElement.screenshot();
        const imageB64 = screenshotBuffer.toString('base64');

        // Solve CAPTCHA with fallback mechanism
        const success = await solver.solveCaptcha(imageB64);
        expect(success).toBe(true);

        // Verify successful login
        await Promise.race([
            page.waitForSelector('[class*="success"]', { timeout: 5000 }),
            page.waitForSelector('[class*="verified"]', { timeout: 5000 })
        ]);
    });
});
