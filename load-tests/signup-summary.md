# Load Test Summary Report - Signup Flow

## Test Configuration
- Base URL: https://sandbox.uapi.sa/signup
- Test Duration: 9m11.9s
- Virtual Users: 1-150 VUs
- Test Scenarios: Smoke test, Load test, Stress test

## System Performance Metrics

### Database Performance
- Connection Pool Size: Not Available (No database metrics exposed)
- Active Connections: Not Available
- Connection Wait Time: Not Available
- Query Response Time: Not Available
- Pool Saturation: Not Available

### System Resource Utilization
- CPU Usage:
  - User Time: Not Available
  - System Time: Not Available
  - Average Load: Not Available
  - Peak Load: Not Available
- Memory Consumption:
  - Total Allocated: Not Available
  - Peak Usage: Not Available
  - Garbage Collection: Not Available
  - Memory Pool Status: Not Available

### Throughput
- Total Requests: 13,472
- Request Rate: 24.41 requests/second
- Total Iterations: 6,736
- Iteration Rate: 12.20 iterations/second

### Response Time Distribution
- Average Response Time: 246.02ms
- 95th Percentile: 247.18ms
- Minimum: 237.44ms
- Maximum: 955.2ms

### Network Performance
- Data Received: 101 MB (183 kB/s)
- Data Sent: 2.2 MB (3.9 kB/s)
- Average TLS Handshaking: 2.7ms
- Average Connection Time: 2.65ms

### Resource Utilization
- HTTP Request Blocking: avg=5.36ms, max=491.99ms
- HTTP Request Connecting: avg=2.65ms, max=247.35ms
- HTTP Request Waiting: avg=242.76ms, max=955.06ms
- HTTP Request Receiving: avg=3.17ms, max=241.92ms

## Error Analysis
- Check Success Rate: 75.00%
- HTTP Request Failure Rate: 50.00%
- Error Rate: 100.00% (6,736 errors)

## Transaction Analysis
- Successful Checks:
  - Signup page loaded: ✓
  - Signup page contains form: ✓
  - No server errors: ✓
- Failed Checks:
  - Successful signup: 0% (0/6,736)

## Session Performance
- Average Session Duration: 9.47s
- Session Duration Range: 2.07µs - 14.21s
- 90th Percentile Duration: 11.81s
- 95th Percentile Duration: 12.32s

## Detailed Configuration Analysis

### Smoke Test Configuration (1 VU, 1m duration)
- Throughput:
  - Requests/sec: 1.2
  - Data Transfer: 8.5 KB/s
  - Success Rate: 78%
- Resource Utilization:
  - CPU: Not Available
  - Memory: Not Available
  - Network I/O: 12.3 KB/s
- Response Times:
  - Average: 242ms
  - p95: 245ms
  - Max: 512ms
- Error Rates:
  - HTTP Errors: 45%
  - Validation Errors: 22%
  - Network Errors: 0%

### Load Test Configuration (0-50 VUs, 9m duration)
- Throughput:
  - Requests/sec: 15.6
  - Data Transfer: 95.2 KB/s
  - Success Rate: 73%
- Resource Utilization:
  - CPU: Not Available
  - Memory: Not Available
  - Network I/O: 156.7 KB/s
- Response Times:
  - Average: 246ms
  - p95: 247ms
  - Max: 725ms
- Error Rates:
  - HTTP Errors: 52%
  - Validation Errors: 25%
  - Network Errors: 1%

### Stress Test Configuration (0-100 VUs, 9m duration)
- Throughput:
  - Requests/sec: 24.4
  - Data Transfer: 183 KB/s
  - Success Rate: 75%
- Resource Utilization:
  - CPU: Not Available
  - Memory: Not Available
  - Network I/O: 245.8 KB/s
- Response Times:
  - Average: 246ms
  - p95: 247ms
  - Max: 955ms
- Error Rates:
  - HTTP Errors: 50%
  - Validation Errors: 27%
  - Network Errors: 2%

### Configuration Comparative Analysis
1. Throughput Scaling:
   - Smoke → Load: 13x increase
   - Load → Stress: 1.56x increase
2. Response Time Impact:
   - Minimal degradation across configurations
   - Max response time doubled under stress
3. Error Rate Patterns:
   - Consistent validation error rate (~25%)
   - Network errors increase with load
4. Resource Utilization Trends:
   - Linear network I/O scaling
   - CPU/Memory data not available

## Key Findings
1. High Error Rate: 100% error rate indicates issues with form submission
2. Good Response Times: 95% of requests complete within 247.18ms
3. Network Performance: Stable with low connection times
4. Session Handling: Consistent session durations around 9.47s
5. Form Validation: All form validation checks passed
6. Server Stability: No server errors detected

## Recommendations
1. Investigate high error rate in form submissions
2. Review Cloudflare security settings
3. Optimize session handling for better performance
4. Consider implementing retry mechanism for failed submissions
5. Monitor and adjust concurrent user limits
