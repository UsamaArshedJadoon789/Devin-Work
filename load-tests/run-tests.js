import { CONFIG, sessionUtils, errorUtils, rateLimitUtils } from './config.js';
import http from 'k6/http';
import { check, group } from 'k6';
import exec from 'k6/execution';

// Combine all test scenarios
export const options = {
  // Disable thresholds during setup/teardown
  setupTimeout: '1m',
  teardownTimeout: '1m',
  // Aggregate test scenarios
  scenarios: {
    smoke_test: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '1m',
      exec: 'smokeTest',
      gracefulStop: '30s',
    },
    main_flow: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 10, duration: '5m' },  // Ramp up
        { target: 10, duration: '10m' }, // Steady state
        { target: 0, duration: '5m' },   // Ramp down
      ],
      exec: 'mainFlow',
    },
    edge_cases: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
      maxDuration: '10m',
      exec: 'edgeCases',
      gracefulStop: '30s',
    }
  },
  // Global thresholds
  thresholds: {
    http_req_failed: ['rate<0.1'],    // Error rate < 10%
    http_req_duration: ['p(95)<3000'], // 95% of requests < 3s
    'group_duration{group:::setup}': ['max<30000'], // Setup < 30s
    'group_duration{group:::teardown}': ['max<30000'], // Teardown < 30s
  }
};

// Test coordination
const testCoordinator = {
  sessions: new Map(),
  
  initSession() {
    const session = sessionUtils.createSession();
    this.sessions.set(exec.vu.idInTest, session);
    return session;
  },

  getSession() {
    let session = this.sessions.get(exec.vu.idInTest);
    if (!session || !sessionUtils.isSessionValid(session)) {
      session = this.initSession();
    }
    return session;
  },

  logError(error, context) {
    const session = this.getSession();
    session.errors++;
    return errorUtils.logError(error, { ...context, sessionId: session.id });
  }
};

// Main test flows
export function smokeTest() {
  group('smoke_test', function() {
    const session = testCoordinator.getSession();
    const delay = rateLimitUtils.getDelay();
    
    // Basic page load test
    const response = http.get('https://sandbox.uapi.sa/signup', {
      tags: { name: 'smoke_test' },
      headers: CONFIG.browser.headers
    });

    check(response, {
      'status is 200': (r) => r.status === 200,
      'page contains signup form': (r) => r.body.includes('form')
    });

    sleep(delay);
  });
}

export function mainFlow() {
  group('main_flow', function() {
    const session = testCoordinator.getSession();
    
    // Import and run main signup flow
    const signupFlow = require('./signup-flow.js');
    signupFlow.default();
  });
}

export function edgeCases() {
  group('edge_cases', function() {
    const session = testCoordinator.getSession();
    
    // Import and run edge cases
    const edgeCasesFlow = require('./signup-edge-cases.js');
    edgeCasesFlow.default();
  });
}

// Setup and teardown
export function setup() {
  return {
    startTime: new Date().toISOString(),
    config: CONFIG
  };
}

export function teardown(data) {
  console.log(`Test run completed. Started at: ${data.startTime}`);
  // Additional cleanup if needed
}
