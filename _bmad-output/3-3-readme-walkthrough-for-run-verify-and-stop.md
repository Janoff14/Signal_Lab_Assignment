# Story 3.3: README Walkthrough for Run, Verify, and Stop

Status: done

## Story

As a reviewer,  
I want a concise end-to-end walkthrough in README,  
so that I can validate the assignment quickly within the timebox.

## Acceptance Criteria

1. Given I open README with no project context, when I follow run/verify/stop instructions, then I can complete primary verification end-to-end with concrete expected outcomes.
2. Given one verification step fails, when I follow troubleshooting notes, then I can recover deterministically or record a clear blocked reason.

## Tasks / Subtasks

- [x] Update README with deterministic bootstrap and one-command stack startup.
- [x] Add explicit verify flow and evidence expectations.
- [x] Add explicit stop command and troubleshooting guidance.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- README now documents bootstrap, stack startup, verification walkthrough, and shutdown.
- Added troubleshooting updates for compose and signal verification gaps.
- Added optional rehearsal command for repeatable validation.

### File List

- `_bmad-output/3-3-readme-walkthrough-for-run-verify-and-stop.md`
- `README.md`
- `package.json`

### Change Log

- 2026-04-14: Completed README walkthrough for run/verify/stop lifecycle; moved to `done`.
