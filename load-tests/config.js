// Load testing configuration and utilities
export const CONFIG = {
  // Session management
  session: {
    // Cookie jar for session persistence
    cookieJar: true,
    // Session timeout in seconds
    timeout: 3600,
    // Maximum sessions to maintain
    maxSessions: 100
  },

  // Browser simulation
  browser: {
    // Common browser headers
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
      'Sec-Fetch-User': '?1'
    }
  },

  // Error tracking configuration
  errors: {
    // Types of errors to track
    types: {
      network: true,
      authentication: true,
      validation: true,
      timeout: true,
      server: true
    },
    // Error logging configuration
    logging: {
      console: true,
      file: true,
      metrics: true
    }
  },

  // Rate limiting and Cloudflare protection
  rateLimit: {
    // Minimum delay between requests (ms)
    minDelay: 1000,
    // Maximum delay between requests (ms)
    maxDelay: 5000,
    // Delay after error (ms)
    errorDelay: 10000,
    // Maximum retries per request
    maxRetries: 3
  }
};

// Utility functions for session management
export const sessionUtils = {
  // Initialize a new session
  createSession() {
    return {
      id: `session_${Date.now()}`,
      startTime: Date.now(),
      requests: 0,
      errors: 0
    };
  },

  // Check if session is still valid
  isSessionValid(session) {
    return (Date.now() - session.startTime) < (CONFIG.session.timeout * 1000);
  }
};

// Error tracking utilities
export const errorUtils = {
  // Log error with context
  logError(error, context) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      type: error.type,
      message: error.message,
      context: context,
      url: context.url,
      statusCode: context.status
    };

    if (CONFIG.errors.logging.console) {
      console.error(JSON.stringify(errorLog));
    }

    return errorLog;
  },

  // Categorize error type
  categorizeError(error) {
    if (error.status >= 500) return 'server';
    if (error.status === 401 || error.status === 403) return 'authentication';
    if (error.status === 400) return 'validation';
    if (error.status === 408 || error.status === 504) return 'timeout';
    return 'network';
  }
};

// Rate limiting and protection utilities
export const rateLimitUtils = {
  // Get random delay within configured bounds
  getDelay() {
    return Math.floor(
      Math.random() * 
      (CONFIG.rateLimit.maxDelay - CONFIG.rateLimit.minDelay) + 
      CONFIG.rateLimit.minDelay
    );
  },

  // Check if we should retry request
  shouldRetry(attempt, error) {
    if (attempt >= CONFIG.rateLimit.maxRetries) return false;
    if (error.status === 429) return true; // Too Many Requests
    if (error.status >= 500) return true;  // Server Errors
    return false;
  }
};
