# Observability Verification Rule

- Every run flow change must preserve deterministic observability verification.
- `system_error` must produce metric + structured log + sentry event with shared `runId`.
- Do not claim observability success without endpoint-level evidence:
  - `http://localhost:3001/metrics`
  - `http://localhost:3001/api/v1/observability/logs`
  - `http://localhost:3001/api/v1/observability/sentry-events`
- When status is pending/failed, provide explicit UI guidance and troubleshooting path.
