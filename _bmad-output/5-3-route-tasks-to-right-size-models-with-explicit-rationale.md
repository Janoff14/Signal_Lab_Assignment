# Story 5.3: Route Tasks to Right-Size Models with Explicit Rationale

Status: done

## Story

As a maintainer,  
I want orchestrator-level model routing guidance,  
so that simple tasks use fast models and complex tasks use stronger reasoning efficiently.

## Acceptance Criteria

1. Given orchestration task list, when model assignment is made, then each task has explicit routing rationale based on complexity and risk.
2. Given reviewer inspects outputs, when model choices are evaluated, then routing decisions are auditable and practical.

## Tasks / Subtasks

- [x] Define routing policy for fast vs stronger models.
- [x] Add model-tier metadata to context artifact tasks.
- [x] Add rationale guidance in orchestrator skill.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added model-routing guidance to orchestrator skill separating fast tasks from stronger-reasoning tasks.
- Added model-tier metadata in context artifact for auditable routing decisions.

### File List

- `.cursor/skills/signal-lab-orchestrator/SKILL.md`
- `_bmad-output/orchestrator-context.json`

### Change Log

- 2026-04-14: Added model routing rationale and completed Story 5.3.
