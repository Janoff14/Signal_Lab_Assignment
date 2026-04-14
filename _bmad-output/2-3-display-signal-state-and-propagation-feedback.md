# Story 2.3: Display Signal State and Propagation Feedback

Status: done

## Story

As a reviewer,  
I want clear signal status feedback (pending/success/failure),  
so that delayed telemetry feels controlled instead of broken.

## Acceptance Criteria

1. Given a run has been triggered, when telemetry is still propagating, then UI shows explicit pending state with last-updated information, and status vocabulary remains consistent.
2. Given one signal succeeds while another is pending or failed, when status is rendered, then each signal state is distinguishable with text/icon/color, and no status relies on color alone.

## Tasks / Subtasks

- [x] Add signal status API endpoint with per-signal state.
- [x] Add UI signal state panel with text labels for metrics/logs/sentry.
- [x] Add polling-based signal refresh for active run verification.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added `GET /api/v1/observability/signals` endpoint for run-level signal states.
- Added web signal-state panel rendering deterministic text states.
- Added refetch polling in frontend to keep state current during verification.

### File List

- `_bmad-output/2-3-display-signal-state-and-propagation-feedback.md`
- `apps/api/src/observability/observability.service.ts`
- `apps/api/src/observability/observability.controller.ts`
- `apps/web/src/features/scenario-runs/api.ts`
- `apps/web/src/features/scenario-runs/hooks.ts`
- `apps/web/src/features/scenario-runs/query-keys.ts`
- `apps/web/src/app/page.tsx`
- `packages/contracts/src/index.ts`

### Change Log

- 2026-04-14: Added signal-state feedback API/UI and polling updates; moved to `done`.
