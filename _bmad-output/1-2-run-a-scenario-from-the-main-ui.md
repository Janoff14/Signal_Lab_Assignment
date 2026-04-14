# Story 1.2: Run a Scenario from the Main UI

Status: done

## Story

As a reviewer,  
I want to select a scenario and trigger a run from one clear action area,  
so that I can start verification immediately without navigation friction.

## Acceptance Criteria

1. Given I open the main dashboard with no active run, when I select a supported scenario and click Run, then the system submits the request through the single scenario-run API path, and the UI shows immediate submission acknowledgment and disables duplicate submission while in-flight.
2. Given I submit invalid or incomplete input, when validation fails on client or server boundary, then I receive clear actionable feedback in the same UI area, and no run is created.

## Tasks / Subtasks

- [x] Implement primary scenario-run action area in web UI (AC: 1,2)
  - [x] Add `ScenarioRunnerCard`-style section on `/` with one clear primary action.
  - [x] Build RHF form for scenario selection/input with semantic labels.
  - [x] Apply submit-state lock to prevent duplicate run requests while mutation is pending.
- [x] Implement API run endpoint integration via shared contracts (AC: 1)
  - [x] Add/extend frontend API client and TanStack Query mutation for scenario run submission.
  - [x] Wire backend controller route for scenario run submission on the single orchestration path.
  - [x] Ensure request/response shape uses stable contract types from `packages/contracts`.
- [x] Add deterministic validation + error feedback path (AC: 2)
  - [x] Add client-side RHF validation for required fields and supported scenario values.
  - [x] Enforce backend DTO validation and explicit error envelope mapping.
  - [x] Render actionable inline error messages in same UI region; avoid toast-only critical feedback.
- [x] Add tests for run submission and invalid-input rejection (AC: 1,2)
  - [x] Frontend test: submission acknowledgment + disabled button while in-flight.
  - [x] Backend test: invalid payload returns expected validation error and does not create run.
  - [x] Contract test/smoke assertion that run submit path exists and responds with expected envelope.

### Review Findings

- [x] [Review][Decision] Submit endpoint status semantics (acknowledge `running` vs return terminal `success|error`) — resolved to return `running` on submit (option `1:2`).
- [x] [Review][Decision] Durability model for run-state + observability emission — resolved to accept current local non-durable model for assignment scope (option `2:1`).

- [x] [Review][Patch] Non-HTTP exceptions can bypass explicit API error envelope [apps/api/src/common/filters/http-exception.filter.ts:4]
- [x] [Review][Patch] Run ID generation can collide across instances/restarts [apps/api/src/scenario-runs/scenario-runs.repository.ts:116]
- [x] [Review][Patch] `inmemory://` fallback can silently disable durable persistence outside tests [apps/api/src/scenario-runs/scenario-runs.repository.ts:19]
- [x] [Review][Patch] Observability signal query lacks DTO validation for required params [apps/api/src/observability/observability.controller.ts:25]
- [x] [Review][Patch] Unknown run IDs can report misleading `sentry: success` state [apps/api/src/observability/observability.service.ts:27]
- [x] [Review][Patch] Missing negative tests for observability signal query validation/unknown-run handling [apps/api/test/scenario-runs.test.mjs:75]

## Dev Notes

### Epic Context

- Epic 1 target is reviewer-first run flow with clear, traceable outcomes; Story 1.2 is the first real interaction slice after scaffold completion.
- This story unlocks downstream work:
  - Story 1.3 persistence and response traceability
  - Story 1.4 explicit lifecycle state rendering
  - Story 1.5 history visualization

### Story Foundation (from epics)

- User intent: run scenario directly from dashboard, no navigation ambiguity.
- Must preserve one authoritative run path and immediate user acknowledgment.
- Invalid input must fail visibly and safely with no run creation side effect.

### Technical Requirements

- Frontend must use RHF + TanStack Query mutation for run execution flow.
- Backend must keep controller -> service -> adapters layering; no business logic in controller.
- Use stable shared contract boundary via `packages/contracts`.
- Keep naming stable for `scenarioType` and future `runId` propagation.
- Keep behavior deterministic/demo-friendly (no hidden randomness, no silent retries).

### Architecture Compliance

- Continue using monorepo boundaries established in Story 1.1:
  - `apps/web` UI + hooks/api client
  - `apps/api` controller/service/DTO orchestration entry
  - `packages/contracts` shared DTO/envelope definitions
- Use API namespace/versioning approach defined in architecture (`/api/v1`).
- Preserve explicit success/error envelope shape for web consumption.
- Do not introduce direct DB/observability calls in UI components.

### File Structure Requirements (expected touch points)

