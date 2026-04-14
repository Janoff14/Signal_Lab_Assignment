---
name: scenario-observability-check
description: Run a deterministic scenario and verify metrics, logs, and sentry evidence with run-level correlation.
---

## When to Use

- User asks to verify observability after a scenario run.
- A story changes run orchestration or signal emission.
- Pre-submission readiness checks are needed.
- After any change to metrics, logging, or Sentry adapters.

## Workflow
1. Trigger `system_error` scenario through API or UI.
2. Capture `runId` from response.
3. Verify:
   - `/metrics` contains `signal_lab_scenario_runs_total`.
   - `/api/v1/observability/logs` includes matching `runId`.
   - `/api/v1/observability/sentry-events` includes matching `runId`.
4. Return pass/fail with exact missing signal and next troubleshooting step.
