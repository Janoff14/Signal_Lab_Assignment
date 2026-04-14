---
name: signal-lab-orchestrator
description: Accept a PRD, decompose it into atomic tasks, route by model complexity, persist state for resume, and produce a handoff report.
---

## When to Use

- A PRD or multi-story request needs end-to-end execution.
- A request spans multiple layers (database, backend, frontend, infra, observability).
- Session continuity and resumable execution are required.
- User says "run PRD", "execute this PRD", or "orchestrate this".

## Context Artifact

- Path: `_bmad-output/orchestrator-context.json`
- Created on first run; read and continued on subsequent runs.
- Structure:

```json
{
  "executionId": "<timestamp>",
  "prdPath": "prds/<prd-file>.md",
  "status": "in_progress",
  "currentPhase": "implementation",
  "phases": {
    "analysis":       { "status": "completed", "result": "..." },
    "codebase_scan":  { "status": "completed", "result": "..." },
    "planning":       { "status": "completed", "result": "..." },
    "decomposition":  { "status": "completed", "result": "..." },
    "implementation": { "status": "in_progress", "completedTasks": 5, "totalTasks": 8 },
    "review":         { "status": "pending" },
    "report":         { "status": "pending" }
  },
  "tasks": [
    {
      "id": "task-001",
      "title": "Add ScenarioRun model to Prisma schema",
      "type": "database",
      "complexity": "low",
      "model": "fast",
      "status": "completed"
    }
  ],
  "nextAction": "Continue implementation from task-006"
}
```

## Phases

### Phase 1 — PRD Analysis (fast model)
1. Read the provided PRD file.
2. Extract: functional requirements, acceptance criteria, constraints, dependencies.
3. Write analysis summary to `context.json` → `phases.analysis.result`.

### Phase 2 — Codebase Scan (fast model, explore subagent)
1. Scan current project structure, existing modules, schemas, and configs.
2. Identify what already exists vs what the PRD requires.
3. Write delta summary to `context.json` → `phases.codebase_scan.result`.

### Phase 3 — Planning (default model)
1. Design high-level implementation plan: order of changes, affected layers.
2. Identify integration points and risk areas.
3. Write plan to `context.json` → `phases.planning.result`.

### Phase 4 — Decomposition (default model)
1. Break plan into atomic tasks (5–10 min each, 1–3 sentence description).
2. Assign each task: `type` (database / backend / frontend / infra / docs), `complexity` (low / medium / high), `model` (fast / default).
3. Set dependency order. Write task list to `context.json` → `tasks[]`.

### Phase 5 — Implementation (fast 80% / default 20%)
1. For each task in dependency order:
   a. Read current `context.json`, find first `pending` task.
   b. Form a focused prompt for a subagent (include only the task, relevant files, and acceptance check).
   c. Launch subagent via Task tool with the assigned model.
   d. On success: mark task `completed`, update `context.json`.
   e. On failure: mark `failed`, log error, continue to next independent task.
2. After each batch, update `phases.implementation.completedTasks`.

### Phase 6 — Review (fast model, readonly subagent)
1. For each domain (database, backend, frontend):
   a. Launch a reviewer subagent that checks acceptance criteria.
   b. If review fails: launch implementer with feedback, retry up to 3 times.
   c. After 3 failures: mark task as `failed`, continue.
2. Write review results to `context.json` → `phases.review.result`.

### Phase 7 — Report (fast model)
1. Generate final execution report:
   - Tasks: N completed, M failed, K retries.
   - Model usage breakdown: fast vs default.
   - Completed items list.
   - Failed items with reason.
   - Suggested next steps.
2. Write report to `context.json` → `phases.report.result` and output to user.

## Model Routing Guidance

**fast model** (target 80%+ of tasks):
- Add field to Prisma schema, run migration.
- Create DTO with validation.
- Create simple CRUD endpoint.
- Add Prometheus metric or structured log call.
- Create UI component without complex logic.
- Write/update tests, docs, status files.

**default model** (remaining 20%):
- Architecture planning and trade-off decisions.
- Complex business logic spanning multiple services.
- Integration of multiple systems (e.g., wiring Sentry + metrics + logs together).
- Review passes requiring cross-layer analysis.

## Resume Behavior

1. Read `_bmad-output/orchestrator-context.json`.
2. Find `currentPhase` — resume from the first incomplete phase.
3. Within implementation, continue from first `pending` task.
4. Never re-run `completed` phases or tasks unless explicitly marked `retry`.
5. If context file is missing, start fresh from Phase 1.

## Skills Used by Orchestrator

- `scenario-observability-check` — verify signals after implementation.
- `story-executor` — execute individual implementation tasks.
- `submission-evidence-map` — validate completeness at the end.
- Marketplace skills for domain-specific guidance (Next.js, NestJS, Prisma, shadcn/ui, etc.).

## Final Report Format

```
Signal Lab PRD Execution — Complete

Tasks: 12 completed, 1 failed, 2 retries
Duration: ~25 min
Model usage: 10 fast, 3 default

Completed:
  ✓ Prisma schema + migration
  ✓ ScenarioService + Controller
  ✓ Prometheus metrics
  ✓ Structured logging
  ✓ Sentry integration
  ✓ Frontend scenario form
  ✓ Run history list
  ✓ Grafana dashboard

Failed:
  ✗ Loki log panel (max retries)

Next steps:
  - Fix Loki panel manually
  - Run verification walkthrough
```
