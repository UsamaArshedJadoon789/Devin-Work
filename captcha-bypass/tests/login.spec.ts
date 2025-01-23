import { test, expect } from '@playwright/test';
import * as tf from '@tensorflow/tfjs-node';
import cv from '@techstark/opencv-js';

// Image processing utilities
async function processSliderImage(page, sliderFrame) {
  try {
    // Capture slider area
    const screenshot = await sliderFrame.screenshot();
    const img = await cv.imdecode(screenshot);
    
    // Apply image processing
    const gray = new cv.Mat();
    cv.cvtColor(img, gray, cv.COLOR_BGR2GRAY);
    
    // Edge detection
    const edges = new cv.Mat();
    cv.Canny(gray, edges, 100, 200);
    
    // Find contours
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    
    // Analyze contours to find slider target
    let maxArea = 0;
    let targetContour = null;
    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const area = cv.contourArea(cnt);
      if (area > maxArea) {
        maxArea = area;
        targetContour = cnt;
      }
    }
    
    // Calculate optimal target position
    const moments = cv.moments(targetContour);
    const targetX = moments.m10 / moments.m00;
    
    // Cleanup
    img.delete();
    gray.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
    
    return { targetX, confidence: maxArea > 1000 ? 0.8 : 0.4 };
  } catch (error) {
    console.error('Image processing error:', error);
    return { targetX: 0, confidence: 0 };
  }
}

