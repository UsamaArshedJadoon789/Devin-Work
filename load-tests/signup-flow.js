import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    // Initial smoke test
    smoke_test: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
      gracefulStop: '30s',
    },
    // Load test
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 50 },   // Ramp up
        { duration: '5m', target: 50 },   // Stay at peak
        { duration: '2m', target: 0 },    // Ramp down
      ],
      gracefulStop: '30s',
    },
    // Stress test
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 100 },  // Ramp up to higher load
        { duration: '5m', target: 100 },  // Stay at stress level
        { duration: '2m', target: 0 },    // Ramp down
      ],
      gracefulStop: '30s',
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    http_req_failed: ['rate<0.1'],     // Less than 10% of requests should fail
    errors: ['rate<0.1'],              // Custom error rate should be below 10%
  }
};

const BASE_URL = 'https://sandbox.uapi.sa';

export function setup() {
  // Perform any setup tasks if needed
  return {};
}

export default function () {
  // Add random delay between requests to mimic real user behavior and avoid Cloudflare blocks
  sleep(Math.random() * 3 + 1);

  // Visit signup page
  let signupResponse = http.get(`${BASE_URL}/signup`, {
    tags: { name: 'signup_page' },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  check(signupResponse, {
    'signup page loaded': (r) => r.status === 200,
    'signup page contains form': (r) => r.body.includes('form'),
  }) || errorRate.add(1);

  // Add random think time to simulate user reading the page
  sleep(Math.random() * 5 + 2);

  // Simulate form submission with random data
  // Note: This is a placeholder. We'll need to analyze the actual form structure
  const payload = {
    email: `test${Date.now()}@example.com`,
    password: 'TestPassword123!',
    confirmPassword: 'TestPassword123!'
  };

  let submitResponse = http.post(`${BASE_URL}/signup`, JSON.stringify(payload), {
    tags: { name: 'signup_submit' },
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  check(submitResponse, {
    'successful signup': (r) => r.status === 200 || r.status === 201,
    'no server error': (r) => r.status < 500,
  }) || errorRate.add(1);

  // Add cooldown period to avoid triggering rate limits
  sleep(Math.random() * 2 + 1);
}

export function teardown(data) {
  // Cleanup if needed
}
