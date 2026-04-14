# Story 1.6: Baseline Accessibility and First-Time Reviewer Clarity

Status: done

## Story

As a first-time reviewer,  
I want the core run flow to be obvious and keyboard-operable,  
so that I can complete the primary task quickly and confidently.

## Acceptance Criteria

1. Given I land on the dashboard for the first time, when I scan the page, then the primary run action is visually clear in first viewport, and no hidden steps are required to execute a run.
2. Given I use keyboard-only navigation, when I move through scenario controls and submit action, then focus order is logical and visible, and controls/labels are semantically exposed for assistive technologies.

## Tasks / Subtasks

- [x] Preserve primary run action clarity in first viewport.
- [x] Keep flow linear and visible with no hidden navigation.
- [x] Add explicit starter guidance text for first-time reviewers.
- [x] Ensure scenario controls and submit action have semantic labels.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added explicit "Start here" guidance in scenario form.
- Connected scenario control to helper guidance with `aria-describedby`.
- Added explicit submit button label for assistive technologies.
- Core flow remains keyboard linear with visible, deterministic structure.

### File List

- `_bmad-output/1-6-baseline-accessibility-and-first-time-reviewer-clarity.md`
- `_bmad-output/sprint-status.yaml`
- `apps/web/src/app/page.tsx`

### Change Log

- 2026-04-14: Completed baseline accessibility and first-time clarity updates for Story 1.6; moved to `done`.
