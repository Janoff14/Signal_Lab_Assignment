# Story 2.5: Validate End-to-End Observability Walkthrough Reliability

Status: done

## Story

As a maintainer,  
I want a deterministic observability verification flow,  
so that reviewers can reproduce the full signal chain consistently.

## Acceptance Criteria

1. Given a clean stack startup and required scenario execution, when walkthrough steps are followed, then metric/log/dashboard/sentry verification succeeds in documented sequence, and verification is repeatable.
2. Given verification fails at one signal, when troubleshooting flow is applied, then diagnosis path is documented and testable, and unresolved failures remain explicit.

## Tasks / Subtasks

- [x] Add deterministic automated API verification for metrics/logs/sentry on `system_error`.
- [x] Document reproducible walkthrough and expected evidence in README.
- [x] Ensure full quality gate suite passes after observability integration.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added integration coverage validating full observability signal chain for `system_error`.
- Updated README with run/verify flow and troubleshooting for observability.
- Confirmed full validation suite passes end-to-end after implementation.

### File List

- `_bmad-output/2-5-validate-end-to-end-observability-walkthrough-reliability.md`
- `apps/api/test/scenario-runs.test.mjs`
- `README.md`

### Change Log

- 2026-04-14: Completed deterministic observability walkthrough validation; moved to `done`.
