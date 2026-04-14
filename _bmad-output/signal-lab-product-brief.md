# Signal Lab Assignment Product Brief

## 1) Brief Overview

**Initiative:** Signal Lab - AI Engineer test assignment  
**Type:** Internal evaluation project (non-commercial)  
**Primary audience:** Technical interviewer/reviewer  
**Decision this brief supports:** Whether the candidate demonstrates production-grade engineering, practical observability execution, and strong AI workflow architecture under a strict timebox.

Signal Lab is a compact observability playground where an interviewer can run a scenario from a web UI and verify resulting metrics, logs, and errors across Prometheus, Loki, Grafana, and Sentry. The repository must also include a practical Cursor AI layer (`rules`, `skills`, `commands`, `hooks`, marketplace integrations) and an orchestrator skill that decomposes tasks to preserve context and delegate most execution to smaller models.

## 2) Objectives and Success Criteria

### Core objectives

1. Build a working full-stack app on the required stack.
2. Make observability manually verifiable in minutes (not just described in docs).
3. Prove AI architecture quality through reusable Cursor artifacts.
4. Demonstrate context economy through orchestrated decomposition.

### Success criteria (pass/fail)

- `docker compose up -d` starts required services with minimal manual steps.
- UI works at `http://localhost:3000`.
- Running `system_error` produces:
  - DB persistence via Prisma/PostgreSQL
  - metric visible at `http://localhost:3001/metrics`
  - log visible in Loki (`http://localhost:3100`)
  - error captured in Sentry
  - signal visible in Grafana (via `http://localhost:3000/grafana`)
- `.cursor/` contains required rules, skills, commands, hooks, marketplace mapping, and orchestrator.
- Reviewer can validate outcome in approximately 15 minutes.

## 3) Scope

### In scope

- Frontend: Next.js (App Router), Tailwind, shadcn/ui, TanStack Query, React Hook Form.
- Backend: NestJS API for scenario execution and history retrieval.
- Data: PostgreSQL + Prisma schema/migrations.
- Observability: Prometheus metrics, Loki logging, Grafana dashboards, Sentry exception capture.
- Infra: Docker Compose for one-command startup.
- AI Layer: Custom Cursor rules/skills/commands/hooks + orchestrator + marketplace integrations.
- Documentation: README, AI-layer explanation, demo steps, submission checklist.

### Out of scope

- Feature-rich product UX beyond assignment needs.
- Broad scenario catalog if it compromises core reliability.
- Non-required platform integrations not tied to evaluation criteria.

## 4) Constraints and Principles

- Required stack substitutions are penalized unless strongly justified.
- Timebox: target 6-8 hours, maximum 12.
- Priority rule if time slips: working core + deep decomposition over broad but shallow coverage.
- Documentation must be testable and concise ("click this -> open this URL -> see this result").

## 5) Proposed Solution Summary

### System flow

1. User selects and runs a scenario from Signal Lab UI.
2. API persists run record in PostgreSQL via Prisma.
3. API emits:
   - metric to Prometheus endpoint,
   - structured logs for Loki ingestion/query,
   - exception/event to Sentry for error scenarios.
4. Reviewer verifies signals in Grafana/Loki/Prometheus/Sentry.

### Thin-slice first strategy

First ship one complete scenario (`system_error`) end-to-end with all signals and verification links. Expand only after this gold path is reliable.

## 6) Cursor AI Layer Strategy

### Intended outcomes

- New chats can continue execution predictably without hidden context.
- Work is split into atomic tasks suitable for faster/smaller models.
- Guardrails prevent drift from required stack and observability contract.

### Required components

- `rules/`: stack lock, architecture boundaries, observability contract.
- `skills/` (>=3): includes observability verification and orchestrator.
- `commands/` (>=3): workflow shortcuts for build/verify/submission.
- `hooks/` (>=2): enforce common quality gates.
- Marketplace skills (>=6): connected and justified.
- Orchestrator skill: phased decomposition, delegation policy, context-saving/resume behavior.

## 7) Delivery Plan

### Phase 1 - Foundation

- Compose stack + service wiring
- NestJS + Prisma baseline
- Next.js shell

### Phase 2 - Observability Core

- Scenario run endpoint + persistence
- Metrics/logs/errors instrumentation
- Grafana datasource/dashboard provisioning

### Phase 3 - AI Layer

- Rules, skills, commands, hooks
- Marketplace mappings + rationale
- Orchestrator behavior and context artifacts

### Phase 4 - Submission Hardening

- README and demo steps polish
- PRD package (`001`-`004`)
- Submission checklist completion

## 8) Risks and Mitigations

- **Risk:** Docker startup instability across services.  
  **Mitigation:** Health checks, clear dependencies, simple startup order.

- **Risk:** Observability wiring partially works but not reviewer-verifiable.  
  **Mitigation:** Build around explicit URL-based acceptance checks early.

- **Risk:** AI layer appears decorative rather than operational.  
  **Mitigation:** Tie each artifact to a real workflow and quality gate.

- **Risk:** Time overrun.  
  **Mitigation:** Lock thin slice first; defer optional enhancements.

## 9) Reviewer Demo Script (Target <= 15 min)

1. Start stack: `docker compose up -d`
2. Open UI: `http://localhost:3000`
3. Run `system_error`
4. Verify:
   - metric at `http://localhost:3001/metrics`
   - log in Loki at `http://localhost:3100`
   - dashboard via `http://localhost:3000/grafana`
   - issue/event in Sentry
5. Inspect `.cursor/` artifacts and run orchestrator in a fresh chat.

## 10) Deliverables Checklist

- Working app + compose
- Prisma schema + migrations
- Grafana dashboard (provisioned/importable)
- README (run/test/stop)
- AI layer documentation
- PRD package:
  - `prds/001_prd-platform-foundation.md`
  - `prds/002_prd-observability-demo.md`
  - `prds/003_prd-cursor-ai-layer.md`
  - `prds/004_prd-orchestrator.md`
- Completed submission checklist
