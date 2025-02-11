import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { CONFIG } from './config.js';

export class ResultsLogger {
  constructor() {
    this.results = {
      startTime: new Date().toISOString(),
      scenarios: {},
      errors: [],
      metrics: {
        requests: 0,
        failures: 0,
        avgResponseTime: 0,
        p95ResponseTime: 0,
        errorRate: 0
      },
      sessions: new Map()
    };
  }

  // Log test results for each scenario
  logScenarioResult(scenario, metrics) {
    this.results.scenarios[scenario] = {
      timestamp: new Date().toISOString(),
      metrics: {
        vus: metrics.vus,
        iterations: metrics.iterations,
        requestsPerSecond: metrics.http_reqs_per_sec,
        failureRate: metrics.http_req_failed,
        avgResponseTime: metrics.http_req_duration.avg,
        p95ResponseTime: metrics.http_req_duration.p95
      }
    };
  }

  // Log detailed error information
  logError(error, context) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      type: error.type || 'unknown',
      message: error.message,
      url: context.url,
      statusCode: context.status,
      scenario: context.scenario,
      sessionId: context.sessionId
    };

    this.results.errors.push(errorEntry);
    return errorEntry;
  }

  // Generate summary report
  generateSummary() {
    const summary = {
      testDuration: new Date() - new Date(this.results.startTime),
      totalRequests: this.results.metrics.requests,
      totalErrors: this.results.errors.length,
      errorRate: (this.results.errors.length / this.results.metrics.requests) * 100,
      scenarios: this.results.scenarios,
      errorBreakdown: this._generateErrorBreakdown(),
      performanceMetrics: this._generatePerformanceMetrics()
    };

    // Generate text summary
    const textReport = textSummary(summary, { indent: ' ', enableColors: true });
    
    return {
      json: summary,
      text: textReport
    };
  }

  // Generate error breakdown by type
  _generateErrorBreakdown() {
    const breakdown = {};
    this.results.errors.forEach(error => {
      breakdown[error.type] = (breakdown[error.type] || 0) + 1;
    });
    return breakdown;
  }

  // Generate detailed performance metrics
  _generatePerformanceMetrics() {
    return {
      avgResponseTime: this.results.metrics.avgResponseTime,
      p95ResponseTime: this.results.metrics.p95ResponseTime,
      requestsPerSecond: this.results.metrics.requests / (this.results.testDuration / 1000),
      successRate: 100 - this.results.metrics.errorRate
    };
  }

  // Export results to file
  exportResults(filename) {
    const summary = this.generateSummary();
    const exportData = JSON.stringify(summary.json, null, 2);
    
    // In k6, we'll use console.log to output this data
    // which can be redirected to a file when running the tests
    console.log('TEST_RESULTS_BEGIN');
    console.log(exportData);
    console.log('TEST_RESULTS_END');
    
    // Also output the text summary
    console.log(summary.text);
  }
}

// Export a singleton instance
export const resultsLogger = new ResultsLogger();
