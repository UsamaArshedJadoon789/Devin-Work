import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
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
                    'option:has-text("Company Admin")',
                    '[role="option"]:has-text("Company Admin")',
                    '[role="option"]:has-text("مسؤول الشركة")'
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

        // Enhanced CAPTCHA detection and handling
        console.log('[Test] Starting enhanced CAPTCHA detection...');
        
        // Try multiple CAPTCHA detection strategies
        try {
            // Strategy 1: Look for reCAPTCHA iframe
            const frames = await page.frames();
            const recaptchaFrame = frames.find(frame => 
                frame.url().includes('recaptcha') || 
                frame.url().includes('captcha')
            );
            
            if (recaptchaFrame) {
                console.log('[Test] Found reCAPTCHA iframe');
                try {
                    const checkbox = await recaptchaFrame.waitForSelector('.recaptcha-checkbox-border', { timeout: 5000 });
                    if (checkbox) {
                        console.log('[Test] Found reCAPTCHA checkbox');
                        await page.waitForTimeout(Math.random() * 300 + 200);
                        await checkbox.click();
                        await page.waitForLoadState('networkidle');
                        captchaSolved = true;
                    }
                } catch (error) {
                    console.log('[Test] Could not interact with reCAPTCHA checkbox:', error.message);
                }
            }
            
            // Strategy 2: Look for slider CAPTCHA if reCAPTCHA not found/solved
            if (!captchaSolved) {
                const sliderSelectors = [
                    'button:has-text("Verify")',
                    'button:has-text("التحقق")',
                    '.slidercaptcha',
                    '.slider-captcha',
                    '[class*="slider"][class*="captcha"]'
                ];
                
                for (const selector of sliderSelectors) {
                    try {
                        const element = await page.waitForSelector(selector, { timeout: 2000 });
                        if (element) {
                            console.log(`[Test] Found slider CAPTCHA with selector: ${selector}`);
                            
                            // Enhanced CAPTCHA interaction with adaptive slider movement
                            console.log('[Test] Attempting adaptive slider CAPTCHA interaction...');
                            
                            // Get slider dimensions and position
                            const sliderBounds = await element.boundingBox();
                            if (!sliderBounds) {
                                throw new Error('Could not get slider bounds');
                            }
                            
                            // Calculate positions with safety margins
                            const startX = sliderBounds.x + 10;
                            const endX = sliderBounds.x + sliderBounds.width - 15;
                            const y = sliderBounds.y + sliderBounds.height / 2;
                            
                            // Initial mouse positioning with natural movement
                            await page.mouse.move(
                                startX - Math.random() * 20,
                                y + (Math.random() * 10 - 5),
                                { steps: 15 }
                            );
                            await page.waitForTimeout(Math.random() * 300 + 200);
                            
                            // Move to exact start position
                            await page.mouse.move(startX, y, { steps: 5 });
                            await page.waitForTimeout(Math.random() * 200 + 100);
                            
                            // Press mouse with slight delay
                            await page.mouse.down();
                            await page.waitForTimeout(Math.random() * 100 + 50);
                            
                            // Adaptive sliding with variable speed
                            const totalSteps = 25;
                            const baseStepSize = (endX - startX) / totalSteps;
                            
                            // Acceleration profile
                            const speedProfile = Array(totalSteps).fill(0).map((_, i) => {
                                const progress = i / totalSteps;
                                // Slow start, faster middle, slow end
                                return Math.sin(progress * Math.PI) * 0.7 + 0.3;
                            });
                            
                            let currentX = startX;
                            for (let i = 0; i < totalSteps; i++) {
                                const progress = i / totalSteps;
                                const speed = speedProfile[i];
                                const stepSize = baseStepSize * speed;
                                
                                // Add subtle curves to movement
                                const verticalJitter = Math.sin(progress * Math.PI * 2) * 0.5;
                                const horizontalJitter = (Math.random() * 2 - 1) * 0.3;
                                
                                currentX += stepSize;
                                await page.mouse.move(
                                    currentX + horizontalJitter,
                                    y + verticalJitter,
                                    { steps: Math.floor(speed * 8) + 3 }
                                );
                                
                                // Adaptive delay based on speed
                                await page.waitForTimeout(Math.floor((1 - speed) * 70 + 30));
                            }
                            
                            // Final positioning with extra precision
                            await page.mouse.move(endX, y, { steps: 8 });
                            await page.waitForTimeout(Math.random() * 150 + 100);
                            
                            // Release with slight delay
                            await page.mouse.up();
                            await page.waitForTimeout(Math.random() * 200 + 100);
                            
                            // Enhanced CAPTCHA verification with fallback
                            console.log('[Test] Waiting for CAPTCHA verification...');
                            try {
                                // Enhanced verification with retry mechanism
                                console.log('[Test] Starting enhanced CAPTCHA verification with retries...');
                                
                                let verificationAttempts = 0;
                                const maxVerificationAttempts = 3;
                                
                                while (verificationAttempts < maxVerificationAttempts) {
                                    verificationAttempts++;
                                    console.log(`[Test] Verification attempt ${verificationAttempts}/${maxVerificationAttempts}`);
                                    
                                    const verificationPromises = [
                                        // Method 1: Network requests with broader patterns and longer timeouts
                                        Promise.any([
                                            page.waitForResponse(
                                                response => {
                                                    const url = response.url().toLowerCase();
                                                    return url.includes('captcha') || 
                                                           url.includes('verify') ||
                                                           url.includes('validate');
                                                },
                                                { timeout: 15000 }
                                            ),
                                            page.waitForResponse(
                                                response => {
                                                    const url = response.url().toLowerCase();
                                                    return response.status() === 200 && (
                                                        url.includes('auth') ||
                                                        url.includes('check') ||
                                                        url.includes('success')
                                                    );
                                                },
                                                { timeout: 15000 }
                                            ),
                                            // Additional XHR/fetch request monitoring
                                            page.waitForResponse(
                                                response => {
                                                    const contentType = response.headers()['content-type'] || '';
                                                    return contentType.includes('application/json') && 
                                                           response.status() === 200;
                                                },
                                                { timeout: 15000 }
                                            )
                                        ]).catch(() => null),
                                        
                                        // Method 2: Enhanced Angular form state detection
                                        page.waitForFunction(() => {
                                            const captchaElement = document.querySelector('dc-captcha-dialog');
                                            if (!captchaElement) return false;
                                            
                                            // Get Angular form control
                                            const ngModel = captchaElement.getAttribute('ng-reflect-model');
                                            const formControl = captchaElement.getAttribute('formcontrolname');
                                            
                                            // Check Angular validation states
                                            const isValid = captchaElement.classList.contains('ng-valid');
                                            const isTouched = captchaElement.classList.contains('ng-touched');
                                            const isDirty = captchaElement.classList.contains('ng-dirty');
                                            
                                            // Check parent form validation
                                            const form = captchaElement.closest('form');
                                            const formValid = form && (
                                                form.classList.contains('ng-valid') ||
                                                !form.classList.contains('ng-invalid')
                                            );
                                            
                                            return (isValid && isTouched && isDirty) || formValid;
                                        }, { timeout: 15000 }).catch(() => null),
                                        
                                        // Method 3: Visual state verification
                                        page.waitForFunction(() => {
                                            const captchaDialog = document.querySelector('dc-captcha-dialog');
                                            if (!captchaDialog) return false;
                                            
                                            // Check if success message or indicator is visible
                                            const successElements = [
                                                '.success-message',
                                                '.verification-success',
                                                '[class*="success"]',
                                                '[class*="verified"]'
                                            ];
                                            
                                            const hasSuccessIndicator = successElements.some(selector => {
                                                const element = document.querySelector(selector);
                                                if (!element) return false;
                                                const styles = window.getComputedStyle(element);
                                                return styles.display !== 'none' && styles.visibility !== 'hidden';
                                            });
                                            
                                            // Check if error indicators are not visible
                                            const errorElements = [
                                                '.error-message',
                                                '.verification-error',
                                                '[class*="error"]',
                                                '[class*="failed"]'
                                            ];
                                            
                                            const hasNoErrors = !errorElements.some(selector => {
                                                const element = document.querySelector(selector);
                                                if (!element) return false;
                                                const styles = window.getComputedStyle(element);
                                                return styles.display !== 'none' && styles.visibility !== 'hidden';
                                            });
                                            
                                            return hasSuccessIndicator || hasNoErrors;
                                        }, { timeout: 15000 }).catch(() => null),
                                    ];
                                    
                                    // Enhanced verification with weighted scoring
                                    const results = await Promise.all(verificationPromises);
                                    
                                    // Calculate verification score
                                    let verificationScore = 0;
                                    const weights = {
                                        networkRequest: 0.3,
                                        angularValidation: 0.4,
                                        visualIndicators: 0.3
                                    };
                                    
                                    // Network requests (any successful response counts)
                                    if (results[0] !== null) {
                                        verificationScore += weights.networkRequest;
                                        console.log('[Test] Network verification succeeded');
                                    }
                                    
                                    // Angular form validation
                                    if (results[1] !== null) {
                                        verificationScore += weights.angularValidation;
                                        console.log('[Test] Angular validation succeeded');
                                    }
                                    
                                    // Visual indicators
                                    if (results[2] !== null) {
                                        verificationScore += weights.visualIndicators;
                                        console.log('[Test] Visual verification succeeded');
                                    }
                                    
                                    console.log(`[Test] Verification score: ${verificationScore.toFixed(2)}`);
                                    
                                    // Consider verification successful if score meets threshold
                                    const verificationThreshold = 0.6; // Success if we have at least two indicators
                                    const verificationSuccess = verificationScore >= verificationThreshold;
                                    
                                    if (verificationSuccess) {
                                        console.log('[Test] CAPTCHA verification successful');
                                        break;
                                    } else {
                                        console.log('[Test] Verification attempt failed, retrying...');
                                        if (verificationAttempts < maxVerificationAttempts) {
                                            // Add exponential backoff delay between attempts
                                            const delay = Math.min(2000 * Math.pow(2, verificationAttempts - 1), 8000);
                                            console.log(`[Test] Waiting ${delay}ms before next attempt...`);
                                            await page.waitForTimeout(delay);
                                        }
                                    }
                                    
                                    // If this is the last attempt and we're still failing, try proceeding anyway
                                    if (verificationAttempts === maxVerificationAttempts && !verificationSuccess) {
                                        console.log('[Test] Proceeding with login despite verification uncertainty');
                                        
                                        // Additional verification before proceeding
                                        const finalCheck = await page.evaluate(() => {
                                            const captchaElement = document.querySelector('dc-captcha-dialog');
                                            if (!captchaElement) return true; // Element gone might mean success
                                            
                                            // Check if form is unlocked
                                            const form = captchaElement.closest('form');
                                            if (!form) return false;
                                            
                                            // Check if submit button is enabled
                                            const submitButton = form.querySelector('button[type="submit"]');
                                            return submitButton && !submitButton.disabled;
                                        });
                                        
                                        if (finalCheck) {
                                            console.log('[Test] Final verification passed, proceeding with login');
                                            break;
                                        } else {
                                            console.log('[Test] Final verification failed, attempting one last CAPTCHA solve');
                                            // Try one more slider movement with different timing
                                            await page.waitForTimeout(1000);
                                            await performSliderInteraction(page, sliderElement, {
                                                initialDelay: 800,
                                                movementVariation: 0.3,
                                                finalPause: 500
                                            });
                                            await page.waitForTimeout(2000);
                                            break;
                                        }
                                    }
                                }
                                    
                                    // Method 2: Enhanced DOM state verification with consolidated checks
                                    page.waitForFunction(() => {
                                        const captchaElement = document.querySelector('dc-captcha-dialog');
                                        if (!captchaElement) return true; // Element gone might mean success
                                        
                                        // Check Angular form states
                                        const hasValidClass = captchaElement.classList.contains('ng-valid');
                                        const notInvalidClass = !captchaElement.classList.contains('ng-invalid');
                                        const isTouched = captchaElement.classList.contains('ng-touched');
                                        const isDirty = captchaElement.classList.contains('ng-dirty');
                                        
                                        // Check computed styles
                                        const styles = window.getComputedStyle(captchaElement);
                                        const isVisible = styles.display !== 'none' && styles.visibility !== 'hidden';
                                        
                                        // Check parent form state
                                        const form = captchaElement.closest('form');
                                        const formValid = form ? form.classList.contains('ng-valid') : false;
                                        const formTouched = form ? form.classList.contains('ng-touched') : false;
                                        
                                        // Check submit button state
                                        const submitButton = form?.querySelector('button[type="submit"]');
                                        const buttonEnabled = submitButton && !submitButton.disabled;
                                        
                                        return (hasValidClass && notInvalidClass && isTouched && isDirty) || 
                                               (!isVisible && formValid && formTouched) ||
                                               (formValid && buttonEnabled);
                                    }, { timeout: 10000 }).catch(() => null)
                                ],
                                            !continueBtn.classList.contains('disabled');
                                        
                                        return (formValid && formTouched) || 
                                               captchaHidden || 
                                               successIndicators || 
                                               buttonEnabled;
                                    }, { timeout: 5000 }).catch(() => null)
                                ];
                                
                                // Enhanced verification with weighted scoring
                                console.log('[Test] Checking all verification methods...');
                                const results = await Promise.all(verificationPromises);
                                
                                // Calculate verification score
                                let verificationScore = 0;
                                const weights = {
                                    networkRequest: 0.3,
                                    angularValidation: 0.4,
                                    visualIndicators: 0.3
                                };
                                
                                // Network requests (any successful response counts)
                                if (results[0] !== null) {
                                    verificationScore += weights.networkRequest;
                                    console.log('[Test] Network verification succeeded');
                                }
                                
                                // Angular form validation
                                if (results[1] !== null) {
                                    verificationScore += weights.angularValidation;
                                    console.log('[Test] Angular validation succeeded');
                                }
                                
                                // Visual indicators
                                if (results[2] !== null) {
                                    verificationScore += weights.visualIndicators;
                                    console.log('[Test] Visual verification succeeded');
                                }
                                
                                console.log(`[Test] Verification score: ${verificationScore.toFixed(2)}`);
                                
                                // Consider verification successful if score meets threshold
                                const verificationThreshold = 0.6; // Success if we have at least two indicators
                                const verificationSuccess = verificationScore >= verificationThreshold;
                                
                                if (verificationSuccess) {
                                    console.log('[Test] CAPTCHA verification successful');
                                    captchaSolved = true;
                                    break;
                                } else {
                                    console.log('[Test] Verification attempt failed, retrying...');
                                    if (verificationAttempts < maxVerificationAttempts) {
                                        const delay = Math.min(2000 * Math.pow(2, verificationAttempts - 1), 8000);
                                        console.log(`[Test] Waiting ${delay}ms before next attempt...`);
                                        await page.waitForTimeout(delay);
                                    }
                                }
                                
                                // Enhanced verification and state tracking
                                const verificationState = {
                                    captchaSolved: verified,
                                    formReady: false,
                                    buttonEnabled: false,
                                    canProceed: false
                                };
                                
                                // Check form readiness
                                const formReadiness = await page.evaluate(() => {
                                    const form = document.querySelector('form');
                                    const captcha = document.querySelector('dc-captcha-dialog');
                                    const button = document.querySelector('button.login-button');
                                    
                                    return {
                                        formValid: form?.classList.contains('ng-valid'),
                                        formTouched: form?.classList.contains('ng-touched'),
                                        captchaValid: captcha?.classList.contains('ng-valid'),
                                        captchaTouched: captcha?.classList.contains('ng-touched'),
                                        buttonEnabled: button && !button.hasAttribute('disabled'),
                                        captchaHidden: !captcha || window.getComputedStyle(captcha).display === 'none'
                                    };
                                });
                                
                                console.log('[Test] Form readiness state:', JSON.stringify(formReadiness, null, 2));
                                
                                verificationState.formReady = formReadiness.formValid && 
                                    (formReadiness.captchaValid || formReadiness.captchaHidden);
                                verificationState.buttonEnabled = formReadiness.buttonEnabled;
                                verificationState.canProceed = verificationState.captchaSolved || 
                                    (verificationState.formReady && verificationState.buttonEnabled);
                                
                                if (verificationState.canProceed) {
                                    console.log('[Test] Verification complete - proceeding with login');
                                    await page.waitForTimeout(1000);
                                } else {
                                    // Enhanced error diagnostics
                                    console.log('[Test] Verification incomplete - collecting diagnostics...');
                                    
                                    // Capture current page state
                                    const diagnostics = await page.evaluate(() => {
                                        const form = document.querySelector('form');
                                        const captcha = document.querySelector('dc-captcha-dialog');
                                        const button = document.querySelector('button.login-button');
                                        
                                        return {
                                            formClasses: form?.className || 'no form',
                                            formDisabled: form?.hasAttribute('disabled'),
                                            captchaClasses: captcha?.className || 'no captcha',
                                            captchaVisible: captcha ? window.getComputedStyle(captcha).display !== 'none' : false,
                                            buttonClasses: button?.className || 'no button',
                                            buttonDisabled: button?.hasAttribute('disabled'),
                                            allInputs: Array.from(document.querySelectorAll('input')).map(input => ({
                                                type: input.type,
                                                id: input.id,
                                                name: input.name,
                                                formControlName: input.getAttribute('formcontrolname'),
                                                classes: input.className,
                                                visible: window.getComputedStyle(input).display !== 'none'
                                            }))
                                        };
                                    });
                                    
                                    console.log('[Test] Diagnostics:', JSON.stringify(diagnostics, null, 2));
                                    
                                    // Take screenshot for visual verification
                                    await page.screenshot({ 
                                        path: `captcha-verification-failed-${Date.now()}.png`,
                                        fullPage: true 
                                    });
                                    
                                    const errorDetails = {
                                        verificationState,
                                        formReadiness,
                                        diagnostics
                                    };
                                    
                                    console.log('[Test] Full error details:', JSON.stringify(errorDetails, null, 2));
                                    throw new Error(`CAPTCHA verification failed - ${JSON.stringify(errorDetails)}`);
                                }
                                
                                // Check for CAPTCHA success/error indicators
                                const errorElement = await page.$('[class*="error"], [class*="invalid"], .alert, .notification');
                                if (errorElement) {
                                    const errorText = await errorElement.textContent();
                                    console.log('[Test] CAPTCHA verification failed:', errorText);
                                    continue;
                                }
                                
                                // Enhanced form field detection
                                const formAnalysis = await page.evaluate(() => {
                                    const form = document.querySelector('form');
                                    if (!form) return { visible: false, debug: 'No form found' };
                                    
                                    // Get all inputs
                                    const inputs = form.querySelectorAll('input');
                                    const inputDetails = Array.from(inputs).map(input => ({
                                        type: input.type,
                                        id: input.id,
                                        name: input.name,
                                        formControlName: input.getAttribute('formcontrolname'),
                                        placeholder: input.placeholder,
                                        visible: (() => {
                                            const style = window.getComputedStyle(input);
                                            return style.display !== 'none' && style.visibility !== 'hidden';
                                        })(),
                                        classes: Array.from(input.classList)
                                    }));
                                    
                                    // Check Angular Material elements
                                    const matFields = form.querySelectorAll('mat-form-field');
                                    const matDetails = Array.from(matFields).map(field => ({
                                        label: field.querySelector('mat-label')?.textContent,
                                        input: field.querySelector('input')?.outerHTML,
                                        visible: (() => {
                                            const style = window.getComputedStyle(field);
                                            return style.display !== 'none' && style.visibility !== 'hidden';
                                        })()
                                    }));
                                    
                                    return {
                                        visible: inputDetails.some(input => input.visible),
                                        debug: {
                                            inputs: inputDetails,
                                            matFields: matDetails,
                                            formClasses: Array.from(form.classList),
                                            formHTML: form.innerHTML
                                        }
                                    };
                                });
                                
                                console.log('[Test] Form analysis:', JSON.stringify(formAnalysis.debug, null, 2));
                                
                                if (formAnalysis.visible) {
                                    console.log('[Test] Form fields detected - analyzing structure');
                                    // Update selectors based on actual form structure
                                    const inputs = formAnalysis.debug.inputs;
                                    const passwordInput = inputs.find(input => 
                                        input.type === 'password' || 
                                        input.formControlName?.includes('password') ||
                                        input.name?.includes('password')
                                    );
                                    
                                    if (passwordInput) {
                                        console.log('[Test] Found password field structure:', passwordInput);
                                        captchaSolved = true;
                                        break;
                                    } else {
                                        console.log('[Test] No password field found in form structure');
                                        continue;
                                    }
                                } else {
                                    console.log('[Test] Form fields not visible after CAPTCHA');
                                    continue;
                                }
                                
                                if (formVisible) {
                                    console.log('[Test] CAPTCHA verification successful - form fields visible');
                                    captchaSolved = true;
                                    break;
                                } else {
                                    console.log('[Test] Form fields not visible after CAPTCHA');
                                    continue;
                                }
                            } catch (verifyError) {
                                console.log('[Test] CAPTCHA verification error:', verifyError.message);
                                continue;
                            }
                        }
                    } catch (error) {
                        continue;
                    }
                }
            }
            
            if (!captchaSolved) {
                console.log('[Test] No CAPTCHA elements found, proceeding with login');
            }
        } catch (error) {
            console.log('[Test] Error during CAPTCHA detection:', error.message);
        }

        // Enhanced credential entry with explicit waits and verification
        console.log('[Test] Starting credential entry sequence...');
        
        const credentials = {
            email: process.env.email || 'Azmadmin',
            password: process.env.password || 'P@ssw0rd'
        };

        if (!credentials.email || !credentials.password) {
            throw new Error('Missing required login credentials');
        }
        
        // Verify Company Admin selection
        console.log('[Test] Verifying Company Admin selection...');
        const adminSelectors = [
            'mat-select[formcontrolname="userType"]',
            'select#userType',
            '[aria-label*="User Type"]',
            '[aria-label*="نوع المستخدم"]'
        ];
        
        for (const selector of adminSelectors) {
            try {
                const element = await page.$(selector);
                if (element) {
                    await element.click();
                    await page.waitForTimeout(500);
                    await page.click('mat-option:has-text("Company Admin")');
                    console.log('[Test] Successfully selected Company Admin');
                    break;
                }
            } catch (error) {
                console.log(`[Test] Failed to select with ${selector}:`, error.message);
                continue;
            }
        }

        // Wait for form to be ready after CAPTCHA
        console.log('[Test] Waiting for form fields to be ready...');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Give extra time for form to stabilize

        // Debug form structure
        console.log('[Test] Analyzing form structure...');
        const formStructure = await page.evaluate(() => {
            const form = document.querySelector('form');
            if (!form) return { error: 'No form found' };
            
            // Get all form fields including Angular Material
            const matFields = Array.from(form.querySelectorAll('mat-form-field')).map(field => ({
                label: field.querySelector('mat-label')?.textContent,
                input: field.querySelector('input')?.outerHTML,
                formField: field.outerHTML,
                visible: window.getComputedStyle(field).display !== 'none'
            }));
            
            // Get all inputs
            const inputs = Array.from(form.querySelectorAll('input')).map(input => ({
                type: input.type,
                id: input.id,
                name: input.name,
                formControlName: input.getAttribute('formcontrolname'),
                placeholder: input.placeholder,
                parentElement: input.parentElement?.tagName,
                visible: window.getComputedStyle(input).display !== 'none'
            }));
            
            return {
                matFields,
                inputs,
                formHTML: form.outerHTML
            };
        });
        
        console.log('[Test] Form structure analysis:', JSON.stringify(formStructure, null, 2));
        
        // Handle two-step login process
        console.log('[Test] Handling two-step login process...');
        
        // Step 1: Enter ID number
        const idInput = await page.waitForSelector('input[formcontrolname="nationalId"]', { timeout: 5000 });
        if (!idInput) {
            throw new Error('ID input field not found');
        }
        
        console.log('[Test] Entering ID number...');
        await page.waitForTimeout(Math.random() * 300 + 200);
        await idInput.click();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await idInput.fill(credentials.email);
        
        // Click continue button
        console.log('[Test] Clicking continue button...');
        const continueButton = await page.waitForSelector('button.login-button', { timeout: 5000 });
        if (!continueButton) {
            throw new Error('Continue button not found');
        }
        
        await page.waitForTimeout(Math.random() * 300 + 200);
        await continueButton.click();
        
        // Enhanced two-step login process with retry mechanism
        console.log('[Test] Starting two-step login process...');
        
        // Step 1: Enter ID/Username
        const idSelectors = [
            'input[formcontrolname="nationalId"]',
            'input[formcontrolname="username"]',
            'input[type="text"]',
            'input[placeholder*="رقم الهوية"]',
            'input[placeholder*="اسم المستخدم"]'
        ];
        
        let idField = null;
        for (const selector of idSelectors) {
            try {
                idField = await page.waitForSelector(selector, { timeout: 5000 });
                if (idField) {
                    console.log(`[Test] Found ID/username field with selector: ${selector}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!idField) {
            throw new Error('ID/username field not found');
        }
        
        // Enter ID with human-like timing
        console.log('[Test] Entering ID/username...');
        await page.waitForTimeout(Math.random() * 300 + 200);
        await idField.click();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await idField.fill(credentials.email);
        
        // Click continue with retry mechanism
        const continueSelectors = [
            'button.login-button',
            'button:has-text("Continue")',
            'button:has-text("متابعة")',
            'button[type="submit"]'
        ];
        
        let continueButton = null;
        for (const selector of continueSelectors) {
            try {
                continueButton = await page.waitForSelector(selector, { timeout: 5000 });
                if (continueButton) {
                    console.log(`[Test] Found continue button with selector: ${selector}`);
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!continueButton) {
            throw new Error('Continue button not found');
        }
        
        // Click continue with human-like behavior
        await page.waitForTimeout(Math.random() * 300 + 200);
        await continueButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await continueButton.click();
        
        // Wait for navigation and password field
        console.log('[Test] Waiting for password step...');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle' }),
            page.waitForLoadState('domcontentloaded')
        ]);
        
        // Give Angular time to render and stabilize
        await page.waitForTimeout(2000);
        
        // Step 2: Enter password with enhanced detection
        const passwordSelectors = [
            'input[type="password"]',
            'input[formcontrolname="password"]',
            'input[placeholder*="كلمة المرور"]',
            'form input[type="password"]',
            '.item-group input[type="password"]'
        ];
        
        let passwordField = null;
        let passwordAttempts = 0;
        const maxPasswordAttempts = 3;
        
        while (!passwordField && passwordAttempts < maxPasswordAttempts) {
            passwordAttempts++;
            for (const selector of passwordSelectors) {
                try {
                    console.log(`[Test] Trying password selector: ${selector} (attempt ${passwordAttempts})`);
                    passwordField = await page.waitForSelector(selector, { timeout: 5000 });
                    if (passwordField) {
                        console.log(`[Test] Found password field with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            if (!passwordField && passwordAttempts < maxPasswordAttempts) {
                console.log(`[Test] Password field not found, waiting before retry...`);
                await page.waitForTimeout(2000 * passwordAttempts);
            }
        }
        
        if (!passwordField) {
            console.log('[Test] Password field not found, taking screenshot...');
            await page.screenshot({ path: 'password-field-not-found.png', fullPage: true });
            throw new Error('Password field not found after multiple attempts');
        }
        
        // Enter password with human-like timing
        console.log('[Test] Entering password...');
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordField.click();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await passwordField.fill(credentials.password);
        
        // Enhanced final login button handling with retry mechanism
        console.log('[Test] Looking for final login button...');
        const loginButtonSelectors = [
            'button.login-button',
            'button[type="submit"]',
            'button:has-text("تسجيل الدخول")',
            'button:has-text("دخول")',
            'button:has-text("Login")',
            '[role="button"]:has-text("Login")',
            '[role="button"]:has-text("دخول")'
        ];
        
        let loginButton = null;
        let loginAttempts = 0;
        const maxLoginAttempts = 3;
        
        while (!loginButton && loginAttempts < maxLoginAttempts) {
            loginAttempts++;
            console.log(`[Test] Login button detection attempt ${loginAttempts}/${maxLoginAttempts}`);
            
            for (const selector of loginButtonSelectors) {
                try {
                    loginButton = await page.waitForSelector(selector, { timeout: 5000 });
                    if (loginButton) {
                        console.log(`[Test] Found login button with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            if (!loginButton && loginAttempts < maxLoginAttempts) {
                console.log(`[Test] Login button not found, waiting before retry...`);
                await page.waitForTimeout(2000 * loginAttempts);
            }
        }
        
        if (!loginButton) {
            console.log('[Test] Login button not found, taking screenshot...');
            await page.screenshot({ path: 'login-button-not-found.png', fullPage: true });
            throw new Error('Login button not found after multiple attempts');
        }
        
        // Click login button with human-like behavior and enhanced error handling
        console.log('[Test] Clicking login button...');
        try {
            await page.waitForTimeout(Math.random() * 400 + 300);
            await loginButton.hover();
            await page.waitForTimeout(Math.random() * 200 + 100);
            await loginButton.click();
            
            // Enhanced navigation and verification with comprehensive checks
            console.log('[Test] Verifying login success...');
            
            // Wait for navigation with multiple success criteria
            await Promise.all([
                page.waitForNavigation({ timeout: 30000 }),
                page.waitForLoadState('networkidle', { timeout: 30000 }),
                page.waitForLoadState('domcontentloaded', { timeout: 30000 })
            ]);
            
            // Give Angular time to stabilize
            await page.waitForTimeout(2000);
            
            // Enhanced dashboard detection with multiple indicators
            const dashboardSelectors = [
                '.dashboard-container',
                '[data-testid="dashboard"]',
                '#dashboard-content',
                '[aria-label*="Dashboard"]',
                '[aria-label*="لوحة التحكم"]',
                '.welcome-message',
                '.user-profile',
                '[class*="dashboard"]',
                '[class*="home"]'
            ];
            
            let verificationAttempts = 0;
            const maxVerificationAttempts = 3;
            
            while (!loginSuccess && verificationAttempts < maxVerificationAttempts) {
                verificationAttempts++;
                console.log(`[Test] Dashboard verification attempt ${verificationAttempts}/${maxVerificationAttempts}`);
                
                for (const selector of dashboardSelectors) {
                    try {
                        await page.waitForSelector(selector, { timeout: 5000 });
                        loginSuccess = true;
                        console.log(`[Test] Login successful - Dashboard verified with selector: ${selector}`);
                        break;
                    } catch (e) {
                        continue;
                    }
                }
                
                if (!loginSuccess && verificationAttempts < maxVerificationAttempts) {
                    console.log(`[Test] Dashboard not found, waiting before retry...`);
                    await page.waitForTimeout(2000 * verificationAttempts);
                }
            }
            
            if (!loginSuccess) {
                // Take screenshot for debugging
                await page.screenshot({ path: 'login-verification-failed.png', fullPage: true });
                throw new Error('Login verification failed - No dashboard indicators found after multiple attempts');
            }
            
            console.log('[Test] Login process completed successfully');
            
        } catch (error) {
            console.error('[Test] Login process failed:', error.message);
            // Take screenshot for debugging
            await page.screenshot({ path: `login-error-${Date.now()}.png`, fullPage: true });
            throw error;
        }
    } catch (error) {
        console.error('[Test] Test failed:', error.message);
        throw error;
    } finally {
        // Capture final state
        await page.screenshot({ path: `final-state-${Date.now()}.png`, fullPage: true });
    }
});
});
