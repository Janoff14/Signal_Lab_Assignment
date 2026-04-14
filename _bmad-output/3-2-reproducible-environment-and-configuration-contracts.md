# Story 3.2: Reproducible Environment and Configuration Contracts

Status: done

## Story

As a maintainer,  
I want complete environment examples and config documentation,  
so that the system runs in a fresh environment without code edits.

## Acceptance Criteria

1. Given env templates and setup docs, when I configure local environment from examples, then required app/DB/observability keys are documented and no secrets are hardcoded.
2. Given configuration is applied, when I start and verify the app, then integration wiring is stable and failures point to explicit troubleshooting guidance.

## Tasks / Subtasks

- [x] Expand root and app-level env examples with stack/observability variables.
- [x] Ensure compose and runtime configs consume documented env keys.
- [x] Preserve no-secrets-in-source baseline.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Extended `.env.example` with compose, observability, and frontend verification vars.
- Updated app-level env example templates for API and web.
- Kept sensitive values as placeholders/default local credentials only.

### File List

- `_bmad-output/3-2-reproducible-environment-and-configuration-contracts.md`
- `.env.example`
- `apps/api/.env.example`
- `apps/web/.env.local.example`
- `docker-compose.yml`

### Change Log

- 2026-04-14: Completed environment contract expansion for reproducible startup; moved to `done`.
