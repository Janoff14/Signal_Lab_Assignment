---
name: story-executor
description: Execute one backlog story end-to-end with status discipline, validation, and reviewer-ready notes.
---

## When to Use

- User says "go ahead" or "dev this story" on story implementation.
- Sprint backlog needs continuous story execution.
- Orchestrator delegates an implementation task.

## Workflow
1. Move selected story to `in-progress` in sprint status.
2. Implement AC-driven code changes with minimal scope.
3. Run full validation suite.
4. Move story to `review`, perform review pass, then move to `done`.
5. Update story file with completion notes, file list, and change log.
