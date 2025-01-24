import { test, expect } from '@playwright/test';

test('Automated login with CAPTCHA bypass', async ({ page }) => {
    let dropdownSuccess = false;
    let captchaSolved = false;
    let loginSuccess = false;
    
    try {
        console.log('[Test] Starting enhanced login sequence...');
        
        // Configure viewport and timeouts
        page.setDefaultTimeout(60000);
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Navigate to login page
        console.log('[Test] Navigating to login page...');
        await page.goto('https://digitalqa.contracts.sa/login', {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // Enhanced Company Login button detection
        console.log('[Test] Detecting Company Login button...');
        const companyLoginSelectors = [
            'button:has-text("الدخول للشركات")',
            'button:has-text("Company Login")',
            '[aria-label*="Company Login"]',
            '[aria-label*="الدخول للشركات"]',
            'a:has-text("Company Login")',
            'a:has-text("الدخول للشركات")',
            '[role="button"]:has-text("Company Login")',
            '[role="button"]:has-text("الدخول للشركات")'
        ];

        let companyLoginButton = null;
        for (const selector of companyLoginSelectors) {
            try {
                companyLoginButton = await page.waitForSelector(selector, { timeout: 5000 });
                if (companyLoginButton) {
                    console.log(`[Test] Found Company Login button with selector: ${selector}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        if (!companyLoginButton) {
            throw new Error('Company Login button not found');
        }

        // Click with human-like behavior
        console.log('[Test] Clicking Company Login button...');
        await page.waitForTimeout(Math.random() * 500 + 300);
        await companyLoginButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await companyLoginButton.click();
        await page.waitForLoadState('networkidle');

        // Enhanced dropdown handling
        console.log('[Test] Starting enhanced dropdown handling...');
        
        // Strategy 1: Direct form control manipulation
        try {
            const result = await page.evaluate(() => {
                const formControl = document.querySelector('select[formcontrolname="userType"], mat-select[formcontrolname="userType"]');
                if (formControl) {
                    try {
                        (formControl as any).value = 'company-admin';
                        formControl.dispatchEvent(new Event('change', { bubbles: true }));
                        formControl.dispatchEvent(new Event('input', { bubbles: true }));
                        formControl.setAttribute('aria-selected', 'true');
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            });
            
            if (result) {
                dropdownSuccess = true;
                console.log('[Test] Direct manipulation succeeded');
                await page.waitForTimeout(1000);
            }
        } catch (error) {
            console.log('[Test] Direct manipulation failed:', error.message);
        }

        // Strategy 2: Try clicking options directly
        if (!dropdownSuccess) {
            try {
                const optionSelectors = [
                    'mat-option:has-text("Company Admin")',
                    'mat-option:has-text("مسؤول الشركة")',
                    'option[value="company-admin"]',
                    'option:contains("Company Admin")'
                ];
                
                for (const selector of optionSelectors) {
                    const option = await page.$(selector);
                    if (option) {
                        await option.click();
                        dropdownSuccess = true;
                        console.log('[Test] Option click succeeded');
                        break;
                    }
                }
            } catch (error) {
                console.log('[Test] Option click failed:', error.message);
            }
        }

        // Strategy 3: Keyboard navigation
        if (!dropdownSuccess) {
            try {
                await page.keyboard.press('Tab');
                await page.waitForTimeout(200);
                await page.keyboard.press('Space');
                await page.waitForTimeout(200);
                await page.keyboard.press('ArrowDown');
                await page.waitForTimeout(200);
                await page.keyboard.press('Enter');
                dropdownSuccess = true;
                console.log('[Test] Keyboard navigation succeeded');
            } catch (error) {
                console.log('[Test] Keyboard navigation failed:', error.message);
            }
        }

        // Handle CAPTCHA if present
        console.log('[Test] Checking for CAPTCHA...');
        try {
            const captchaFrame = await page.frameLocator('iframe[src*="recaptcha"]').first();
            const checkbox = await captchaFrame.locator('.recaptcha-checkbox-border');
            
            if (await checkbox.count() > 0) {
                console.log('[Test] Found reCAPTCHA checkbox');
                await page.waitForTimeout(Math.random() * 300 + 200);
                await checkbox.click();
                await page.waitForLoadState('networkidle');
                captchaSolved = true;
            }
        } catch (error) {
            console.log('[Test] No reCAPTCHA found or error handling CAPTCHA:', error.message);
        }

        // Enter credentials
        console.log('[Test] Entering credentials...');
        const credentials = {
            email: process.env.email,
            password: process.env.password
        };

        if (!credentials.email || !credentials.password) {
            throw new Error('Missing required login credentials');
        }

        // Fill credentials with human-like timing
        await page.waitForTimeout(Math.random() * 500 + 300);
        await page.fill('input[type="text"]', credentials.email);
        await page.waitForTimeout(Math.random() * 300 + 200);
        await page.fill('input[type="password"]', credentials.password);

        // Submit form
        console.log('[Test] Submitting form...');
        const submitButton = await page.locator('button[type="submit"]');
        await page.waitForTimeout(Math.random() * 400 + 300);
        await submitButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await submitButton.click();

        // Wait for navigation and verify login
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
                try {
                    await page.waitForSelector(selector, { timeout: 5000 });
                    loginSuccess = true;
                    console.log('[Test] Login successful - Dashboard verified');
                    break;
                } catch (e) {
                    continue;
                }
            }

            if (!loginSuccess) {
                throw new Error('Login verification failed - No dashboard indicators found');
            }
        } catch (error) {
            console.error('[Test] Login process failed:', error.message);
            throw error;
        }
    } catch (error) {
        console.error('[Test] Test failed:', error.message);
        throw error;
    } finally {
        // Capture final state
        await page.screenshot({ path: 'final-state.png', fullPage: true });
    }
});

        // Enhanced CAPTCHA detection and handling
        console.log('[Test] Enhanced CAPTCHA detection...');
        
        // Handle slider CAPTCHA
        try {
            const sliderSelectors = [
                'button:has-text("Verify")',
                'button:has-text("التحقق")',
                '.slidercaptcha',
                '.slider-captcha',
                '[class*="slider"][class*="captcha"]'
            ];
            
            for (const selector of sliderSelectors) {
                const sliderElement = await page.$(selector);
                if (sliderElement) {
                    console.log(`[Test] Found slider CAPTCHA with selector: ${selector}`);
                    await page.waitForTimeout(Math.random() * 300 + 200);
                    await sliderElement.click();
                    await page.waitForLoadState('networkidle');
                    break;
                }
            }
        } catch (error) {
            console.log('[Test] No slider CAPTCHA found');
        }
        
        // Handle reCAPTCHA
        try {
            const frame = await page.frameLocator('iframe[src*="recaptcha"]').first();
            const checkbox = await frame.locator('.recaptcha-checkbox-border');
            if (await checkbox.count() > 0) {
                console.log('[Test] Found reCAPTCHA checkbox');
                await page.waitForTimeout(Math.random() * 300 + 200);
                await checkbox.click();
                await page.waitForLoadState('networkidle');
            }
        } catch (error) {
            console.log('[Test] No reCAPTCHA found');
        }
        
        // Enhanced form handling with multiple selector strategies
        console.log('[Test] Enhanced form handling...');
        
        // Enhanced Angular Material dropdown handling
        console.log('[Test] Attempting Company Admin selection...');
        
        // Wait for page stability
        try {
            await page.waitForLoadState('networkidle', { timeout: 5000 });
            await page.waitForTimeout(2000);
        } catch (error) {
            console.log('[Test] Page stability wait failed:', error.message);
            // Continue anyway as the page might still be usable

            // Enhanced dropdown handling
            console.log('[Test] Starting enhanced dropdown handling...');
            
            // Strategy 1: Direct form control manipulation
            try {
                const result = await page.evaluate(() => {
                    const formControl = document.querySelector('select[formcontrolname="userType"], mat-select[formcontrolname="userType"]');
                    if (formControl) {
                        try {
                            (formControl as any).value = 'company-admin';
                            formControl.dispatchEvent(new Event('change', { bubbles: true }));
                            formControl.dispatchEvent(new Event('input', { bubbles: true }));
                            formControl.setAttribute('aria-selected', 'true');
                            return true;
                        } catch (e) {
                            return false;
                        }
                    }
                    return false;
                });
                
                if (result) {
                    dropdownSuccess = true;
                    console.log('[Test] Direct manipulation succeeded');
                    await page.waitForTimeout(1000);
                }
                
            } catch (error) {
                console.log('[Test] Direct manipulation failed:', error.message);
            }
            
            // Strategy 2: Try clicking options directly
            if (!dropdownSuccess) {
                try {
                    const optionSelectors = [
                        'mat-option:has-text("Company Admin")',
                        'mat-option:has-text("مسؤول الشركة")',
                        'option[value="company-admin"]',
                        'option:contains("Company Admin")'
                    ];
                    
                    for (const selector of optionSelectors) {
                        const option = await page.$(selector);
                        if (option) {
                            await option.click();
                            dropdownSuccess = true;
                            console.log('[Test] Option click succeeded');
                            break;
                        }
                    }
                } catch (error) {
                    console.log('[Test] Option click failed:', error.message);
                }
            }
            
            // Strategy 3: Keyboard navigation
            if (!dropdownSuccess) {
                try {
                    await page.keyboard.press('Tab');
                    await page.waitForTimeout(200);
                    await page.keyboard.press('Space');
                    await page.waitForTimeout(200);
                    await page.keyboard.press('ArrowDown');
                    await page.waitForTimeout(200);
                    await page.keyboard.press('Enter');
                    dropdownSuccess = true;
                    console.log('[Test] Keyboard navigation succeeded');
                } catch (error) {
                    console.log('[Test] Keyboard navigation failed:', error.message);
                }
            }
                    });
                });
                
                if (dropdownSuccess) {
                    console.log('[Test] Angular Material dropdown handled successfully');
                    await page.waitForTimeout(1000); // Wait for animations
                }
            } catch (error) {
                console.log('[Test] Angular Material dropdown handling failed:', error.message);
            }
            
            // Final verification and logging
            if (!dropdownSuccess) {
                console.log('[Test] Warning: Could not handle dropdown, proceeding with form fill anyway...');
            } else {
                console.log('[Test] Successfully handled dropdown selection');
                await page.waitForTimeout(1000); // Wait for any animations
            }
            
            // Wait for any animations to complete
            await page.waitForTimeout(2000);

            // Enhanced option selection using JavaScript execution
            console.log('[Test] Attempting to select Company Admin option...');
            
            const selectionMethods = [
                // Method 1: Direct JavaScript selection with Angular Material
                async () => {
                    const result = await page.evaluate(() => {
                        const select = document.querySelector('mat-select');
                        const options = Array.from(document.querySelectorAll('mat-option'));
                        const targetOption = options.find(option => 
                            option.textContent?.includes('Company Admin') || 
                            option.textContent?.includes('مسؤول الشركة')
                        );
                        
                        if (select && targetOption) {
                            const selectInstance = (window as any).ng.getComponent(select);
                            const optionInstance = (window as any).ng.getComponent(targetOption);
                            
                            if (selectInstance && optionInstance) {
                                selectInstance.value = optionInstance.value;
                                selectInstance.close();
                                return true;
                            }
                        }
                        return false;
                    });
                    return result;
                },
                // Method 2: Keyboard navigation as fallback
                async () => {
                    try {
                        await page.keyboard.press('Tab');
                        await page.waitForTimeout(200);
                        await page.keyboard.press('Space');
                        await page.waitForTimeout(200);
                        await page.keyboard.press('ArrowDown');
                        await page.waitForTimeout(200);
                        await page.keyboard.press('Enter');
                        return true;
                    } catch (error) {
                        return false;
                    }
                }
            ];

            let optionSelected = false;
            for (const method of selectionMethods) {
                try {
                    optionSelected = await method();
                    if (optionSelected) {
                        console.log('[Test] Successfully selected Company Admin option');
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }

            // Final verification wait
            await page.waitForTimeout(1000);
            
        } catch (error) {
            console.log('[Test] Company Admin selection error:', error.message);
            console.log('[Test] Proceeding with form fill');
        }
        
        // Wait for any animations to complete
        await page.waitForTimeout(2000);
        
        // Enhanced credential entry with retry mechanism
        const credentials = {
            email: process.env.email,
            password: process.env.password
        };

        if (!credentials.email || !credentials.password) {
            throw new Error('Missing required login credentials');
        }

        console.log('[Test] Attempting to enter credentials...');
        
        // Find and fill email field
        const emailInput = await page.waitForSelector('input[type="text"], input[type="email"]', { timeout: 5000 });
        if (!emailInput) {
            throw new Error('Email input field not found');
        }

        // Fill email with human-like timing
        await page.waitForTimeout(Math.random() * 300 + 200);
        await emailInput.click();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await emailInput.fill(credentials.email);
        
        await page.waitForTimeout(Math.random() * 400 + 300);

        // Find and fill password field
        const passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 5000 });
        if (!passwordInput) {
            throw new Error('Password input field not found');
        }

        // Fill password with human-like timing
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordInput.click();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await passwordInput.fill(credentials.password);

        // Submit form with enhanced detection
        console.log('[Test] Attempting to submit form...');
        const submitButton = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
        
        if (!submitButton) {
            throw new Error('Submit button not found');
        }

        // Click with human-like behavior
        await page.waitForTimeout(Math.random() * 400 + 300);
        await submitButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await submitButton.click();

        // Wait for navigation and verify login success
        console.log('[Test] Waiting for navigation and verifying login...');
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

            let loginSuccess = false;
            for (const selector of dashboardSelectors) {
                try {
                    await page.waitForSelector(selector, { timeout: 5000 });
                    loginSuccess = true;
                    console.log('[Test] Login successful - Dashboard verified');
                    break;
                } catch (error) {
                    continue;
                }
            }

            if (!loginSuccess) {
                throw new Error('Login verification failed - No dashboard indicators found');
            }
        } catch (error) {
            console.error('[Test] Navigation or verification error:', error);
            throw error;
        }

        console.log('[Test] Login sequence completed successfully');

    } catch (error) {
        console.error('[Test] Test failed:', error.message);
        await page.screenshot({ path: `error-state-${Date.now()}.png`, fullPage: true });
        throw error;
    } finally {
        // Capture final state with timestamp
        await page.screenshot({ path: `final-state-${Date.now()}.png`, fullPage: true });
        console.log('[Test] Test execution completed');
    }
});
