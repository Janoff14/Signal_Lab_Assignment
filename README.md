# Signal Lab

Signal Lab is a monorepo baseline for the assignment stack with:

- `apps/web` - Next.js App Router frontend
- `apps/api` - NestJS backend
- `packages/contracts` - shared contracts/types

## Bootstrap

1. Install dependencies:
   - `npm install`
2. Copy env templates:
   - `copy .env.example .env`
   - `copy apps\\api\\.env.example apps\\api\\.env`
   - `copy apps\\web\\.env.local.example apps\\web\\.env.local`
3. Ports:
   - Web reads `WEB_PORT` (fallback `PORT`, default `3000`)
   - API reads `PORT` (fallback `API_PORT`, default `3001`)
4. Run baseline structure check:
   - `npm run test:structure`
5. Run app-level checks:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`

## Run (Single Command Stack)

- Start all required services:
  - `npm run stack:up`
- Apply database migrations (first run only):
  - `docker compose exec api sh -lc "cd apps/api && npx prisma migrate deploy --schema prisma/schema.prisma"`
- Services started by compose:
  - Web (`http://localhost:3000`)
  - API (`http://localhost:3001`) — health: `GET /api/health`, Swagger: `/api/docs`
  - PostgreSQL (`localhost:5432`)
  - Prometheus (`http://localhost:9090`)
  - Loki (`http://localhost:3100`)
  - Grafana (`http://localhost:3002`) — opens without login; admin credentials: `admin` / `admin`

### Local dev without compose (optional)

- Web only: `npm run dev`
- API only: `npm run dev:api`

## Verify Observability

1. Open the app at `http://localhost:3000`.
2. Run `system_error` from the main scenario form.
3. Verify signals:
   - Metrics: `http://localhost:3001/metrics` and confirm `signal_lab_scenario_runs_total`.
   - Logs API: `http://localhost:3001/api/v1/observability/logs` and confirm a matching `runId`.
   - Signal summary: `http://localhost:3001/api/v1/observability/signals?runId=<RUN_ID>&scenarioType=system_error`.
   - Grafana path: `http://localhost:3000/grafana`.
   - Sentry events API: `http://localhost:3001/api/v1/observability/sentry-events`.
4. Confirm UI "Signal States" panel shows success states for metrics/logs/sentry on error runs.
5. Optional deterministic rehearsal:
   - `npm run verify:rehearsal`

## 15-Minute Reviewer Flow

1. `npm install`
2. `npm run stack:up`
3. `docker compose exec api sh -lc "cd apps/api && npx prisma migrate deploy --schema prisma/schema.prisma"`
4. Open `http://localhost:3000`
5. Run scenario `system_error`
6. Verify:
   - Metrics at `http://localhost:3001/metrics`
   - Logs at `http://localhost:3001/api/v1/observability/logs`
   - Signal summary at `http://localhost:3001/api/v1/observability/signals?runId=<RUN_ID>&scenarioType=system_error`
   - Grafana dashboard at `http://localhost:3002` (no login required)
   - Sentry events at `http://localhost:3001/api/v1/observability/sentry-events`
7. `npm run stack:down`

## Stop

- Stop the full stack:
  - `npm run stack:down`

## Troubleshooting

- If install fails, verify Node.js version is 20+.
- If workspace scripts fail, run `npm install` again at repository root.
- If metrics/logs are missing after a run, verify API is running on port `3001` and rerun `system_error`.
- If signal status remains pending, wait a few seconds and refresh the signal summary endpoint.
- If compose startup fails, run `docker compose logs` and check container health first.

## Cursor AI Layer

The repository is configured so a new Cursor chat can continue development without manual onboarding.

### Rules (`.cursor/rules/`) — 6 files

| File | What it fixes |
|------|--------------|
| `stack-and-boundaries.md` | Allowed/forbidden libraries, layer separation, shared contracts |
| `observability-verification.md` | Metric naming, log format, Sentry capture requirements, endpoint evidence |
| `story-delivery-workflow.md` | Story status discipline, validation suite, sprint status updates |
| `prisma-patterns.md` | Prisma-only data access, migration workflow, schema conventions |
| `frontend-patterns.md` | TanStack Query for server state, RHF for forms, shadcn/ui for components, Tailwind for styling |
| `error-handling.md` | Backend exception filters, Sentry capture for errors, frontend error feedback |

### Custom Skills (`.cursor/skills/`) — 4 skills

| Skill | When to use |
|-------|------------|
| `scenario-observability-check` | Verify metrics/logs/sentry after a scenario run |
| `story-executor` | Execute a backlog story end-to-end with status discipline |
| `submission-evidence-map` | Map rubric requirements to concrete repo evidence |
| `signal-lab-orchestrator` | Orchestrate PRD execution: analysis → scan → plan → decompose → implement → review → report |

### Commands (`.cursor/commands/`) — 3 commands

| Command | Purpose |
|---------|---------|
| `build-verify` | Run full build + lint + typecheck + test validation suite |
| `observability-rehearsal` | Trigger scenario and verify all observability signals |
| `submission-prep` | Prepare submission checklist and evidence mapping |

### Hooks (`.cursor/hooks/hooks.json`) — 2 hooks

| Hook | Trigger | Problem it solves |
|------|---------|------------------|
| `check-sprint-status.mjs` | beforeResponse | Prevents responses when sprint status file is missing or malformed |
| `check-readme-workflow.mjs` | beforeResponse | Ensures README always contains Run, Verify, and Stop sections |

### Marketplace Skills (`.agents/plugins/marketplace.json`) — 8 skills

| Skill | Rationale |
|-------|-----------|
| `nextjs` | App Router conventions, Server Components, data fetching patterns |
| `react-best-practices` | Component structure, hooks, accessibility, TypeScript patterns |
| `shadcn` | Component installation, composition, theming, Tailwind integration |
| `verification` | End-to-end flow verification: browser → API → data → response |
| `investigation-mode` | Structured debugging triage when observability checks fail |
| `observability` | Instrumentation, dashboards, OpenTelemetry, performance debugging |
| `workflow` | Durable orchestration patterns informing the orchestrator skill |
| `vercel-cli` | Deployment commands and environment variable management |

Custom skills cover Signal Lab-specific concerns (scenario observability, story execution, submission mapping, PRD orchestration) that marketplace skills do not address. Marketplace skills provide general framework and platform best practices.

### Orchestrator (`.cursor/skills/signal-lab-orchestrator/`)

The orchestrator skill accepts a PRD and runs 7 phases:

1. **PRD Analysis** (fast) — extract requirements and constraints
2. **Codebase Scan** (fast/explore) — understand current state vs PRD delta
3. **Planning** (default) — high-level implementation plan
4. **Decomposition** (default) — atomic tasks with model assignment
5. **Implementation** (fast 80% / default 20%) — execute tasks via subagents
6. **Review** (fast/readonly) — verify acceptance criteria per domain
7. **Report** (fast) — execution summary with completed/failed/next steps

State persists in `_bmad-output/orchestrator-context.json`. Restarting reads the context and continues from the first incomplete phase.

### PRD Documents (`prds/`)

| # | File | Scope |
|---|------|-------|
| 1 | `001_prd-platform-foundation.md` | Next.js + NestJS + Prisma + Docker scaffold |
| 2 | `002_prd-observability-demo.md` | Scenarios, metrics, logs, Grafana dashboards |
| 3 | `003_prd-cursor-ai-layer.md` | Skills, rules, commands, hooks, marketplace |
| 4 | `004_prd-orchestrator.md` | Small-model PRD orchestrator skill |
