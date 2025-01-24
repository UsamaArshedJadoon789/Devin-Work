import { test, expect, Page } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';

async function performLogin(page: Page): Promise<boolean> {
    try {
        console.log('[Login] Starting enhanced login sequence...');
        
        // First try to select Company Admin if the option exists
        try {
            console.log('[Login] Attempting to select Company Admin...');
            const adminSelectors = [
                'select#userType',
                'select[name="userType"]',
                '[aria-label*="User Type"]',
                '[aria-label*="نوع المستخدم"]'
            ];
            
            for (const selector of adminSelectors) {
                const select = await page.$(selector);
                if (select) {
                    await page.waitForTimeout(Math.random() * 300 + 200);
                    await page.selectOption(selector, { label: 'Company Admin' });
                    console.log('[Login] Successfully selected Company Admin');
                    await page.waitForTimeout(500);
                    break;
                }
            }
        } catch (error) {
            console.log('[Login] Company Admin selection not available:', error.message);
        }
        
        // Enhanced form field detection with retry
        let formFieldsFound = false;
        let emailInput, passwordInput;
        
        for (let attempt = 1; attempt <= 3 && !formFieldsFound; attempt++) {
            try {
                console.log(`[Login] Attempting to locate form fields (attempt ${attempt}/3)...`);
                emailInput = await page.waitForSelector('input[type="text"], input[type="email"]', { timeout: 5000 });
                passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 5000 });
                
                if (emailInput && passwordInput) {
                    formFieldsFound = true;
                    console.log('[Login] Form fields located successfully');
                }
            } catch (error) {
                console.error(`[Login] Form field detection attempt ${attempt} failed:`, error);
                if (attempt === 3) throw new Error('Login form fields not found after 3 attempts');
                await page.waitForTimeout(1000);
            }
        }

        // Get and validate credentials
        const email = process.env.email;
        const password = process.env.password;

        if (!email || !password) {
            throw new Error('Missing required login credentials');
        }

        // Enter credentials with human-like timing and verification
        console.log('[Login] Entering credentials...');
        
        // Clear fields and enter credentials with human-like behavior
        await emailInput.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await emailInput.fill('');
        await page.waitForTimeout(Math.random() * 200 + 100);
        await emailInput.fill(email);
        
        await page.waitForTimeout(Math.random() * 400 + 300);
        
        await passwordInput.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordInput.fill('');
        await page.waitForTimeout(Math.random() * 200 + 100);
        await passwordInput.fill(password);
        
        // Verify entered values
        const enteredEmail = await emailInput.inputValue();
        const enteredPassword = await passwordInput.inputValue();
        
        if (enteredEmail !== email || enteredPassword !== password) {
            throw new Error('Credential verification failed');
        }
        
        // Find and click submit button with retry
        let submitSuccess = false;
        for (let attempt = 1; attempt <= 3 && !submitSuccess; attempt++) {
            try {
                console.log(`[Login] Attempting to submit login form (attempt ${attempt}/3)...`);
                const submitButton = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
                
                if (submitButton) {
                    await page.waitForTimeout(Math.random() * 400 + 300);
                    await submitButton.hover();
                    await page.waitForTimeout(Math.random() * 200 + 100);
                    await submitButton.click();
                    submitSuccess = true;
                }
            } catch (error) {
                console.error(`[Login] Submit attempt ${attempt} failed:`, error);
                if (attempt === 3) throw new Error('Failed to submit login form after 3 attempts');
                await page.waitForTimeout(1000);
            }
        }
        
        // Wait for navigation and verify login success
        try {
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
            console.error('[Login] Navigation or verification error:', error);
            return false;
        }

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
