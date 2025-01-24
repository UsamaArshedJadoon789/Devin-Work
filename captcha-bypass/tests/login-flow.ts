import { test, expect, Page } from '@playwright/test';
import { detectCaptcha } from './captcha-detection';

async function performLogin(page: Page): Promise<boolean> {
    try {
        console.log('[Login] Starting enhanced login sequence...');
        
        // Enhanced Company Admin selection with multiple strategies
        try {
            console.log('[Login] Attempting to select Company Admin with enhanced detection...');
            const adminSelectors = [
                // Direct selectors
                'select#userType',
                'select[name="userType"]',
                '[aria-label*="User Type"]',
                '[aria-label*="نوع المستخدم"]',
                // Button/radio based selectors
                'button:has-text("Company Admin")',
                'button:has-text("مسؤول الشركة")',
                'input[type="radio"][value*="company-admin"]',
                // Dropdown options
                'select option[value*="company"]',
                'select option:has-text("Company Admin")',
                'select option:has-text("مسؤول الشركة")',
                // Additional fallback selectors
                '[role="combobox"]',
                '[role="listbox"]',
                'mat-select',
                '.user-type-select'
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
        
        // Enhanced form field detection with dynamic selectors
        console.log('[Login] Starting enhanced form field detection...');
        
        const inputSelectors = {
            email: [
                'input[type="text"]',
                'input[type="email"]',
                'input[name*="user"]',
                'input[name*="email"]',
                'input[placeholder*="user"]',
                'input[placeholder*="email"]'
            ],
            password: [
                'input[type="password"]',
                'input[name*="pass"]',
                'input[placeholder*="pass"]'
            ]
        };

        let formFieldsFound = false;
        let emailInput, passwordInput;

        for (let attempt = 1; attempt <= 5 && !formFieldsFound; attempt++) {
            try {
                console.log(`[Login] Form field detection attempt ${attempt}/5...`);
                
                // Try each email selector
                for (const emailSelector of inputSelectors.email) {
                    emailInput = await page.$(emailSelector);
                    if (emailInput) {
                        console.log(`[Login] Found email input with selector: ${emailSelector}`);
                        break;
                    }
                }
                
                // Try each password selector
                for (const passwordSelector of inputSelectors.password) {
                    passwordInput = await page.$(passwordSelector);
                    if (passwordInput) {
                        console.log(`[Login] Found password input with selector: ${passwordSelector}`);
                        break;
                    }
                }
                
                if (emailInput && passwordInput) {
                    formFieldsFound = true;
                    console.log('[Login] All form fields located successfully');
                    break;
                }
                
                // If not found, wait before retry
                if (!formFieldsFound) {
                    console.log('[Login] Some fields not found, waiting before retry...');
                    await page.waitForTimeout(1000 * attempt); // Exponential backoff
                }
            } catch (error) {
                console.error(`[Login] Form field detection attempt ${attempt} failed:`, error);
                if (attempt === 5) throw new Error('Login form fields not found after all attempts');
                await page.waitForTimeout(1000 * attempt);
            }
        }

        // Enhanced credential handling with validation
        const email = process.env.email;
        const password = process.env.password;

        if (!email || !password) {
            throw new Error('Missing required login credentials');
        }

        console.log('[Login] Credentials validated, proceeding with login...');
        
        // Wait for Angular stability
        const waitForAngularStability = async (maxAttempts = 5) => {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    await page.waitForFunction(() => {
                        const angular = (window as any).ng;
                        return angular && angular.getInjector && angular.getInjector().get('$rootScope').$apply;
                    }, { timeout: 5000 });
                    console.log('[Angular] Application stable');
                    return true;
                } catch (error) {
                    console.log(`[Angular] Stability check attempt ${attempt}/${maxAttempts} failed`);
                    if (attempt === maxAttempts) return false;
                    await page.waitForTimeout(1000);
                }
            }
            return false;
        };
        
        const isStable = await waitForAngularStability();
        if (!isStable) {
            console.log('[Angular] Proceeding with login despite stability check failure');
        }
        
        // Enhanced credential entry with retry mechanism
        const fillCredentials = async () => {
            console.log('[Login] Entering credentials with human-like timing...');
            
            // Clear and fill email
            await emailInput.click();
            await page.waitForTimeout(Math.random() * 300 + 200);
            await emailInput.fill('');
            await page.waitForTimeout(Math.random() * 200 + 100);
            await emailInput.fill(email);
            
            await page.waitForTimeout(Math.random() * 400 + 300);
            
            // Clear and fill password
            await passwordInput.click();
            await page.waitForTimeout(Math.random() * 300 + 200);
            await passwordInput.fill('');
            await page.waitForTimeout(Math.random() * 200 + 100);
            await passwordInput.fill(password);
            
            // Verify entered values
            const enteredEmail = await emailInput.inputValue();
            const enteredPassword = await passwordInput.inputValue();
            
            return enteredEmail === email && enteredPassword === password;
        };
        
        // Try filling credentials with retry
        let credentialsEntered = false;
        for (let attempt = 1; attempt <= 3 && !credentialsEntered; attempt++) {
            try {
                credentialsEntered = await fillCredentials();
                if (credentialsEntered) {
                    console.log('[Login] Credentials entered successfully');
                    break;
                }
            } catch (error) {
                console.error(`[Login] Credential entry attempt ${attempt} failed:`, error);
                if (attempt === 3) throw error;
                await page.waitForTimeout(1000 * attempt);
            }
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
