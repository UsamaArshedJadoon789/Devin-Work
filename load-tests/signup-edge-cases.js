import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    // Invalid data test
    invalid_data: {
      executor: 'constant-vus',
      vus: 10,
      duration: '3m',
      gracefulStop: '30s',
    },
    // Boundary test
    boundary_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '3m',
      gracefulStop: '30s',
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1'],
    errors: ['rate<0.1'],
  }
};

const BASE_URL = 'https://sandbox.uapi.sa';

// Test data arrays for boundary and invalid cases
const invalidEmails = [
  '',                           // Empty
  'test',                       // No domain
  'test@',                      // Incomplete
  'a'.repeat(256) + '@test.com', // Too long
  '<script>alert(1)</script>@test.com', // XSS attempt
  'test@test@test.com',        // Multiple @
  ' test@test.com ',           // Whitespace
];

const invalidPasswords = [
  '',                          // Empty
  'short',                     // Too short
  'a'.repeat(1000),           // Too long
  '<script>alert(1)</script>', // XSS attempt
  ' password123 ',            // Whitespace
  'password123',              // Common password
];

export default function () {
  // Add random delay between requests
  sleep(Math.random() * 3 + 1);

  // Randomly select test type
  const testType = Math.random() < 0.5 ? 'invalid_email' : 'invalid_password';

  if (testType === 'invalid_email') {
    // Test with invalid email
    const randomEmail = invalidEmails[Math.floor(Math.random() * invalidEmails.length)];
    const payload = {
      email: randomEmail,
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!'
    };

    let response = http.post(`${BASE_URL}/signup`, JSON.stringify(payload), {
      tags: { name: 'invalid_email_test' },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    check(response, {
      'invalid email rejected': (r) => r.status === 400,
      'contains error message': (r) => r.body.includes('error') || r.body.includes('invalid'),
    }) || errorRate.add(1);
  } else {
    // Test with invalid password
    const randomPassword = invalidPasswords[Math.floor(Math.random() * invalidPasswords.length)];
    const payload = {
      email: `test${Date.now()}@example.com`,
      password: randomPassword,
      confirmPassword: randomPassword
    };

    let response = http.post(`${BASE_URL}/signup`, JSON.stringify(payload), {
      tags: { name: 'invalid_password_test' },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    check(response, {
      'invalid password rejected': (r) => r.status === 400,
      'contains error message': (r) => r.body.includes('error') || r.body.includes('invalid'),
    }) || errorRate.add(1);
  }

  // Test malformed requests
  if (Math.random() < 0.3) { // 30% chance to send malformed request
    const malformedPayloads = [
      '',                    // Empty body
      'invalid json',        // Invalid JSON
      '{}',                 // Empty JSON
      '[]',                 // Array instead of object
      '{email:}',           // Malformed JSON
    ];

    const randomPayload = malformedPayloads[Math.floor(Math.random() * malformedPayloads.length)];
    
    let response = http.post(`${BASE_URL}/signup`, randomPayload, {
      tags: { name: 'malformed_request_test' },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    check(response, {
      'malformed request handled': (r) => r.status === 400,
      'contains error message': (r) => r.body.includes('error') || r.body.includes('invalid'),
    }) || errorRate.add(1);
  }

  // Add cooldown period
  sleep(Math.random() * 2 + 1);
}
