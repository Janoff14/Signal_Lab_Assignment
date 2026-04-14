# Story 2.1: Emit Correlated Metrics, Logs, and Errors per Run

Status: done

## Story

As a maintainer,  
I want each scenario execution to emit all required observability signals with run correlation,  
so that verification is real, complete, and traceable.

## Acceptance Criteria

1. Given a scenario run is executed from the UI, when orchestration processes the run, then Prometheus metric and structured log are emitted with `runId` and `scenarioType`, and failure scenarios capture Sentry events with the same correlation fields.
2. Given telemetry emission fails in any adapter, when error handling is triggered, then failure is surfaced explicitly and no silent swallow occurs.

## Tasks / Subtasks

- [x] Add metrics/logs/sentry adapters in API observability layer.
- [x] Emit correlated observability events from scenario run service.
- [x] Add `/metrics` and observability evidence endpoints.
- [x] Add automated test for `system_error` signal correlation.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added `MetricsAdapter`, `LogsAdapter`, and `SentryAdapter`.
- Extended scenario execution flow to emit correlated observability events using run-level metadata.
- Added API endpoints for metrics and observability evidence used by verification flow.
- Added integration test proving `system_error` emits metrics/logs/sentry with shared `runId`.

### File List

- `_bmad-output/2-1-emit-correlated-metrics-logs-and-errors-per-run.md`
- `apps/api/src/observability/metrics.adapter.ts`
- `apps/api/src/observability/logs.adapter.ts`
- `apps/api/src/observability/sentry.adapter.ts`
- `apps/api/src/observability/observability.service.ts`
- `apps/api/src/observability/observability.controller.ts`
- `apps/api/src/scenario-runs/scenario-runs.service.ts`
- `apps/api/src/app.module.ts`
- `apps/api/test/scenario-runs.test.mjs`

### Change Log

- 2026-04-14: Implemented correlated observability emission and evidence endpoints; moved to `done`.