- `apps/web/src/app/page.tsx` (or extracted `components/signal-lab/*`)
- `apps/web/src/features/scenario-runs/*` (api client, hooks, query keys)
- `apps/api/src/scenario-runs/*` (controller/service/dto)
- `packages/contracts/src/*` (request/response/envelope types)
- optional config helpers for shared constants/env in `apps/*/src/lib` or `config`

### Testing Requirements

- Cover AC-critical behaviors:
  - submit path called exactly once per click cycle
  - duplicate submits blocked during in-flight state
  - invalid client/server payload yields actionable errors and no run creation
- Prefer deterministic assertions (no fragile sleeps).
- Maintain root regression health:
  - `npm run test:structure`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`

### Previous Story Intelligence (1.1)

- Reuse established conventions and scripts; do not reintroduce placeholder checks.
- Respect env-based port handling and current dev wiring (`WEB_PORT`/`PORT`, `API_PORT`).
- Build/lint/typecheck/test now run across all workspaces including contracts—keep green.
- Structure-check script now enforces non-placeholder scripts; any new package script must be real.
- Keep updates incremental and vertical-slice oriented (P0 first, polish later).

### Latest Technical Notes

- Current local baseline aligns with Next.js 16.x, NestJS 11.x, TanStack Query 5.x, RHF 7.x.
- For this story, prioritize API and form correctness over advanced UI abstraction.
- Keep request handling async/await and explicit error mapping; no swallowed exceptions.

### Project Context Reference

- Stack is locked; avoid introducing alternate form/query/server frameworks.
- Mandatory reviewer endpoints/paths remain: UI `/`, metrics/log/grafana paths documented.
- Preserve explicit run flow and actionable error messages in primary UI region.

### References

- [Source: `_bmad-output/epics.md` - Epic 1, Story 1.2]
- [Source: `_bmad-output/architecture.md` - API patterns, frontend state approach, boundaries]
- [Source: `_bmad-output/ux-design-specification.md` - primary action clarity and feedback patterns]
- [Source: `_bmad-output/project-context.md` - framework/testing/workflow guardrails]
- [Source: `_bmad-output/1-1-set-up-initial-project-from-starter-template.md` - previous story learnings]

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Debug Log References

- Story auto-selected from first backlog item in sprint status: `1-2-run-a-scenario-from-the-main-ui`.
- Loaded context sources: sprint status, epics, architecture, UX spec, project context, previous story 1.1.
- Updated sprint status to `in-progress` before coding.
- Implemented shared run contracts (`SCENARIO_RUNS_PATH`, request/envelope/response types).
- Added backend scenario-runs controller/service/DTO + global validation/error envelope setup.
- Implemented frontend mutation flow with RHF validation, pending-state lock, and inline acknowledgment/error.
- Added deterministic tests:
  - web UI state tests for submit-disabled + acknowledgment
  - API integration tests for valid submit envelope + invalid payload rejection/no run creation
- Full validation commands passed:
  - `npm run test:structure`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story prepared for implementation with explicit AC mapping, file targets, test expectations, and guardrails.
- Story 1.2 implemented end-to-end on single scenario-run path with client+server validation and explicit error envelope.
- UI now prevents duplicate submissions in-flight and shows actionable same-area feedback.
- Backend rejects invalid input before run creation; integration test verifies no run count increment.
- Story completed with all AC tasks checked and regression suite green.
- Code review pass complete; no additional blockers before moving status to done.

### File List

- `_bmad-output/1-2-run-a-scenario-from-the-main-ui.md`
- `apps/web/src/app/page.tsx`
- `apps/web/src/features/scenario-runs/api.ts`
- `apps/web/src/features/scenario-runs/hooks.ts`
- `apps/web/src/features/scenario-runs/query-keys.ts`
- `apps/web/src/features/scenario-runs/view-model.ts`
- `apps/web/test/scenario-run-ui.test.ts`
- `apps/web/tsconfig.json`
- `apps/web/package.json`
- `apps/api/src/main.ts`
- `apps/api/src/app.module.ts`
- `apps/api/src/app.factory.ts`
- `apps/api/src/common/filters/http-exception.filter.ts`
- `apps/api/src/scenario-runs/scenario-runs.controller.ts`
- `apps/api/src/scenario-runs/scenario-runs.service.ts`
- `apps/api/src/scenario-runs/dto/create-scenario-run.dto.ts`
- `apps/api/test/scenario-runs.test.mjs`
- `apps/api/tsconfig.json`
- `apps/api/package.json`
- `packages/contracts/src/index.ts`
- `package-lock.json`

### Change Log

- 2026-04-14: Implemented Story 1.2 scenario run flow (UI + API + validation + tests); status moved to `review`.
- 2026-04-14: Story 1.2 reviewed and moved to `done`.
