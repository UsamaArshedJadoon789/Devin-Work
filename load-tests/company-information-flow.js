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

// Test data generators for company information
const generateTestData = {
  companyName: {
    valid: () => `Test Company ${Date.now()}`,
    tooShort: () => 'Co',
    tooLong: () => 'A'.repeat(256),
    invalid: () => ['', '123', '@#$%', ' '.repeat(10)][Math.floor(Math.random() * 4)]
  },
  companyType: {
    valid: () => ['LLC', 'Corporation', 'Partnership'][Math.floor(Math.random() * 3)],
    invalid: () => ['', 'Invalid', '123', '@#$%'][Math.floor(Math.random() * 4)]
  },
  employeeCount: {
    valid: () => Math.floor(10 + Math.random() * 990),
    tooLow: () => Math.floor(0 + Math.random() * 5),
    tooHigh: () => Math.floor(10000 + Math.random() * 90000),
    invalid: () => ['', 'abc', '-10', '1.5'][Math.floor(Math.random() * 4)]
  },
  address: {
    valid: () => `${Math.floor(1000 + Math.random() * 9000)} Test Street`,
    tooShort: () => '123',
    tooLong: () => 'A'.repeat(512),
    invalid: () => ['', '@#$%', ' '.repeat(10)][Math.floor(Math.random() * 3)]
  },
  phone: {
    valid: () => `+966${Math.floor(500000000 + Math.random() * 499999999)}`,
    tooShort: () => '+9665000',
    tooLong: () => '+966' + '0'.repeat(15),
    invalid: () => ['', 'abc', '+123', '12345'][Math.floor(Math.random() * 4)]
  }
};

// Test scenarios for company information
const testScenarios = {
  valid: () => ({
    companyName: generateTestData.companyName.valid(),
    companyType: generateTestData.companyType.valid(),
    employeeCount: generateTestData.employeeCount.valid(),
    address: generateTestData.address.valid(),
    phone: generateTestData.phone.valid()
  }),
  invalidCompanyName: () => ({
    companyName: generateTestData.companyName.invalid(),
    companyType: generateTestData.companyType.valid(),
    employeeCount: generateTestData.employeeCount.valid(),
    address: generateTestData.address.valid(),
    phone: generateTestData.phone.valid()
  }),
  invalidCompanyType: () => ({
    companyName: generateTestData.companyName.valid(),
    companyType: generateTestData.companyType.invalid(),
    employeeCount: generateTestData.employeeCount.valid(),
    address: generateTestData.address.valid(),
    phone: generateTestData.phone.valid()
  }),
  invalidEmployeeCount: () => ({
    companyName: generateTestData.companyName.valid(),
    companyType: generateTestData.companyType.valid(),
    employeeCount: generateTestData.employeeCount.invalid(),
    address: generateTestData.address.valid(),
    phone: generateTestData.phone.valid()
  }),
  boundaryValues: () => ({
    companyName: Math.random() > 0.5 ? generateTestData.companyName.tooShort() : generateTestData.companyName.tooLong(),
    companyType: generateTestData.companyType.valid(),
    employeeCount: Math.random() > 0.5 ? generateTestData.employeeCount.tooLow() : generateTestData.employeeCount.tooHigh(),
    address: Math.random() > 0.5 ? generateTestData.address.tooShort() : generateTestData.address.tooLong(),
    phone: Math.random() > 0.5 ? generateTestData.phone.tooShort() : generateTestData.phone.tooLong()
  }),
  malformedRequest: () => ({
    companyName: Math.random() > 0.5 ? undefined : null,
    companyType: Math.random() > 0.5 ? undefined : null,
    employeeCount: Math.random() > 0.5 ? undefined : null,
    address: Math.random() > 0.5 ? undefined : null,
    phone: Math.random() > 0.5 ? undefined : null
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
    ['invalidCompanyName', 'invalidCompanyType', 'invalidEmployeeCount', 'boundaryValues', 'malformedRequest'][Math.floor(Math.random() * 5)];
  
  const testData = testScenarios[scenarioType]();
  
  // Add random delay between requests (Cloudflare friendly)
  sleep(Math.random() * 3 + 2);

  // Track test execution
  const testContext = {
    scenario: scenarioType,
    startTime: Date.now(),
    sessionId: __VU ? `vu_${__VU}` : 'default'
  };

  // Visit company-information page with realistic browser behavior
  let company-informationResponse = http.get(`${BASE_URL}/company-information`, {
    tags: { name: 'company-information_page' },
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

  check(company-informationResponse, {
    'company-information page loaded': (r) => r.status === 200,
    'company-information page contains form': (r) => r.body.includes('form'),
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

  // Create JSON payload from test data
  const payload = JSON.stringify(testData);

  let submitResponse = http.post(`${BASE_URL}/company-information`, payload, {
    tags: { name: 'company-information_submit' },
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
      'Referer': `${BASE_URL}/company-information`
    },
    cookies: company-informationResponse.cookies // Maintain session
  });

  // Check company information submission response and track errors
  const checks = check(submitResponse, {
    'form submission handled': (r) => r.status === 200 || r.status === 302,
    'no server error': (r) => r.status < 500,
    'valid response body': (r) => r.body && r.body.length > 0,
    'response contains expected content': (r) => {
      try {
        return r.body.includes('National Address') ||   // Next step
               r.body.includes('error') ||             // Error message
               r.body.includes('invalid') ||           // Validation error
               r.body.includes('success');             // Success message
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
      url: `${BASE_URL}/company-information/registration`,
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
