import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { errorTracker } from './error-tracking.js';
import { CONFIG } from './config.js';

// Session data store
const sessions = new SharedArray('sessions', function() { return [{}]; });

export const options = {
  // Reduce load for Cloudflare compatibility
  scenarios: {
    smoke_test: {
      executor: 'constant-vus',
      vus: 1,
      duration: '30s',
      gracefulStop: '30s',
    },
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 5 },    // Gentle ramp up
        { duration: '3m', target: 5 },    // Maintain moderate load
        { duration: '1m', target: 0 },    // Ramp down
      ],
      gracefulStop: '30s',
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<5000'],    // 95% of requests should be below 5s
    http_req_failed: ['rate<0.1'],        // Less than 10% of requests should fail
    errors: ['rate<0.1'],                 // Custom error rate should be below 10%
  },
  // Add proper headers and cookies handling
  cookies: {
    secure: true,
    sameSite: 'Strict'
  }
};

// Test data generators for boundary and invalid cases
const generateTestData = {
  // Boundary values for Commercial Registry
  commercialRegistry: {
    valid: () => Math.floor(1000000000 + Math.random() * 9000000000),
    tooShort: () => Math.floor(100000 + Math.random() * 900000),
    tooLong: () => '1'.repeat(20),
    invalid: () => 'ABC12345',
  },
  // Boundary values for Expiry Date
  expiryDate: {
    valid: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date.toISOString().split('T')[0];
    },
    past: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      return date.toISOString().split('T')[0];
    },
    tooFarFuture: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 100);
      return date.toISOString().split('T')[0];
    },
    invalid: () => 'not-a-date',
  }
};

// Test scenarios
const testScenarios = {
  valid: () => ({
    commercialRegistry: generateTestData.commercialRegistry.valid(),
    expiryDate: generateTestData.expiryDate.valid()
  }),
  invalidRegistry: () => ({
    commercialRegistry: generateTestData.commercialRegistry.invalid(),
    expiryDate: generateTestData.expiryDate.valid()
  }),
  invalidDate: () => ({
    commercialRegistry: generateTestData.commercialRegistry.valid(),
    expiryDate: generateTestData.expiryDate.invalid()
  }),
  boundaryRegistry: () => ({
    commercialRegistry: Math.random() > 0.5 ? 
      generateTestData.commercialRegistry.tooShort() : 
      generateTestData.commercialRegistry.tooLong(),
    expiryDate: generateTestData.expiryDate.valid()
  }),
  boundaryDate: () => ({
    commercialRegistry: generateTestData.commercialRegistry.valid(),
    expiryDate: Math.random() > 0.5 ? 
      generateTestData.expiryDate.past() : 
      generateTestData.expiryDate.tooFarFuture()
  }),
  malformedRequest: () => ({
    commercialRegistry: Math.random() > 0.5 ? undefined : null,
    expiryDate: Math.random() > 0.5 ? undefined : null
  })
};

// Base URL for all requests
const BASE_URL = 'https://sandbox.uapi.sa';

export function setup() {
  // Perform any setup tasks if needed
  return {};
}

export default function () {
  // Select test scenario randomly but weighted towards valid cases
  const scenarioType = Math.random() < 0.7 ? 'valid' : 
    ['invalidRegistry', 'invalidDate', 'boundaryRegistry', 'boundaryDate', 'malformedRequest'][Math.floor(Math.random() * 5)];
  
  const testData = testScenarios[scenarioType]();
  
  // Add random delay between requests (Cloudflare friendly)
  sleep(Math.random() * 3 + 2);

  // Track test execution
  const testContext = {
    scenario: scenarioType,
    startTime: Date.now(),
    sessionId: __VU ? `vu_${__VU}` : 'default'
  };

  // Visit signup page with realistic browser behavior
  let signupResponse = http.get(`${BASE_URL}/signup`, {
    tags: { name: 'signup_page' },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0'
    }
  });

  check(signupResponse, {
    'signup page loaded': (r) => r.status === 200,
    'signup page contains form': (r) => r.body.includes('form'),
  }) || errorRate.add(1);

  // Add random think time to simulate user reading the page
  sleep(Math.random() * 5 + 2);

  // Simulate realistic form filling behavior with selected test scenario
  sleep(Math.random() * 2 + 1); // Time to start typing

  const payload = new FormData();
  
  // Use test scenario data
  if (testData.commercialRegistry !== undefined && testData.commercialRegistry !== null) {
    payload.append('commercialRegistry', testData.commercialRegistry.toString());
  }
  
  sleep(Math.random() * 1.5 + 0.5); // Realistic delay between fields
  
  if (testData.expiryDate !== undefined && testData.expiryDate !== null) {
    payload.append('expiryDate', testData.expiryDate);
  }

  // Add more realistic delay between field inputs
  sleep(Math.random() * 1.5 + 0.5); // Time between fields

  let submitResponse = http.post(`${BASE_URL}/signup/registration`, payload, {
    tags: { name: 'signup_submit' },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Origin': BASE_URL,
      'Referer': `${BASE_URL}/signup`
    },
    cookies: signupResponse.cookies // Maintain session
  });

  // Check form submission response and track errors
  const checks = check(submitResponse, {
    'form submission successful': (r) => r.status === 200 || r.status === 201 || r.status === 302,
    'no server error': (r) => r.status < 500,
    'valid response body': (r) => r.body && r.body.length > 0,
    'response contains expected fields': (r) => {
      try {
        return r.body.includes('Company Information') || // Next step
               r.body.includes('error') ||              // Error message
               r.body.includes('success');              // Success message
      } catch (e) {
        return false;
      }
    }
  });

  // Track response in error tracking system
  if (!checks) {
    const error = {
      category: testContext.scenario.includes('invalid') ? 'validation' :
                testContext.scenario.includes('boundary') ? 'boundary' :
                testContext.scenario === 'malformedRequest' ? 'malformed' : 'network',
      message: `Form submission failed for scenario: ${testContext.scenario}`,
      code: submitResponse.status,
    };

    errorTracker.trackError(error, {
      url: `${BASE_URL}/signup/registration`,
      method: 'POST',
      data: testData,
      status: submitResponse.status,
      responseTime: Date.now() - testContext.startTime,
      sessionId: testContext.sessionId,
      userAgent: submitResponse.request.headers['User-Agent'],
      retryCount: 0
    });

    // Track system metrics
    errorTracker.trackSystemMetrics({
      cpu: submitResponse.timings.duration,
      memory: submitResponse.timings.blocked,
      bandwidth: submitResponse.body ? submitResponse.body.length : 0,
      connections: 1
    });
  }

  // Add longer cooldown period for Cloudflare protection
  sleep(Math.random() * 3 + 2);

  // Track user experience metrics
  errorTracker.trackUXMetrics({
    loadTime: Date.now() - testContext.startTime,
    transactionTime: submitResponse.timings.duration,
    sessionDuration: Date.now() - testContext.startTime,
    transactionSuccess: checks
  });

  // If successful, maintain the session
  if (submitResponse.status === 302 || (submitResponse.status === 200 && submitResponse.body.includes('Company Information'))) {
    // Store cookies for session persistence
    const cookies = submitResponse.cookies;
    // Add to shared data for maintaining session
    const vuData = __VU ? { vu: __VU, cookies } : null;
    if (vuData) {
      let data = {};
      try {
        data = JSON.parse(SharedArray.toString());
      } catch (e) {}
      data[vuData.vu] = vuData.cookies;
      SharedArray.fromString(JSON.stringify(data));
    }
  }
}

export function teardown(data) {
  // Cleanup if needed
}
