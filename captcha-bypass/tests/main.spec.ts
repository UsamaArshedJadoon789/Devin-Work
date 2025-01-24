import { test, expect } from '@playwright/test';

test('Automated login with CAPTCHA bypass', async ({ page }) => {
    try {
        console.log('[Test] Starting login sequence...');
        
        // Configure viewport and timeouts
        page.setDefaultTimeout(30000);
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Navigate to login page and wait for load
        await page.goto('https://digitalqa.contracts.sa/login', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        // Click Company Login button and wait for CAPTCHA
        console.log('[Test] Clicking Company Login button...');
        await Promise.all([
            page.click('button:has-text("الدخول للشركات"), button:has-text("Company Login")'),
            page.waitForLoadState('networkidle')
        ]);
        
        // Handle CAPTCHA
        console.log('[Test] Checking for CAPTCHA...');
        try {
            // Wait for and handle slider CAPTCHA
            const verifyButton = await page.waitForSelector('button:has-text("Verify"), button:has-text("التحقق")', 
                { timeout: 5000 });
            if (verifyButton) {
                console.log('[Test] Found slider CAPTCHA, handling verification...');
                await verifyButton.click();
                await page.waitForLoadState('networkidle');
            }
        } catch (error) {
            console.log('[Test] No slider CAPTCHA found:', error.message);
        }
        
        try {
            // Wait for and handle reCAPTCHA
            const frame = await page.frameLocator('iframe[src*="recaptcha"]').first();
            const checkbox = await frame.locator('.recaptcha-checkbox-border');
            if (await checkbox.count() > 0) {
                console.log('[Test] Found reCAPTCHA, clicking checkbox...');
                await checkbox.click();
                await page.waitForLoadState('networkidle');
            }
        } catch (error) {
            console.log('[Test] No reCAPTCHA found:', error.message);
        }
        
        // Select Company Admin and handle login form
        console.log('[Test] Handling login form...');
        try {
            // Try to select Company Admin
            await page.selectOption('select#userType, select[name="userType"]', { label: 'Company Admin' });
            console.log('[Test] Selected Company Admin');
            
            // Fill credentials
            await page.fill('input[type="text"], input[type="email"]', process.env.email);
            await page.fill('input[type="password"]', process.env.password);
            
            // Submit form and wait for navigation
            await Promise.all([
                page.click('button[type="submit"]'),
                page.waitForNavigation({ waitUntil: 'networkidle' })
            ]);
        } catch (error) {
            console.error('[Test] Login form error:', error.message);
            throw error;
        }
        // Wait for navigation and verify login success
        await Promise.all([
            page.waitForNavigation({ timeout: 30000 }),
            page.waitForLoadState('networkidle', { timeout: 30000 })
        ]);
        
        // Check for successful login
        const dashboardIndicators = [
            '.dashboard-container',
            '[data-testid="dashboard"]',
            '#dashboard-content',
            '[aria-label*="Dashboard"]',
            '[aria-label*="لوحة التحكم"]'
        ];
        
        let loginSuccess = false;
        for (const selector of dashboardIndicators) {
            if (await page.$(selector)) {
                loginSuccess = true;
                console.log('[Test] Login successful - Dashboard found');
                break;
            }
        }
        
        if (!loginSuccess) {
            throw new Error('Login failed - Dashboard not found');
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
