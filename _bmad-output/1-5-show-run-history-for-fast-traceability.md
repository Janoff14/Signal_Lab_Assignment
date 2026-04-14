# Story 1.5: Show Run History for Fast Traceability

Status: done

## Story

As a reviewer,  
I want a recent run history list with key metadata,  
so that I can validate and compare executions without re-running blindly.

## Acceptance Criteria

1. Given one or more runs exist, when I view the history module, then I can see recent runs with scenario type, status, timestamp, and run ID, and history loads within expected local performance thresholds.
2. Given I inspect a history entry, when I compare it to active run output, then identifiers and statuses are consistent with backend contract and persisted records, and history module remains secondary to primary run flow.

## Tasks / Subtasks

- [x] Add backend endpoint to return recent run history.
- [x] Add repository + service support for recent run listing.
- [x] Add web query hook and history section in dashboard.
- [x] Add integration test for history endpoint.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added `GET /api/v1/scenario-runs` for run history payloads with stable metadata.
- Added history retrieval to repository/service and wired a secondary history section in web UI.
- Added API integration coverage for history listing behavior.

### File List

- `_bmad-output/1-5-show-run-history-for-fast-traceability.md`
- `_bmad-output/sprint-status.yaml`
- `apps/api/src/scenario-runs/scenario-runs.repository.ts`
- `apps/api/src/scenario-runs/scenario-runs.service.ts`
- `apps/api/src/scenario-runs/scenario-runs.controller.ts`
- `apps/api/test/scenario-runs.test.mjs`
- `apps/web/src/features/scenario-runs/api.ts`
- `apps/web/src/features/scenario-runs/hooks.ts`
- `apps/web/src/features/scenario-runs/query-keys.ts`
- `apps/web/src/app/page.tsx`

### Change Log

- 2026-04-14: Implemented run history endpoint + dashboard history module; status moved to `in-progress`.
- 2026-04-14: Story 1.5 reviewed and moved to `done`.
