# Story 3.1: One-Command Infrastructure Startup and Shutdown

Status: done

## Story

As a maintainer,  
I want a single command to start and stop the full required stack,  
so that setup is deterministic and reviewer-friendly.

## Acceptance Criteria

1. Given a clean clone and documented prerequisites, when I run startup command, then required services become operational with no hidden steps.
2. Given services are running, when I run stop command, then stack shuts down cleanly and startup remains deterministic.

## Tasks / Subtasks

- [x] Add root `docker-compose.yml` with app + observability + DB services.
- [x] Add root scripts for one-command startup/shutdown.
- [x] Ensure service ports are explicit and reviewer-discoverable.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added compose services for web, api, postgres, prometheus, loki, and grafana.
- Added scripts `stack:up` and `stack:down` in root `package.json`.
- Wired environment-driven ports for deterministic startup.

### File List

- `_bmad-output/3-1-one-command-infrastructure-startup-and-shutdown.md`
- `docker-compose.yml`
- `package.json`

### Change Log

- 2026-04-14: Added one-command stack startup/shutdown workflow; moved to `done`.
