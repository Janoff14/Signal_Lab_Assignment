# Story 3.5: Deterministic Verification Rehearsal and Readiness Gate

Status: done

## Story

As a maintainer,  
I want a repeatable pre-submission verification gate,  
so that regressions are caught before handoff.

## Acceptance Criteria

1. Given latest implementation state, when I run documented rehearsal flow, then required scenario verification succeeds across metric/log/dashboard/sentry and readiness is explicit.
2. Given rehearsal failure, when triage path is executed, then root cause is narrowed to concrete layer and fix status is captured.

## Tasks / Subtasks

- [x] Add rehearsal verification script for scenario + observability checks.
- [x] Add package script for reproducible rehearsal execution.
- [x] Confirm full quality gate suite remains green after infra/docs changes.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added `scripts/rehearsal-check.mjs` for deterministic `system_error` signal verification.
- Added `npm run verify:rehearsal` command for repeatable readiness checks.
- Re-ran full suite (`test:structure`, `lint`, `typecheck`, `test`, `build`) successfully.

### File List

- `_bmad-output/3-5-deterministic-verification-rehearsal-and-readiness-gate.md`
- `scripts/rehearsal-check.mjs`
- `package.json`
- `README.md`

### Change Log

- 2026-04-14: Added rehearsal readiness gate and validation command; moved to `done`.
