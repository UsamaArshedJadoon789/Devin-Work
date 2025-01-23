import { test, expect } from '@playwright/test';
import axios from 'axios';
import { writeFile } from 'fs/promises';

// Add required DOM types
type RenderingContext = CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;

type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
};

interface CaptchaSolverResponse {
    success: boolean;
    message?: string;
    debug_info?: Record<string, any>;
}

interface VerificationResponse {
    success: boolean;
    error?: string;
}

test.describe('CAPTCHA Tests', () => {
    test('should solve click-to-verify CAPTCHA', async ({ page }) => {
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
            
            // Canvas fingerprint randomization
            const originalGetContext = HTMLCanvasElement.prototype.getContext;
            
            function getContextOverload(this: HTMLCanvasElement, contextId: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
            function getContextOverload(this: HTMLCanvasElement, contextId: 'bitmaprenderer', options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
            function getContextOverload(this: HTMLCanvasElement, contextId: 'webgl', options?: WebGLContextAttributes): WebGLRenderingContext | null;
            function getContextOverload(this: HTMLCanvasElement, contextId: 'webgl2', options?: WebGLContextAttributes): WebGL2RenderingContext | null;
            function getContextOverload(this: HTMLCanvasElement, contextId: string, options?: any): RenderingContext | null {
                const context = originalGetContext.call(this, contextId, options);
                if (context && contextId === '2d') {
                    const ctx = context as CanvasRenderingContext2D;
                    const originalFillText = ctx.fillText.bind(ctx);
                    ctx.fillText = function(text: string, x: number, y: number, maxWidth?: number) {
                        const jitteredX = x + (Math.random() * 0.1 - 0.05);
                        const jitteredY = y + (Math.random() * 0.1 - 0.05);
                        return originalFillText(text, jitteredX, jitteredY, maxWidth);
                    };
                }
                return context;
            }
            
            HTMLCanvasElement.prototype.getContext = getContextOverload;

            // Font fingerprint randomization
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
            CanvasRenderingContext2D.prototype.measureText = function(this: CanvasRenderingContext2D, text: string): TextMetrics {
                const metrics = originalMeasureText.call(this, text);
                const originalWidth = metrics.width;
                Object.defineProperty(metrics, 'width', {
                    get: () => originalWidth + (Math.random() * 0.2 - 0.1)  // Add ±0.1px jitter
                });
                return metrics;
            };
        });

        // Navigate to login page (assuming Cloudflare is already bypassed)
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
        const loginForm = page.locator('form').filter({ 
            has: page.locator('input[formcontrolname="username"]'),
            hasNot: page.locator('form').filter({ hasText: 'اسحب لإكمال اللغز' })
        }).first();

        const usernameField = loginForm.locator('input[formcontrolname="username"]');
        const passwordField = loginForm.locator('input[formcontrolname="password"]');

        // Type username with variable delays
        await usernameField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        for (const char of 'Azmadmin') {
            await usernameField.type(char, { delay: Math.random() * 100 + 50 });
            if (Math.random() < 0.1) {
                await page.waitForTimeout(Math.random() * 300 + 200);
            }
        }

        // Natural delay before password
        await page.waitForTimeout(Math.random() * 700 + 800);

        // Type password with variable delays
        await passwordField.click();
        await page.waitForTimeout(Math.random() * 300 + 200);
        for (const char of 'P@ssw0rd') {
            await passwordField.type(char, { delay: Math.random() * 150 + 50 });
            if (Math.random() < 0.15) {
                await page.waitForTimeout(Math.random() * 400 + 200);
            }
        }

        // Submit form
        const submitButton = loginForm.locator('button.login-button');
        await page.waitForTimeout(Math.random() * 1000 + 1000);
        await submitButton.click();

        // Wait for CAPTCHA with multiple selectors
        const captchaElement = await Promise.race([
            page.waitForSelector('.captcha-container', { timeout: 10000 }),
            page.waitForSelector('dc-captcha-dialog', { timeout: 10000 }),
            page.waitForSelector('[class*="captcha-dialog"]', { timeout: 10000 })
        ]);

        if (!captchaElement) {
            throw new Error('CAPTCHA element not found');
        }

        // Take screenshot for verification
        const screenshotBuffer = await captchaElement.screenshot();
        const imageB64 = screenshotBuffer.toString('base64');

        // Send to verification service
        console.log('Sending CAPTCHA verification request...');
        const response: ApiResponse<CaptchaSolverResponse> = await axios.post('http://127.0.0.1:5000/solve_captcha', {
            image: imageB64,
            debug: true,
            timestamp: Date.now()
        });

        expect(response.data.success).toBe(true);

        // Click verification with human-like behavior
        const box = await captchaElement.boundingBox();
        if (!box) {
            throw new Error('Could not get verification button position');
        }

        // Move to button with slight randomization
        await page.mouse.move(
            box.x + box.width / 2 + Math.random() * 2 - 1,
            box.y + box.height / 2 + Math.random() * 2 - 1
        );
        await page.waitForTimeout(Math.random() * 200 + 100);

        // Click with natural delay
        await captchaElement.click();

        // Wait for verification with enhanced state handling
        await Promise.race([
            page.waitForTimeout(5000),
            page.waitForSelector('[class*="success"]', { timeout: 5000 }),
            page.waitForSelector('[class*="verified"]', { timeout: 5000 })
        ]);

        // Verify success
        const verificationResponse: ApiResponse<VerificationResponse> = await axios.post('http://127.0.0.1:5000/verify_solution', {
            image: (await captchaElement.screenshot()).toString('base64')
        });

        expect(verificationResponse.data.success).toBe(true);
    });
});
