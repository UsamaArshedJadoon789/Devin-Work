import { Rate, Counter, Trend } from 'k6/metrics';
import { CONFIG } from './config.js';

// Error tracking metrics
export const errorMetrics = {
  // Network errors
  networkErrors: new Rate('network_errors'),
  networkLatency: new Trend('network_latency'),
  
  // Authentication errors
  authErrors: new Rate('auth_errors'),
  authFailures: new Counter('auth_failures'),
  
  // Validation errors
  validationErrors: new Rate('validation_errors'),
  validationFailures: new Counter('validation_failures'),
  
  // Concurrent access errors
  concurrentErrors: new Rate('concurrent_errors'),
  
  // Boundary value errors
  boundaryErrors: new Rate('boundary_errors'),
  
  // Load condition errors
  overloadErrors: new Rate('overload_errors'),
  
  // Session errors
  sessionErrors: new Rate('session_errors')
};

// System metrics
export const systemMetrics = {
  // CPU usage
  cpuUsage: new Trend('cpu_usage'),
  
  // Memory consumption
  memoryUsage: new Trend('memory_usage'),
  
  // Network bandwidth
  bandwidth: new Trend('bandwidth_usage'),
  
  // Connection pool status
  activeConnections: new Counter('active_connections'),
  connectionErrors: new Rate('connection_errors')
};

// User experience metrics
export const uxMetrics = {
  // Page load times
  pageLoadTime: new Trend('page_load_time'),
  
  // Transaction completion
  transactionSuccess: new Rate('transaction_success'),
  transactionTime: new Trend('transaction_time'),
  
  // Session handling
  sessionDuration: new Trend('session_duration'),
  sessionErrors: new Rate('session_errors')
};

// Error categories for detailed tracking
export const errorCategories = {
  NETWORK: 'network',
  AUTH: 'auth',
  VALIDATION: 'validation',
  CONCURRENT: 'concurrent',
  BOUNDARY: 'boundary',
  OVERLOAD: 'overload',
  SESSION: 'session'
};

// Error tracking class
export class ErrorTracker {
  constructor() {
    this.errors = [];
    this.metrics = errorMetrics;
    this.system = systemMetrics;
    this.ux = uxMetrics;
  }

  // Track error with detailed context
  trackError(error, context) {
    const errorEntry = {
      timestamp: Date.now(),
      category: error.category || errorCategories.NETWORK,
      message: error.message,
      code: error.code,
      url: context.url,
      method: context.method,
      requestData: context.data,
      responseStatus: context.status,
      responseTime: context.responseTime,
      sessionId: context.sessionId,
      userAgent: context.userAgent,
      retryCount: context.retryCount || 0
    };

    this.errors.push(errorEntry);
    this._updateMetrics(errorEntry);
    this._checkThresholds(errorEntry);

    return errorEntry;
  }

  // Track system metrics
  trackSystemMetrics(metrics) {
    this.system.cpuUsage.add(metrics.cpu);
    this.system.memoryUsage.add(metrics.memory);
    this.system.bandwidth.add(metrics.bandwidth);
    this.system.activeConnections.add(metrics.connections);
  }

  // Track user experience metrics
  trackUXMetrics(metrics) {
    this.ux.pageLoadTime.add(metrics.loadTime);
    this.ux.transactionTime.add(metrics.transactionTime);
    this.ux.sessionDuration.add(metrics.sessionDuration);
    
    if (metrics.transactionSuccess) {
      this.ux.transactionSuccess.add(1);
    }
  }

  // Private: Update error metrics
  _updateMetrics(error) {
    switch(error.category) {
      case errorCategories.NETWORK:
        this.metrics.networkErrors.add(1);
        this.metrics.networkLatency.add(error.responseTime);
        break;
      case errorCategories.AUTH:
        this.metrics.authErrors.add(1);
        this.metrics.authFailures.add(1);
        break;
      case errorCategories.VALIDATION:
        this.metrics.validationErrors.add(1);
        this.metrics.validationFailures.add(1);
        break;
      case errorCategories.CONCURRENT:
        this.metrics.concurrentErrors.add(1);
        break;
      case errorCategories.BOUNDARY:
        this.metrics.boundaryErrors.add(1);
        break;
      case errorCategories.OVERLOAD:
        this.metrics.overloadErrors.add(1);
        break;
      case errorCategories.SESSION:
        this.metrics.sessionErrors.add(1);
        break;
    }
  }

  // Private: Check error thresholds
  _checkThresholds(error) {
    // Check if we're exceeding error rate thresholds
    const errorRates = {
      network: this.metrics.networkErrors.rate,
      auth: this.metrics.authErrors.rate,
      validation: this.metrics.validationErrors.rate,
      concurrent: this.metrics.concurrentErrors.rate,
      boundary: this.metrics.boundaryErrors.rate,
      overload: this.metrics.overloadErrors.rate,
      session: this.metrics.sessionErrors.rate
    };

    // Log warning if any error rate exceeds threshold
    Object.entries(errorRates).forEach(([type, rate]) => {
      if (rate > CONFIG.errors.thresholds[type]) {
        console.warn(`Warning: ${type} error rate (${rate}) exceeds threshold (${CONFIG.errors.thresholds[type]})`);
      }
    });
  }

  // Get error statistics
  getStats() {
    return {
      totalErrors: this.errors.length,
      errorsByCategory: this._getErrorsByCategory(),
      errorRates: this._getErrorRates(),
      systemMetrics: this._getSystemMetrics(),
      uxMetrics: this._getUXMetrics()
    };
  }

  // Private: Get errors grouped by category
  _getErrorsByCategory() {
    return this.errors.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {});
  }

  // Private: Get current error rates
  _getErrorRates() {
    return {
      network: this.metrics.networkErrors.rate,
      auth: this.metrics.authErrors.rate,
      validation: this.metrics.validationErrors.rate,
      concurrent: this.metrics.concurrentErrors.rate,
      boundary: this.metrics.boundaryErrors.rate,
      overload: this.metrics.overloadErrors.rate,
      session: this.metrics.sessionErrors.rate
    };
  }

  // Private: Get system metrics
  _getSystemMetrics() {
    return {
      cpuUsage: this.system.cpuUsage.avg,
      memoryUsage: this.system.memoryUsage.avg,
      bandwidth: this.system.bandwidth.avg,
      activeConnections: this.system.activeConnections.count
    };
  }

  // Private: Get UX metrics
  _getUXMetrics() {
    return {
      avgPageLoadTime: this.ux.pageLoadTime.avg,
      transactionSuccessRate: this.ux.transactionSuccess.rate,
      avgTransactionTime: this.ux.transactionTime.avg,
      avgSessionDuration: this.ux.sessionDuration.avg
    };
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();
