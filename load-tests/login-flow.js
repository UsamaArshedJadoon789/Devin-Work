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
    'checks{type:login}': ['rate>0.9']    // Login checks should pass 90% of time
  }
};

// Test data generators for login scenarios
const generateTestData = {
  username: {
    valid: () => `test${Date.now()}@example.com`,
    invalid: () => ['', 'invalid-email', 'test@', '@test.com', 'a'.repeat(100) + '@test.com'][Math.floor(Math.random() * 5)],
  },
  password: {
    valid: () => 'ValidPassword123!',
    invalid: () => ['', 'short', 'a'.repeat(100), '12345678', 'password123'][Math.floor(Math.random() * 5)],
  }
};

// Test scenarios for login
const testScenarios = {
  valid: () => ({
    username: generateTestData.username.valid(),
    password: generateTestData.password.valid()
  }),
  invalidUsername: () => ({
    username: generateTestData.username.invalid(),
    password: generateTestData.password.valid()
  }),
  invalidPassword: () => ({
    username: generateTestData.username.valid(),
    password: generateTestData.password.invalid()
  }),
  emptyFields: () => ({
    username: '',
    password: ''
  }),
  malformedRequest: () => ({
    username: Math.random() > 0.5 ? undefined : null,
    password: Math.random() > 0.5 ? undefined : null
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
    ['invalidUsername', 'invalidPassword', 'emptyFields', 'malformedRequest'][Math.floor(Math.random() * 4)];
  
  const testData = testScenarios[scenarioType]();
  
  // Add random delay between requests (Cloudflare friendly)
  sleep(Math.random() * 3 + 2);

  // Track test execution
  const testContext = {
    scenario: scenarioType,
    startTime: Date.now(),
    sessionId: __VU ? `vu_${__VU}` : 'default'
  };

  // Visit login page with realistic browser behavior
  let loginResponse = http.get(`${BASE_URL}/login`, {
    tags: { name: 'login_page' },
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

  check(loginResponse, {
    'login page loaded': (r) => r.status === 200,
    'login page contains form': (r) => r.body.includes('form'),
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

  let submitResponse = http.post(`${BASE_URL}/login`, payload, {
    tags: { name: 'login_submit' },
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
      'Referer': `${BASE_URL}/login`
    },
    cookies: loginResponse.cookies // Maintain session
  });

  // Check login response and track errors
  const checks = check(submitResponse, {
    'login request handled': (r) => r.status === 200 || r.status === 302,
    'no server error': (r) => r.status < 500,
    'valid response body': (r) => r.body && r.body.length > 0,
    'response contains expected content': (r) => {
      try {
        return r.body.includes('dashboard') ||    // Successful login
               r.body.includes('error') ||        // Error message
               r.body.includes('invalid');        // Invalid credentials
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
      url: `${BASE_URL}/login/registration`,
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
