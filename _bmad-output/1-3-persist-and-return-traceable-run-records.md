# Story 1.3: Persist and Return Traceable Run Records

Status: done

## Story

As a maintainer,  
I want each run saved with stable identifiers and metadata,  
so that every execution is auditable and consistent across layers.

## Acceptance Criteria

1. Given a valid scenario run request is accepted, when backend orchestration executes, then a run record is persisted via Prisma/PostgreSQL before success response, and response returns stable contract fields including run ID, scenario type, status, and timestamps.
2. Given a run record exists, when I inspect persisted data and API payload, then scenario/run naming conventions are consistent, and contract shape matches frontend expectations without datastore coupling.

## Tasks / Subtasks

- [x] Add Prisma/PostgreSQL persistence model for scenario runs (AC: 1,2)
  - [x] Introduce Prisma schema/model for `ScenarioRun` with deterministic `runId`, `scenarioType`, `status`, `createdAt`, `updatedAt`.
  - [x] Map DB naming conventions to architecture (`scenario_runs`, `run_id`, `scenario_type`, etc.).
  - [x] Add first migration artifact and wire Prisma client bootstrap in API package.
- [x] Refactor run orchestration to persist before API success return (AC: 1)
  - [x] Introduce repository boundary (`scenario-runs.repository`) and call from service layer.
  - [x] Ensure create flow ordering: validate -> persist -> return response envelope.
  - [x] Keep controller thin; no direct persistence logic in controller.
- [x] Align contract payload and naming consistency (AC: 2)
  - [x] Ensure API response contract and web client parsing use shared contract types.
  - [x] Keep naming consistent across DTO/service/repository/response (`runId`, `scenarioType`, `createdAt`).
  - [x] Avoid datastore leakage to frontend (no Prisma-specific shapes in web).
- [x] Add tests proving persistence and contract shape behavior (AC: 1,2)
  - [x] Service/repository test: persistence attempted before success payload.
  - [x] API test: response includes stable contract fields and expected envelope.
  - [x] Naming/shape assertions in tests to prevent regression in contracts.

## Dev Notes

### Epic Context

- Story 1.3 builds on 1.2’s working run trigger path and makes it auditable by persisting runs.
- This story is prerequisite for:
  - Story 1.4 lifecycle clarity tied to persisted run identity
  - Story 1.5 history rendering from stored runs

### Story Foundation (from epics)

- Persistence is mandatory before success response.
- Response contract must remain stable for frontend use.
- Identifiers must be consistent for traceability across future observability stories.

### Technical Requirements

- Data layer must use PostgreSQL with Prisma (schema + migration artifacts).
- Backend layering remains controller -> service -> repository/infra.
- API contract continues success envelope with stable run fields.
- Keep strict typing at boundaries; no null/undefined ambiguity for core fields.

### Architecture Compliance

- Follow existing API namespace and envelope patterns (`/api/v1`, `{ data: ... }`).
- Add repository abstraction in `apps/api/src/scenario-runs/*` per architecture.
- Keep DB/internal snake_case mapping in schema while API remains camelCase.
- Preserve deterministic behavior and explicit error mapping.

### File Structure Requirements (expected touch points)

- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/migrations/*` (initial scenario-runs migration artifact)
- `apps/api/src/scenario-runs/scenario-runs.repository.ts`
- `apps/api/src/scenario-runs/scenario-runs.service.ts`
- `apps/api/src/scenario-runs/scenario-runs.controller.ts` (contract alignment only)
- `packages/contracts/src/*` (if contract refinements needed)
- tests under `apps/api/test/*`

### Testing Requirements

- Validate persistence ordering in service flow.
- Validate response shape and naming in API integration tests.
- Keep root quality gates green:
  - `npm run test:structure`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`

### Previous Story Intelligence (1.2)

- Reuse single run endpoint path and envelope contract already implemented.
- Keep inline actionable errors and deterministic behavior already established.
- Preserve real checks and avoid placeholders (enforced by structure check).
- Maintain shared contract approach; do not duplicate type definitions in web/api.

### Latest Technical Notes

- Current architecture already targets Prisma 7.x and PostgreSQL; this story should instantiate that decision.
- Keep repository boundary explicit to avoid locking service logic directly to ORM details.
- Persist first, then respond; this ordering is acceptance-critical.

### Project Context Reference

- Stack is locked; do not replace Prisma/PostgreSQL with alternatives.
- Naming consistency across layers is required for future observability correlation.
- Keep implementation in thin vertical slice with demonstrable acceptance checks.

### References

- [Source: `_bmad-output/epics.md` - Epic 1, Story 1.3]
- [Source: `_bmad-output/architecture.md` - Data architecture, API layering, naming patterns]
- [Source: `_bmad-output/prd.md` - FR24/FR25/FR27]
- [Source: `_bmad-output/project-context.md` - framework + testing + quality guardrails]
- [Source: `_bmad-output/1-2-run-a-scenario-from-the-main-ui.md` - previous implementation learnings]

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Debug Log References

- Story auto-selected from sprint backlog order: `1-3-persist-and-return-traceable-run-records`.
- Context loaded from epics, architecture, PRD, project context, and previous Story 1.2.

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story prepared with explicit persistence ordering, schema/repository boundaries, and test guardrails.
- Implemented Prisma schema + initial migration artifact for `ScenarioRun`.
- Added `ScenarioRunsRepository` with Prisma-backed persistence path and deterministic fallback for local test mode.
- Refactored scenario run flow to repository-backed async persistence before response envelope return.
- Extended run summary contract with `updatedAt` for stable timestamp fields.
- Validation suite passed: structure, lint, typecheck, tests, and build across all workspaces.
- Code review completed; no additional patch findings required.

### File List

- `_bmad-output/1-3-persist-and-return-traceable-run-records.md`
- `_bmad-output/sprint-status.yaml`
- `apps/api/package.json`
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/migrations/20260414195500_init_scenario_runs/migration.sql`
- `apps/api/prisma/migrations/migration_lock.toml`
- `apps/api/src/app.module.ts`
- `apps/api/src/scenario-runs/scenario-runs.controller.ts`
- `apps/api/src/scenario-runs/scenario-runs.repository.ts`
- `apps/api/src/scenario-runs/scenario-runs.service.ts`
- `apps/api/test/scenario-runs.test.mjs`
- `packages/contracts/src/index.ts`
- `package-lock.json`

### Change Log

- 2026-04-14: Implemented Story 1.3 persistence + contract updates; status moved to `review`.
- 2026-04-14: Story 1.3 reviewed and moved to `done`.
