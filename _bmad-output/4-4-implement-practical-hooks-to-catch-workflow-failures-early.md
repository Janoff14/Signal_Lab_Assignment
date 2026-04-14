# Story 4.4: Implement Practical Hooks to Catch Workflow Failures Early

Status: done

## Story

As a maintainer,  
I want hooks that detect realistic mistakes during development,  
so that defects are caught before they propagate.

## Acceptance Criteria

1. Given hooks are configured, when trigger events occur, then at least two practical checks run with actionable failures.
2. Given known workflow issue occurs, when hook executes, then issue is surfaced immediately with explicit remediation path.

## Tasks / Subtasks

- [x] Add sprint status integrity hook.
- [x] Add README workflow section integrity hook.
- [x] Register hooks in shared hook manifest.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added hook scripts and hook registry to detect missing sprint-status structure and README workflow drift.

### File List

- `.cursor/hooks/hooks.json`
- `.cursor/hooks/check-sprint-status.mjs`
- `.cursor/hooks/check-readme-workflow.mjs`

### Change Log

- 2026-04-14: Added practical hooks and completed Story 4.4.
