import { test, expect, Locator } from '@playwright/test';
import axios from 'axios';
import { writeFile } from 'fs/promises';

test('Login with CAPTCHA bypass', async ({ page }) => {
    // Define constants at the top
    const MAX_NAVIGATION_ATTEMPTS = 3;
    const MAX_FORM_SUBMIT_ATTEMPTS = 3;
    const MAX_CAPTCHA_ATTEMPTS = 3;
    
    try {
        console.log('Starting login test...');
        
        // Enhanced stealth configuration
        await page.addInitScript(() => {
            // Define Chrome interface
            interface Chrome {
                runtime: Record<string, unknown>;
                loadTimes(): void;
                csi(): void;
                app: Record<string, unknown>;
            }
            
            // Define custom window interface
            interface CustomWindow extends Window {
                chrome?: Chrome;
            }
            
            // Cast window to custom interface
            const customWindow = window as CustomWindow;
            
            // Overwrite navigator properties
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
            
            // Mock plugins array with proper typing
            interface PluginMock {
                name: string;
                filename: string;
            }
            
            const mockPlugins: PluginMock[] = [
                { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer' },
                { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai' },
                { name: 'Native Client', filename: 'internal-nacl-plugin' }
            ];
            
            Object.defineProperty(navigator, 'plugins', {
                get: () => mockPlugins
            });
            
            // Mock web GL with proper typing
            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter: number): any {
                if (parameter === 37445) return 'Intel Open Source Technology Center';
                if (parameter === 37446) return 'Mesa DRI Intel(R) HD Graphics (Skylake GT2)';
                return getParameter.apply(this, [parameter]);
            };
            
            // Add chrome runtime with proper typing
            customWindow.chrome = {
                runtime: {},
                loadTimes: () => {},
                csi: () => {},
                app: {}
            };
            
            // Spoof screen resolution with proper typing
            const screenProps = {
                width: 1920,
                height: 1080,
                availWidth: 1920,
                availHeight: 1080,
                colorDepth: 24,
                pixelDepth: 24
            };
            
            Object.entries(screenProps).forEach(([key, value]) => {
                Object.defineProperty(window.screen, key, { get: () => value });
            });

            // Canvas fingerprint randomization
            const originalGetContext = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(type: string, ...args: any[]) {
                const context = originalGetContext.apply(this, [type, ...args]);
                if (context && type === '2d') {
                    const originalFillText = context.fillText;
                    context.fillText = function(...args: any[]) {
                        args[1] += Math.random() * 0.1 - 0.05;  // Add slight position jitter
                        args[2] += Math.random() * 0.1 - 0.05;
                        return originalFillText.apply(this, args);
                    };
                }
                return context;
            };

            // Font fingerprint randomization
            const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia'];
            Object.defineProperty(document, 'fonts', {
                get: () => ({
                    ready: Promise.resolve(),
                    check: () => true,
                    load: () => Promise.resolve([]),
                    forEach: () => {},
                    entries: () => [],
                    keys: () => [],
                    values: () => [],
                    [Symbol.iterator]: () => ({
                        next: () => ({ done: true, value: undefined })
                    })
                })
            });
            
            // Text metrics randomization
            const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
            CanvasRenderingContext2D.prototype.measureText = function(text: string) {
                const metrics = originalMeasureText.apply(this, [text]);
                const originalWidth = metrics.width;
                Object.defineProperty(metrics, 'width', {
                    get: () => originalWidth + (Math.random() * 0.2 - 0.1)  // Add ±0.1px jitter
                });
                return metrics;
            };
        });
        
        // Initialize login form locator that will be reused throughout the test
        const loginForm = page.locator('form').filter({ 
            has: page.locator('input[formcontrolname="username"]'),
            hasNot: page.locator('form').filter({ hasText: 'اسحب لإكمال اللغز' })
        }).first();
        
        // 1. Navigate to login page with enhanced wait conditions and verification
        const maxNavigationAttempts = 3;
        let navigationSuccess = false;
        
        for (let attempt = 0; attempt < MAX_NAVIGATION_ATTEMPTS; attempt++) {
            try {
                console.log(`Navigation attempt ${attempt + 1}/${MAX_NAVIGATION_ATTEMPTS}`);
                
                // Clear any existing state
                await page.context().clearCookies();
                
                // Enhanced navigation with retry mechanism
                let navigationSuccess = false;
                
                for (let navAttempt = 0; navAttempt < MAX_NAVIGATION_ATTEMPTS; navAttempt++) {
                    try {
                        console.log(`Navigation attempt ${navAttempt + 1}/${MAX_NAVIGATION_ATTEMPTS}`);
                        
                        // Clear cookies and cache before each attempt
                        await page.context().clearCookies();
                        await page.evaluate(() => {
                            localStorage.clear();
                            sessionStorage.clear();
                        });
                        
                        // Pre-navigation delay with jitter (2-5 seconds + attempt-based increase)
                        const preNavDelay = Math.floor(2000 + Math.random() * 3000);
                        console.log(`Pre-navigation delay: ${preNavDelay}ms`);
                        await page.waitForTimeout(preNavDelay);
                        
                        // Navigate with extended timeout and human-like behavior
                        await Promise.race([
                            page.goto('https://digitalqa.contracts.sa/login', { 
                                waitUntil: 'domcontentloaded',
                                timeout: 60000 + (navAttempt * 15000)
                            }),
                            // Fallback timeout
                            new Promise((_, reject) => 
                                setTimeout(() => reject(new Error('Navigation timeout')), 65000 + (navAttempt * 15000))
                            )
                        ]);
                        
                        // Post-navigation stabilization delay (3-7 seconds)
                        const postNavDelay = Math.floor(3000 + Math.random() * 4000);
                        console.log(`Post-navigation stabilization delay: ${postNavDelay}ms`);
                        await page.waitForTimeout(postNavDelay);
                        
                        // Additional delay if Cloudflare challenge is detected
                        const content = await page.content();
                        if (content.includes('cloudflare') || content.includes('challenge')) {
                            const challengeDelay = Math.floor(5000 + Math.random() * 5000);
                            console.log(`Cloudflare challenge detected, waiting ${challengeDelay}ms`);
                            await page.waitForTimeout(challengeDelay);
                        }
                        
                        // Additional delay after navigation with jitter
                        const postDelay = Math.random() * 3000 + 2000 + (navAttempt * 1000);
                        console.log(`Waiting ${postDelay.toFixed(0)}ms after navigation...`);
                        await page.waitForTimeout(postDelay);
                        
                        // Verify page load state
                        const readyState = await page.evaluate(() => document.readyState);
                        console.log(`Page ready state: ${readyState}`);
                        
                        if (readyState !== 'complete') {
                            throw new Error('Page not fully loaded');
                        }
                        
                        // Additional verification of page content
                        const content = await page.content();
                        if (!content.includes('الدخول للشركات')) {
                            throw new Error('Expected content not found');
                        }
                        
                        // Save debug information
                        await page.screenshot({ 
                            path: `navigation-success-${navAttempt}.png`,
                            fullPage: true 
                        });
                        
                        navigationSuccess = true;
                        console.log('Navigation successful');
                        break;
                        
                    } catch (error) {
                        console.error(`Navigation attempt ${navAttempt + 1} failed:`, error);
                        
                        // Save debug information
                        await page.screenshot({ 
                            path: `navigation-failed-${navAttempt}.png`,
                            fullPage: true 
                        }).catch(() => {});
                        
                        const debugContent = await page.content();
                        await writeFile(`navigation-failed-${navAttempt}.html`, debugContent)
                            .catch(() => {});
                        
                        if (navAttempt === maxNavigationAttempts - 1) {
                            throw new Error(`All navigation attempts failed: ${error.message}`);
                        }
                        
                        // Exponential backoff with jitter
                        const backoffDelay = Math.floor(
                            2000 * Math.pow(2, navAttempt) * (1 + Math.random() * 0.1)
                        );
                        console.log(`Waiting ${backoffDelay}ms before next attempt...`);
                        await page.waitForTimeout(backoffDelay);
                    }
                }
                
                if (!navigationSuccess) {
                    throw new Error('Failed to navigate after all attempts');
                }
                
                // Initial delay for Cloudflare
                await page.waitForTimeout(5000);
                
                // Wait for critical elements with multiple conditions
                await Promise.race([
                    page.waitForSelector('button:has-text("الدخول للشركات")', { 
                        state: 'visible',
                        timeout: 45000 
                    }),
                    page.waitForSelector('[class*="login-container"]', {
                        state: 'visible',
                        timeout: 45000
                    }),
                    page.waitForSelector('form', {
                        state: 'visible',
                        timeout: 45000
                    })
                ]);
                
                // Verify page load state
                const readyState = await page.evaluate(() => document.readyState);
                console.log(`Page ready state: ${readyState}`);
                
                if (readyState !== 'complete') {
                    throw new Error('Page not fully loaded');
                }
                
                // Additional verification of page content
                const content = await page.content();
                if (!content.includes('الدخول للشركات')) {
                    throw new Error('Expected content not found');
                }
                
                navigationSuccess = true;
                console.log('Navigation successful with verified page content');
                break;
                
            } catch (error) {
                console.error(`Navigation attempt ${attempt + 1} failed:`, error);
                
                // Save debug information
                await page.screenshot({ 
                    path: `navigation-debug-${attempt}.png`,
                    fullPage: true 
                });
                
                const debugContent = await page.content();
                await writeFile(`navigation-debug-${attempt}.html`, debugContent);
                
                if (attempt === maxNavigationAttempts - 1) {
                    throw new Error(`All navigation attempts failed: ${error.message}`);
                }
                
                // Exponential backoff with jitter
                const delay = Math.floor(2000 * Math.pow(2, attempt) * (1 + Math.random() * 0.1));
                console.log(`Waiting ${delay}ms before next attempt...`);
                await page.waitForTimeout(delay);
            }
        }
        
        if (!navigationSuccess) {
            throw new Error('Failed to navigate to login page after all attempts');
        }
        
        // Extended stabilization delay with network idle check
        await Promise.race([
            page.waitForLoadState('networkidle', { timeout: 30000 }),
            page.waitForTimeout(5000)
        ]);
    
        // 2. Click "Company Login" with retry mechanism
        const companyLoginButton = page.locator('button:has-text("الدخول للشركات")');
        await companyLoginButton.waitFor({ state: 'visible', timeout: 10000 });
        await companyLoginButton.click();
    
        // Wait for login form to be ready
        const usernameField = loginForm.locator('input[formcontrolname="username"]');
        await usernameField.waitFor({ state: 'visible', timeout: 10000 });
        
        // 3. Enter credentials with enhanced human-like delays and typing patterns
        // Clear fields with natural timing
        await usernameField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await usernameField.clear();
        await page.waitForTimeout(Math.random() * 200 + 100);
        
        // Type username with variable delays between characters
        for (const char of 'Azmadmin') {
            await usernameField.type(char, { delay: Math.random() * 100 + 50 });
            // Occasional longer pause (10% chance)
            if (Math.random() < 0.1) {
                await page.waitForTimeout(Math.random() * 300 + 200);
            }
        }
        
        // Natural delay before moving to password field (800-1500ms)
        await page.waitForTimeout(Math.random() * 700 + 800);
        
        // Click and clear password field
        await passwordField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        await passwordField.clear();
        await page.waitForTimeout(Math.random() * 200 + 100);
        
        // Type password with variable delays
        for (const char of 'P@ssw0rd') {
            await passwordField.type(char, { delay: Math.random() * 150 + 50 });
            // Occasional longer pause (15% chance)
            if (Math.random() < 0.15) {
                await page.waitForTimeout(Math.random() * 400 + 200);
            }
        }
        
        // Natural delay after completing credentials (1000-2000ms)
        await page.waitForTimeout(Math.random() * 1000 + 1000);
    
        // 4. Click login with enhanced navigation handling
        const submitButton = loginForm.locator('button.login-button');
        await submitButton.click();
        
        // Wait for navigation with multiple success conditions
        try {
            await Promise.race([
                page.waitForNavigation({ 
                    waitUntil: 'networkidle',
                    timeout: 45000 
                }),
                page.waitForSelector('dc-captcha-dialog', { 
                    state: 'visible',
                    timeout: 45000 
                }),
                page.waitForSelector('[class*="captcha-dialog"]', {
                    state: 'visible',
                    timeout: 45000
                })
            ]);
            
            // Additional wait for page stabilization
            await page.waitForTimeout(2000);
            
        } catch (error) {
            console.error('Navigation error:', error);
            // Take debug screenshot
            await page.screenshot({ path: 'debug-navigation.png' });
            // Save page source for debugging
            const html = await page.content();
            await writeFile('debug-navigation.html', html);
            throw new Error(`Navigation failed: ${error.message}`);
        }
    
        // 5. Wait for and locate CAPTCHA element
        console.log('Looking for CAPTCHA element...');
        
        // Wait for CAPTCHA container
        const captchaElement = await page.waitForSelector('.captcha-container', {
            state: 'visible',
            timeout: 10000
        });
        
        if (!captchaElement) {
            throw new Error('CAPTCHA element not found');
        }
        
        console.log('CAPTCHA element found');

        // Find the click-to-verify CAPTCHA element
        console.log('Looking for click-to-verify CAPTCHA...');

        // Take screenshot for verification
        console.log('Taking CAPTCHA screenshot...');

        // 6. Capture CAPTCHA area for verification
        const screenshotBuffer = await captchaElement.screenshot();
        const imageB64 = screenshotBuffer.toString('base64');
    
        // 7. Send screenshot to Python microservice for verification
        let response;
        try {
            console.log('Sending CAPTCHA verification request...');
            
            // Save screenshot for debugging
            const debugPath = `debug-captcha-${Date.now()}.png`;
            await captchaElement.screenshot({ path: debugPath });
            console.log(`Saved debug screenshot to: ${debugPath}`);
            
            response = await axios.post('http://127.0.0.1:5000/solve_captcha', {
                image: imageB64,
                debug: true,
                timestamp: Date.now()
            });
            console.log('Verification response:', JSON.stringify(response.data, null, 2));
            
            if (!response.data.success) {
                throw new Error('CAPTCHA verification failed');
            }
            console.log('CAPTCHA verification successful');
            
        } catch (err) {
            console.error('Microservice error:', err);
            throw new Error(`Failed to verify CAPTCHA: ${err.message}`);
        }
    
        // 8. Click the verification button with human-like behavior
        const box = await captchaElement.boundingBox();
        if (!box) {
            throw new Error('Could not get verification button position');
        }
        
        // Enhanced human-like mouse movement
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        
        // Generate natural curve points for mouse movement
        const points = [];
        const steps = Math.floor(Math.random() * 5) + 8; // 8-12 points
        for (let i = 0; i < steps; i++) {
            const progress = i / (steps - 1);
            const deviation = Math.sin(progress * Math.PI) * (Math.random() * 10 + 5);
            points.push({
                x: startX + deviation + (Math.random() * 4 - 2),
                y: startY + deviation + (Math.random() * 4 - 2)
            });
        }
        
        // Execute mouse movement with natural timing
        for (const point of points) {
            await page.mouse.move(point.x, point.y);
            // Variable delay between movements (20-50ms)
            await page.waitForTimeout(Math.random() * 30 + 20);
        }
        
        // Hover delay before click (300-800ms)
        await page.waitForTimeout(Math.random() * 500 + 300);
        
        // Click with natural delay and slight position adjustment
        const finalX = startX + (Math.random() * 2 - 1);
        const finalY = startY + (Math.random() * 2 - 1);
        await page.mouse.move(finalX, finalY);
        await page.waitForTimeout(Math.random() * 100 + 50);
        await captchaElement.click();
        
        // Wait for verification with enhanced state handling
        await Promise.race([
            page.waitForTimeout(5000),
            page.waitForSelector('[class*="success"]', { timeout: 5000 }).catch(() => null),
            page.waitForSelector('[class*="verified"]', { timeout: 5000 }).catch(() => null)
        ]);
    
        // 9. Enhanced verification with multiple success indicators and browser state handling
        try {
            // Ensure page is still active and wait for any animations
            await page.evaluate(() => document.readyState);
            await page.waitForTimeout(1000);

            // Simple verification check with microservice response
            if (response.data.success) {
                console.log('CAPTCHA verification successful');
                
                // Enhanced submit after CAPTCHA verification
                console.log('Preparing for form submission...');
                await page.waitForTimeout(2000);

                // Ensure we're still on the login page
                const currentUrl = page.url();
                console.log('Current URL before submit:', currentUrl);

                // Enhanced form submission with Arabic support
                console.log('Submitting form...');
                try {
                    // Enhanced form submission using direct JavaScript execution
                    console.log('Preparing form submission...');
                    
                    // Wait for CAPTCHA overlay animations to complete
                    await page.waitForTimeout(2000);
                    
                    // Submit form using Angular-aware approach
                    const submitted = await page.evaluate(() => {
                        try {
                            // Find the login form
                            const form = Array.from(document.querySelectorAll('form'))
                                .find(f => {
                                    const hasUsername = f.querySelector('input[formcontrolname="username"]') !== null;
                                    const text = f.textContent || '';
                                    const isCaptchaForm = text.includes('اسحب لإكمال اللغز');
                                    return hasUsername && !isCaptchaForm;
                                });
                            
                            if (!form) {
                                console.error('Login form not found');
                                return false;
                            }

                            // Force remove overlay with proper typing
                            const overlays = document.querySelectorAll('.cdk-overlay-backdrop, .cdk-overlay-container');
                            overlays.forEach(overlay => {
                                if (overlay instanceof HTMLElement) {
                                    overlay.style.display = 'none';
                                    overlay.style.visibility = 'hidden';
                                    overlay.style.opacity = '0';
                                    overlay.style.pointerEvents = 'none';
                                }
                                overlay.remove();
                            });

                            // Clear any remaining modal classes from body
                            document.body.classList.remove('modal-open');
                            if (document.body instanceof HTMLElement) {
                                document.body.style.overflow = '';
                                document.body.style.paddingRight = '';
                            }

                            // Find and prepare submit button
                            const submitButton = form.querySelector('button[type="submit"], button.login-button');
                            if (!(submitButton instanceof HTMLElement)) {
                                console.error('Submit button not found or invalid');
                                return false;
                            }

                            // Ensure form is ready for submission
                            const formNgModel = (window as any).ng?.getComponent(form);
                            if (formNgModel) {
                                // Try to mark form as touched/dirty
                                try {
                                    formNgModel.markAsTouched();
                                    formNgModel.markAsDirty();
                                } catch (e) {
                                    console.warn('Could not mark form as touched/dirty:', e);
                                }
                            }

                            // Create and dispatch click events
                            const clickEvent = new MouseEvent('click', {
                                view: window,
                                bubbles: true,
                                cancelable: true,
                                buttons: 1
                            });
                            submitButton.dispatchEvent(clickEvent);

                            // Also try native form submission
                            if (form instanceof HTMLFormElement) {
                                try {
                                    const submitEvent = new Event('submit', {
                                        bubbles: true,
                                        cancelable: true
                                    });
                                    form.dispatchEvent(submitEvent);
                                    form.submit();
                                } catch (e) {
                                    console.warn('Native form submission failed:', e);
                                }
                            }

                            return true;
                        } catch (error) {
                            console.error('Error submitting form:', error);
                            return false;
                        }
                    });
                    
                    if (!submitted) {
                        throw new Error('Failed to submit form via JavaScript');
                    }
                    
                    console.log('Form submitted via JavaScript');
                    
                    // Find and prepare form
                    const formSubmitted = await page.evaluate(() => {
                        // Find the login form with TypeScript safety
                        const form = Array.from(document.querySelectorAll('form'))
                            .find(f => {
                                const hasUsername = f.querySelector('input[formcontrolname="username"]') !== null;
                                const text = f.textContent || '';
                                const isCaptchaForm = text.includes('اسحب لإكمال اللغز');
                                return hasUsername && !isCaptchaForm;
                            });
                            
                        if (form) {
                            // Update Angular form state
                            const inputs = form.querySelectorAll('input');
                            inputs.forEach(input => {
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                                input.dispatchEvent(new Event('change', { bubbles: true }));
                            });
                            
                            // Find submit button
                            const submitButton = form.querySelector('button[type="submit"], button.login-button');
                            if (submitButton) {
                                return true;
                            }
                        }
                        return false;
                    });
                    
                    if (!formSubmitted) {
                        throw new Error('Failed to find and prepare form for submission');
                    }
                    
                    // Wait for navigation or success indicators
                    console.log('Waiting for navigation...');
                    
                    await Promise.race([
                        page.waitForNavigation({ timeout: 30000 }),
                        page.waitForURL('**/dashboard**', { timeout: 30000 }),
                        page.waitForURL('**/home**', { timeout: 30000 }),
                        page.waitForSelector('.dashboard-container', { timeout: 30000 }),
                        page.waitForSelector('#main-content', { timeout: 30000 }),
                        page.getByText('لوحة التحكم', { exact: false }).waitFor({ timeout: 30000 }),
                        page.getByText('الرئيسية', { exact: false }).waitFor({ timeout: 30000 })
                    ]).catch(error => {
                        console.log('Navigation timeout, checking other indicators...');
                    });
                    
                    // Enhanced navigation handling with multiple success conditions
                    console.log('Waiting for navigation...');
                    try {
                        await Promise.race([
                            page.waitForNavigation({ 
                                timeout: 30000,
                                waitUntil: 'networkidle'
                            }),
                            page.waitForURL('**/dashboard**', { timeout: 30000 }),
                            page.waitForURL('**/home**', { timeout: 30000 }),
                            page.waitForSelector('.dashboard-container', { timeout: 30000 }),
                            page.waitForSelector('#main-content', { timeout: 30000 }),
                            page.getByText('لوحة التحكم', { exact: false }).waitFor({ timeout: 30000 }),
                            page.getByText('الرئيسية', { exact: false }).waitFor({ timeout: 30000 })
                        ]);
                        
                        // Additional wait for any pending operations
                        await page.waitForTimeout(2000);
                        
                        // Verify we're not still on login page
                        const currentUrl = page.url();
                        if (currentUrl.includes('/login')) {
                            throw new Error('Still on login page after form submission');
                        }
                        
                        console.log('Navigation successful');
                    } catch (error) {
                        console.log('Navigation error:', error);
                        // Take debug screenshot
                        await page.screenshot({ path: 'navigation-failed.png', fullPage: true });
                        throw error;
                    }
                    
                    // Additional wait for client-side processing
                    await page.waitForTimeout(2000);

                    // Enhanced verification after form submission
                    console.log('Verifying form submission...');
                    
                    // Wait for loading indicators to appear and disappear
                    const loadingSelectors = [
                        '[class*="loading"]',
                        '[class*="spinner"]',
                        '[class*="progress"]'
                    ];
                    
                    // Wait for any loading indicator to appear
                    await Promise.race([
                        ...loadingSelectors.map(selector => 
                            page.waitForSelector(selector, { state: 'visible', timeout: 5000 })
                                .catch(() => null)
                        ),
                        page.waitForTimeout(1000)
                    ]);
                    
                    // Wait for loading indicators to disappear
                    await Promise.all(
                        loadingSelectors.map(selector =>
                            page.waitForSelector(selector, { state: 'hidden', timeout: 30000 })
                                .catch(() => null)
                        )
                    );
                    
                    // Wait for navigation with multiple success conditions
                    await Promise.race([
                        // URL-based checks
                        page.waitForURL('**/dashboard**', { timeout: 30000 })
                            .catch(() => null),
                        page.waitForURL('**/home**', { timeout: 30000 })
                            .catch(() => null),
                        
                        // Content-based checks
                        page.waitForSelector('.dashboard-container', { timeout: 30000 })
                            .catch(() => null),
                        page.waitForSelector('#main-content', { timeout: 30000 })
                            .catch(() => null),
                        
                        // Arabic text checks
                        page.getByText('لوحة التحكم', { exact: false })
                            .waitFor({ timeout: 30000 })
                            .catch(() => null),
                        page.getByText('الرئيسية', { exact: false })
                            .waitFor({ timeout: 30000 })
                            .catch(() => null)
                    ]);
                    
                    // Save debug info if still on login page
                    if (page.url().includes('/login')) {
                        console.log('Still on login page, saving debug info...');
                        await page.screenshot({ path: 'login-state.png', fullPage: true });
                        const html = await page.content();
                        await writeFile('login-state.html', html);
                        throw new Error('Failed to navigate away from login page');
                    }

                } catch (e) {
                    console.error('Form submission error:', e);
                    // Take debug screenshot
                    await page.screenshot({ path: 'submit-failed.png', fullPage: true });
                    throw new Error(`Form submission failed: ${e.message}`);
                }
            } else {
                throw new Error('CAPTCHA verification failed');
            }

        } catch (err) {
            console.error('Verification error:', err);
            throw new Error(`Failed to verify CAPTCHA solution: ${err.message}`);
        }
    
        // 10. Enhanced navigation verification with Arabic support
        console.log('Verifying login success...');
        
        // Wait for any redirects and page load
        await Promise.race([
            page.waitForLoadState('networkidle', { timeout: 30000 }),
            page.waitForTimeout(5000)
        ]).catch(e => console.log('Navigation wait completed with:', e));

        // Multiple verification attempts with Arabic text support
        let isSuccess = false;
        const successIndicators = [
            // URLs
            { type: 'url', value: '/dashboard' },
            { type: 'url', value: '/home' },
            // Arabic text
            { type: 'text', value: 'لوحة التحكم' },  // Dashboard
            { type: 'text', value: 'الرئيسية' },     // Home
            { type: 'text', value: 'تسجيل خروج' },   // Logout button
            // Elements
            { type: 'selector', value: '.dashboard-container' },
            { type: 'selector', value: '#main-content' },
            { type: 'selector', value: '[class*="dashboard"]' }
        ];

        console.log('Checking success indicators...');
        
        for (const indicator of successIndicators) {
            try {
                switch (indicator.type) {
                    case 'url':
                        if (page.url().includes(indicator.value)) {
                            console.log(`Success: URL contains ${indicator.value}`);
                            isSuccess = true;
                        }
                        break;
                    case 'text':
                        const hasText = await page.getByText(indicator.value, { exact: false }).isVisible()
                            .catch(() => false);
                        if (hasText) {
                            console.log(`Success: Found text "${indicator.value}"`);
                            isSuccess = true;
                        }
                        break;
                    case 'selector':
                        const hasElement = await page.locator(indicator.value).isVisible()
                            .catch(() => false);
                        if (hasElement) {
                            console.log(`Success: Found element "${indicator.value}"`);
                            isSuccess = true;
                        }
                        break;
                }
                if (isSuccess) break;
            } catch (e) {
                console.log(`Check failed for ${indicator.type} "${indicator.value}":`, e);
            }
        }

        // Final verification
        if (!isSuccess) {
            console.log('Taking debug screenshot...');
            await page.screenshot({ path: 'login-failed.png', fullPage: true });
            console.log('Saving page content...');
            await page.content().then(content => 
                require('fs').writeFileSync('login-failed.html', content)
            );
            throw new Error('Login verification failed - no success indicators found');
        }
        
        console.log('Login verification successful');
    } catch (error) {
        console.error('Test failed:', error);
        throw error;
    }
});
