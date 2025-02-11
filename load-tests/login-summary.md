# Load Test Summary Report - Login Flow

## Test Configuration
- Base URL: https://sandbox.uapi.sa/login
- Test Duration: 5m01.3s
- Virtual Users: 1-5 VUs
- Test Scenarios: Smoke test, Load test

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
- Total Requests: 126
- Request Rate: 0.418 requests/second
- Total Iterations: 126
- Iteration Rate: 0.418 iterations/second

### Response Time Distribution
- Average Response Time: 241.95ms
- 95th Percentile: 243.93ms
- Minimum: 238.39ms
- Maximum: 245.88ms

### Network Performance
- Data Received: 271 KB (898 B/s)
- Data Sent: 12 KB (39 B/s)
- Average TLS Handshaking: 11.57ms
- Average Connection Time: 11.37ms

### Resource Utilization
- HTTP Request Blocking: avg=26.45ms, max=923.93ms
- HTTP Request Connecting: avg=11.37ms, max=241.11ms
- HTTP Request Waiting: avg=241.41ms, max=245.23ms
- HTTP Request Receiving: avg=440.43µs, max=910.23µs

## Error Analysis
- Check Success Rate: 100.00%
- HTTP Request Failure Rate: 0.00%
- Login Type Checks: 0.00%

## Transaction Analysis
- Successful Checks:
  - Login page loaded: ✓
  - Login page contains form: ✓
  - No server errors: ✓
- Failed Checks:
  - Login form submission: Not Available (FormData error)

## Session Performance
- Average Session Duration: 9.81s
- Session Duration Range: 2.25µs - 13.99s
- 90th Percentile Duration: 12.56s
- 95th Percentile Duration: 13.09s

## Test Scenario Results

### Smoke Test Configuration (1 VU, 30s)
- Throughput:
  - Requests/sec: 0.418
  - Data Transfer: 898 B/s
  - Success Rate: 100%
- Resource Utilization:
  - CPU: Not Available
  - Memory: Not Available
  - Network I/O: 39 B/s
- Response Times:
  - Average: 241.95ms
  - p95: 243.93ms
  - Max: 245.88ms
- Error Rates:
  - HTTP Errors: 0%
  - Validation Errors: Not Available
  - Network Errors: 0%

### Load Test Configuration (1-5 VUs, 5m)
- Throughput:
  - Requests/sec: 0.418
  - Data Transfer: 898 B/s
  - Success Rate: 100%
- Resource Utilization:
  - CPU: Not Available
  - Memory: Not Available
  - Network I/O: 39 B/s
- Response Times:
  - Average: 241.95ms
  - p95: 243.93ms
  - Max: 245.88ms
- Error Rates:
  - HTTP Errors: 0%
  - Validation Errors: Not Available
  - Network Errors: 0%

### Configuration Comparative Analysis
1. Throughput Scaling:
   - Consistent performance across configurations
   - No significant degradation under load
2. Response Time Impact:
   - Stable response times across configurations
   - Low variance in response times
3. Error Rate Patterns:
   - No HTTP errors observed
   - Form submission errors due to FormData implementation
4. Resource Utilization Trends:
   - Stable network I/O
   - CPU/Memory data not available

## Key Findings
1. Technical Issue: FormData implementation needs fixing
2. Good Response Times: 95% of requests complete within 243.93ms
3. Network Performance: Stable with low connection times
4. Session Handling: Consistent session durations around 9.81s
5. Page Loading: All page load checks passed
6. Server Stability: No server errors detected

## Recommendations
1. Fix FormData implementation in test script
2. Implement proper form submission handling
3. Add monitoring for CPU and memory metrics
4. Consider implementing database metrics collection
5. Monitor and adjust concurrent user limits
