import { test, expect } from '@playwright/test';
import * as tf from '@tensorflow/tfjs-node';
import cv from '@techstark/opencv-js';

test.describe('Login Flow with CAPTCHA Bypass', () => {
  let tfModel: tf.LayersModel;
  
  test.beforeAll(async () => {
    await tf.ready();
    console.log('TensorFlow initialized successfully');
  });

  test.afterAll(async () => {
    if (tfModel) {
      tfModel.dispose();
    }
    tf.dispose();
  });

  test('should handle login flow with CAPTCHA', async ({ page }) => {
    try {
      console.log('Starting login flow test...');
      
      // Navigate to login page
      await page.goto('/login');
      await page.waitForLoadState('networkidle');
      
      // Select Company Login
      const companyLoginSelectors = [
        'text=Company Login',
        '[data-testid="company-login-btn"]',
        'button:has-text("Company Login")'
      ];
      
      for (const selector of companyLoginSelectors) {
        try {
          const button = await page.waitForSelector(selector, { timeout: 5000 });
          if (button) {
            await button.click();
            console.log('Company Login selected successfully');
            break;
          }
        } catch (e) {
          console.log(`Selector ${selector} not found, trying next...`);
        }
      }

      // Handle CAPTCHA
      const captchaFrame = await page.frameLocator('iframe[title*="reCAPTCHA"]').first();
      if (captchaFrame) {
        console.log('CAPTCHA frame detected');
        
        // Click verify button
        await captchaFrame.locator('.recaptcha-checkbox').click();
        
        // Wait for verification
        await page.waitForTimeout(2000);
        
        // Enter credentials using environment variables
        await page.fill('input[type="text"]', process.env.email || '');
        await page.fill('input[type="password"]', process.env.password || '');
        
        // Click login button
        await page.click('button[type="submit"]');
        
        // Wait for navigation
        await page.waitForNavigation();
        
        // Verify successful login
        const dashboardElement = await page.waitForSelector('.dashboard-container', { timeout: 10000 });
        expect(dashboardElement).toBeTruthy();
        
        console.log('Login successful');
      } else {
        console.log('No CAPTCHA frame found');
      }
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});
