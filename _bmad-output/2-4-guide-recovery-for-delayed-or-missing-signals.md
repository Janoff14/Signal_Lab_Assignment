# Story 2.4: Guide Recovery for Delayed or Missing Signals

Status: done

## Story

As a reviewer,  
I want actionable recovery guidance when verification fails,  
so that I can determine whether to wait, troubleshoot, or mark blocked.

## Acceptance Criteria

1. Given expected telemetry is not visible immediately, when delay pattern is detected, then UI presents delayed-state guidance and recheck prompt with unambiguous next action.
2. Given likely hard failure is detected, when recovery panel is shown, then UI provides suspected layer hints and troubleshooting checklist link, and blocked reason can be recorded explicitly.

## Tasks / Subtasks

- [x] Add pending-state guidance in signal panel.
- [x] Add failed-state recovery panel with troubleshooting checklist link.
- [x] Add explicit troubleshooting section in dashboard and README.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added delayed-state guidance message in UI when signal state is pending.
- Added failed-state recovery guidance with checklist jump-link.
- Added troubleshooting checklist content in app and README to make recovery deterministic.

### File List

- `_bmad-output/2-4-guide-recovery-for-delayed-or-missing-signals.md`
- `apps/web/src/app/page.tsx`
- `README.md`

### Change Log

- 2026-04-14: Added delayed/failed signal recovery guidance and checklist links; moved to `done`.
