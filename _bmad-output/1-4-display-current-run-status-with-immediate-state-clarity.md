# Story 1.4: Display Current Run Status with Immediate State Clarity

Status: done

## Story

As a reviewer,  
I want to see explicit lifecycle states for the active run,  
so that I always know what is happening after I click Run.

## Acceptance Criteria

1. Given I trigger a run, when processing begins, then UI transitions through explicit states (`idle` -> `loading/running` -> `success|error`), and state language is deterministic and visible.
2. Given run status updates are received, when state changes, then the status strip updates with run ID, scenario, and last-updated timestamp, and status remains readable and keyboard/screen-reader friendly.

## Tasks / Subtasks

- [x] Add explicit run lifecycle state model (AC: 1)
  - [x] Derive deterministic state labels from mutation lifecycle (`idle`, `running`, `success`, `error`).
  - [x] Keep state vocabulary consistent across UI labels.
- [x] Add visible status strip in main dashboard (AC: 1,2)
  - [x] Render a dedicated status region with run ID, scenario, status, and last-updated.
  - [x] Ensure strip updates as state changes and remains present in primary flow.
- [x] Add accessibility semantics for status feedback (AC: 2)
  - [x] Use semantic region labeling and live updates where appropriate.
  - [x] Keep readable plain-text status (not color-only).
- [x] Add tests for state transitions and strip metadata mapping (AC: 1,2)
  - [x] Unit-test deterministic state derivation.
  - [x] Verify metadata output includes run/scenario/last-updated.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added deterministic lifecycle mapping (`idle`, `running`, `success`, `error`) in the scenario-run view model.
- Implemented a dedicated, live status strip in the dashboard with status, run ID, scenario, and last-updated metadata.
- Preserved primary run action flow while adding semantically labeled status region for accessibility.
- Expanded UI unit tests to cover lifecycle state and status-strip metadata behavior.
- Full validation suite passed (structure, lint, typecheck, test, build).
- Code review completed; no additional patch findings required.

### File List

- `_bmad-output/1-4-display-current-run-status-with-immediate-state-clarity.md`
- `_bmad-output/sprint-status.yaml`
- `apps/web/src/app/page.tsx`
- `apps/web/src/features/scenario-runs/view-model.ts`
- `apps/web/test/scenario-run-ui.test.ts`

### Change Log

- 2026-04-14: Implemented Story 1.4 run status strip and lifecycle state handling; status moved to `review`.
- 2026-04-14: Story 1.4 reviewed and moved to `done`.
