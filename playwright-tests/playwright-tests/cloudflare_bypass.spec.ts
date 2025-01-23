import { test, expect } from '@playwright/test';
import { writeFile } from 'fs/promises';

test.describe('Cloudflare Bypass Tests', () => {
    test('should bypass Cloudflare protection', async ({ page }) => {
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

        const MAX_ATTEMPTS = 3;
        let navigationSuccess = false;

        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            try {
                console.log(`Navigation attempt ${attempt + 1}/${MAX_ATTEMPTS}`);
                
                // Clear cookies and cache before each attempt
                await page.context().clearCookies();
                await page.evaluate(() => {
                    localStorage.clear();
                    sessionStorage.clear();
                });
                
                // Pre-navigation delay with jitter (2-5 seconds + attempt-based increase)
                const preNavDelay = Math.floor(2000 + Math.random() * 3000 + (attempt * 1000));
                console.log(`Pre-navigation delay: ${preNavDelay}ms`);
                await page.waitForTimeout(preNavDelay);
                
                // Navigate with extended timeout and human-like behavior
                await Promise.race([
                    page.goto('https://digitalqa.contracts.sa/login', { 
                        waitUntil: 'domcontentloaded',
                        timeout: 60000 + (attempt * 15000)
                    }),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Navigation timeout')), 65000 + (attempt * 15000))
                    )
                ]);
                
                // Post-navigation stabilization delay (3-7 seconds)
                const postNavDelay = Math.floor(3000 + Math.random() * 4000);
                console.log(`Post-navigation stabilization delay: ${postNavDelay}ms`);
                await page.waitForTimeout(postNavDelay);
                
                // Check for Cloudflare challenge
                const content = await page.content();
                if (content.includes('cloudflare') || content.includes('challenge')) {
                    console.log('Cloudflare challenge detected');
                    
                    // Save debug information
                    await page.screenshot({ 
                        path: `cloudflare-challenge-${attempt}.png`,
                        fullPage: true 
                    });
                    await writeFile(`cloudflare-challenge-${attempt}.html`, content);
                    
                    // Extended delay for challenge (5-10 seconds)
                    const challengeDelay = Math.floor(5000 + Math.random() * 5000);
                    console.log(`Waiting ${challengeDelay}ms for challenge...`);
                    await page.waitForTimeout(challengeDelay);
                    
                    // Verify if challenge is still present
                    const newContent = await page.content();
                    if (newContent.includes('cloudflare') || newContent.includes('challenge')) {
                        throw new Error('Still on Cloudflare challenge page');
                    }
                }
                
                // Verify successful navigation
                await Promise.race([
                    page.waitForSelector('button:has-text("الدخول للشركات")', { timeout: 30000 }),
                    page.waitForSelector('[class*="login-container"]', { timeout: 30000 }),
                    page.waitForSelector('form', { timeout: 30000 })
                ]);
                
                // Additional verification of page content
                const finalContent = await page.content();
                if (!finalContent.includes('الدخول للشركات')) {
                    throw new Error('Expected content not found after navigation');
                }
                
                console.log('Successfully bypassed Cloudflare protection');
                navigationSuccess = true;
                break;
                
            } catch (error) {
                console.error(`Attempt ${attempt + 1} failed:`, error);
                
                // Save debug information
                await page.screenshot({ 
                    path: `bypass-failed-${attempt}.png`,
                    fullPage: true 
                });
                
                const debugContent = await page.content();
                await writeFile(`bypass-failed-${attempt}.html`, debugContent);
                
                if (attempt === MAX_ATTEMPTS - 1) {
                    throw new Error(`Failed to bypass Cloudflare after ${MAX_ATTEMPTS} attempts`);
                }
                
                // Exponential backoff with jitter
                const backoffDelay = Math.floor(
                    2000 * Math.pow(2, attempt) * (1 + Math.random() * 0.1)
                );
                console.log(`Waiting ${backoffDelay}ms before next attempt...`);
                await page.waitForTimeout(backoffDelay);
            }
        }
        
        expect(navigationSuccess).toBe(true);
    });
});