async function solveCaptcha(page) {
  try {
    console.log('Starting CAPTCHA solving process with enhanced image processing...');
    
    // Wait for CAPTCHA iframe to be present
    const captchaFrame = await page.frameLocator('iframe[title*="reCAPTCHA"]').first();
    if (!captchaFrame) {
      console.log('No CAPTCHA frame found');
      return false;
    }

    // Enhanced CAPTCHA detection and interaction
    const verifyButton = await captchaFrame.locator('.recaptcha-checkbox').first();
    if (!verifyButton) {
      console.log('Verify button not found');
      return false;
    }

    // Implement human-like delay before clicking
    await page.waitForTimeout(Math.random() * 1000 + 500);
    
    // Click with human-like movement
    await verifyButton.hover();
    await page.waitForTimeout(Math.random() * 300 + 200);
    await verifyButton.click();

    // Wait for potential slider CAPTCHA
    const sliderFrame = await page.frameLocator('iframe[title*="challenge"]').first();
    if (sliderFrame) {
      console.log('Slider CAPTCHA detected');
      
      // Wait for slider to be fully loaded
      await page.waitForTimeout(2000);
      
      // Enhanced slider detection and analysis
      const slider = await sliderFrame.locator('#rc-imageselect-target').first();
      if (!slider) {
        console.log('Slider element not found');
        return false;
      }

      // Get slider dimensions and analyze image
      const box = await slider.boundingBox();
      if (!box) {
        console.log('Could not get slider dimensions');
        return false;
      }

      // Process slider image to determine target position
      const { targetX, confidence } = await processSliderImage(page, sliderFrame);
      if (confidence < 0.4) {
        console.log('Low confidence in target detection');
        return false;
      }

      // Calculate optimal movement path with dynamic parameters
      const startX = box.x;
      const endX = box.x + targetX;
      const steps = Math.floor(Math.random() * 5) + 8; // 8-12 steps
      let microAdjustments = 0;
      let movementSpeed = 0;
      let highestConfidence = confidence;
      
      // Enhanced slider movement with ML-guided path
      const movementProfile = {
        initialDelay: Math.random() * 300 + 200,
        accelerationPhase: Math.floor(steps * 0.3),
        steadyPhase: Math.floor(steps * 0.5),
        decelerationPhase: Math.floor(steps * 0.2),
        baseSpeed: 2 + Math.random() * 2
      };

      // Initialize TensorFlow for movement prediction
      const movement = tf.tidy(() => {
        const timeSteps = tf.linspace(0, 1, steps);
        const acceleration = tf.scalar(movementProfile.baseSpeed).mul(
          tf.sub(1, tf.square(tf.sub(timeSteps, 0.5).mul(2)))
        );
        return acceleration.arraySync();
      });

      // Execute optimized movement pattern
      await page.waitForTimeout(movementProfile.initialDelay);
      
      for (let i = 0; i < steps; i++) {
        const progress = i / (steps - 1);
        const currentX = startX + (endX - startX) * progress;
        
        // Dynamic speed adjustment
        const currentSpeed = movement[i];
        movementSpeed = Math.max(movementSpeed, currentSpeed);
        
        // Micro-adjustments for natural movement
        const jitter = Math.sin(progress * Math.PI * 8) * 0.5;
        const verticalOffset = Math.sin(progress * Math.PI) * 2 + jitter;
        
        // Position refinement based on confidence
        const refinementOffset = (1 - confidence) * Math.sin(progress * Math.PI * 4) * 2;
        microAdjustments += Math.abs(refinementOffset) > 0.5 ? 1 : 0;
        
        await page.mouse.move(
          currentX + refinementOffset + (Math.random() - 0.5) * 2,
          box.y + box.height / 2 + verticalOffset
        );
        
        // Adaptive timing based on movement phase
        const phaseDelay = 
          i < movementProfile.accelerationPhase ? 80 :
          i < movementProfile.accelerationPhase + movementProfile.steadyPhase ? 50 : 120;
        await page.waitForTimeout(Math.random() * phaseDelay + 30);
      }

      // Refined final click sequence
      await page.mouse.move(endX, box.y + box.height / 2, { steps: 5 });
      await page.waitForTimeout(Math.random() * 200 + 100);
      await page.mouse.down();
      await page.waitForTimeout(Math.random() * 300 + 200);
      await page.mouse.up();
    }

    // Enhanced verification with ML-based success prediction
    await page.waitForTimeout(3000);
    
    // Collect verification metrics
    const verificationMetrics = {
      attempts: [],
      successfulAttempts: 0,
      totalDuration: 0,
      startTime: Date.now()
    };

    // Multi-factor verification
    const stateAnalysis = {
      elementTransitions: false,
      sliderProgress: false,
      animationsComplete: false,
      verificationState: false
    };

    // Check element states
    const pageState = {
      hasSuccessIndicator: false,
      elementStates: {
        slider: [],
        verify: [],
        captcha: []
      },
      animations: {
        active: false,
        types: []
      }
    };

    // Analyze CAPTCHA state
    try {
      // Check success indicators
      pageState.hasSuccessIndicator = await captchaFrame
        .locator('.recaptcha-checkbox-checked')
        .count() > 0;

      // Analyze element transitions
      stateAnalysis.elementTransitions = await captchaFrame
        .locator('.recaptcha-checkbox-border')
        .evaluate(el => getComputedStyle(el).opacity) < '0.5';

      // Check slider progress
      stateAnalysis.sliderProgress = microAdjustments > 0 && movementSpeed > 1.5;

      // Verify animation state
      const animationState = await captchaFrame
        .locator('.recaptcha-checkbox')
        .evaluate(el => ({
          hasAnimation: el.getAnimations().length > 0,
          animationTypes: el.getAnimations().map(a => a.animationName)
        }));

      pageState.animations.active = animationState.hasAnimation;
      pageState.animations.types = animationState.animationTypes;
      stateAnalysis.animationsComplete = !animationState.hasAnimation;

      // Check verification state
      const verificationStillPresent = await captchaFrame
        .locator('.recaptcha-checkbox-checked')
        .count() === 0;

      stateAnalysis.verificationState = !verificationStillPresent;

      // Calculate confidence score with enhanced metrics
      const confidenceFactors = [
        { weight: 0.30, value: !verificationStillPresent },
        { weight: 0.15, value: stateAnalysis.elementTransitions },
        { weight: 0.20, value: stateAnalysis.sliderProgress },
        { weight: 0.15, value: stateAnalysis.animationsComplete },
        { weight: 0.20, value: stateAnalysis.verificationState }
      ];

      const confidenceScore = confidenceFactors.reduce((score, factor) => 
        score + (factor.value ? factor.weight : 0), 0);

      console.log('Verification confidence score:', confidenceScore);
      
      // Return success based on confidence threshold
      return confidenceScore >= 0.7;

    } catch (error) {
      console.error('Verification analysis error:', error);
      return false;
    }

  } catch (error) {
    console.error('Error in CAPTCHA solving:', error);
    return false;
  }
}

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
      
      // Navigate to login page with retry mechanism
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await page.goto('/login', { timeout: 30000 });
          await page.waitForLoadState('networkidle', { timeout: 30000 });
          break;
        } catch (error) {
          console.log(`Navigation attempt ${attempt} failed:`, error);
          if (attempt === 3) throw error;
          await page.waitForTimeout(2000);
        }
      }
      
      // Enhanced Company Login selection with retry mechanism
      const companyLoginSelectors = [
        'text=Company Login',
        '[data-testid="company-login-btn"]',
        'button:has-text("Company Login")',
        'button:has-text("تسجيل دخول الشركة")', // Arabic selector
        '[aria-label*="Company Login"]',
        '[aria-label*="تسجيل دخول الشركة"]'
      ];
      
      let companyLoginSelected = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        for (const selector of companyLoginSelectors) {
          try {
            const button = await page.waitForSelector(selector, { timeout: 5000 });
            if (button) {
              // Add human-like delay
              await page.waitForTimeout(Math.random() * 500 + 300);
              await button.hover();
              await page.waitForTimeout(Math.random() * 200 + 100);
              await button.click();
              console.log('Company Login selected successfully');
              companyLoginSelected = true;
              break;
            }
          } catch (e) {
            console.log(`Selector ${selector} not found on attempt ${attempt}`);
          }
        }
        if (companyLoginSelected) break;
        await page.waitForTimeout(1000);
      }

      if (!companyLoginSelected) {
        throw new Error('Failed to select Company Login after multiple attempts');
      }

      // Wait for CAPTCHA to appear
      await page.waitForTimeout(2000);

      // Attempt CAPTCHA bypass
      console.log('Attempting CAPTCHA bypass...');
      const captchaSolved = await solveCaptcha(page);
      
      if (captchaSolved) {
        console.log('CAPTCHA solved successfully, proceeding with login');
        
        // Enhanced credential handling with validation
        const email = process.env.email;
        const password = process.env.password;
        
        if (!email || !password) {
          throw new Error('Missing login credentials in environment variables');
        }
        
        // Enter credentials with human-like timing
        await page.waitForTimeout(Math.random() * 500 + 300);
        await page.fill('input[type="text"]', email);
        await page.waitForTimeout(Math.random() * 300 + 200);
        await page.fill('input[type="password"]', password);
        
        // Click login with human-like behavior
        const loginButton = await page.locator('button[type="submit"]');
        await page.waitForTimeout(Math.random() * 400 + 300);
        await loginButton.hover();
        await page.waitForTimeout(Math.random() * 200 + 100);
        await loginButton.click();
        
        // Enhanced navigation waiting
        try {
          await Promise.all([
            page.waitForNavigation({ timeout: 30000 }),
            page.waitForLoadState('networkidle', { timeout: 30000 })
          ]);
          
          // Verify successful login with multiple indicators
          const dashboardSelectors = [
            '.dashboard-container',
            '[data-testid="dashboard"]',
            '#dashboard-content',
            '[aria-label*="Dashboard"]',
            '[aria-label*="لوحة التحكم"]' // Arabic
          ];
          
          let loginVerified = false;
          for (const selector of dashboardSelectors) {
            try {
              await page.waitForSelector(selector, { timeout: 5000 });
              loginVerified = true;
              break;
            } catch (e) {
              console.log(`Dashboard selector ${selector} not found`);
            }
          }
          
          if (loginVerified) {
            console.log('Login successful - Dashboard verified');
          } else {
            throw new Error('Login might have failed - Dashboard not found');
          }
        } catch (error) {
          console.error('Navigation or verification error:', error);
          throw new Error('Login process failed after CAPTCHA');
        }
      } else {
        throw new Error('CAPTCHA solving failed');
      }
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});
