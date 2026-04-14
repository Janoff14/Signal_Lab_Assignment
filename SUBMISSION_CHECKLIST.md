# Signal Lab — Submission Checklist

Заполни этот файл перед сдачей. Он поможет интервьюеру быстро проверить решение.

---

## Репозиторий

- **URL**: `https://github.com/Janoff14/Signal_Lab_Assignment.git`
- **Ветка**: `main`
- **Время работы** (приблизительно): `~6 часов 45 минут (15:26 – 22:11)`

---

## Запуск

```bash
# Команда запуска:
npm run stack:up

# Команда проверки:
npm run verify:rehearsal

# Команда остановки:
npm run stack:down

```

**Предусловия**: Docker Compose, Node.js 20+

---

## Стек — подтверждение использования

| Технология | Используется? | Где посмотреть |
|-----------|:------------:|----------------|
| Next.js (App Router) | ✅ | `apps/web/src/app/page.tsx`, `apps/web/src/app/grafana/page.tsx` |
| shadcn/ui | ✅ | `apps/web/src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `table.tsx`; used in `page.tsx` |
| Tailwind CSS | ✅ | `apps/web/package.json` |
| TanStack Query | ✅ | `apps/web/src/features/scenario-runs/hooks.ts` |
| React Hook Form | ✅ | `apps/web/src/app/page.tsx` |
| NestJS | ✅ | `apps/api/src/main.ts`, `apps/api/src/app.module.ts` |
| PostgreSQL | ✅ | `docker-compose.yml`, `apps/api/prisma/schema.prisma` |
| Prisma | ✅ | `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/` |
| Sentry | ✅ | `apps/api/src/observability/sentry.adapter.ts` |
| Prometheus | ✅ | `apps/api/src/observability/metrics.adapter.ts`, `infra/observability/prometheus/prometheus.yml` |
| Grafana | ✅ | `infra/observability/grafana/provisioning/`, `apps/web/src/app/grafana/page.tsx` |
| Loki | ✅ | `apps/api/src/observability/logs.adapter.ts`, `infra/observability/loki/loki-config.yml` |

---

## Observability Verification

Опиши, как интервьюер может проверить каждый сигнал:

| Сигнал | Как воспроизвести | Где посмотреть результат |
|--------|-------------------|------------------------|
| Prometheus metric | Run `system_error` from UI | `http://localhost:3001/metrics` (`signal_lab_scenario_runs_total`) |
| Grafana dashboard | Open `http://localhost:3002` (no login required, anonymous access enabled) | Signal Lab Overview dashboard with 6 panels: runs total, error rate, Loki logs table, total/error/success stats |
| Loki log | Run `system_error`, then query logs endpoint | `http://localhost:3001/api/v1/observability/logs` |
| Sentry exception | Run `system_error`, then query sentry events endpoint | `http://localhost:3001/api/v1/observability/sentry-events` |

---

## Evidence Mapping (Repo Paths)

| Requirement | Evidence Path(s) |
|-------------|------------------|
| Next.js App Router UI | `apps/web/src/app/page.tsx`, `apps/web/src/app/grafana/page.tsx` |
| TanStack Query + RHF | `apps/web/src/features/scenario-runs/hooks.ts`, `apps/web/src/app/page.tsx` |
| NestJS API orchestration | `apps/api/src/scenario-runs/scenario-runs.service.ts`, `apps/api/src/scenario-runs/scenario-runs.controller.ts` |
| PostgreSQL + Prisma | `apps/api/prisma/schema.prisma`, `apps/api/prisma/migrations/` |
| Prometheus metrics | `apps/api/src/observability/metrics.adapter.ts`, `apps/api/src/observability/observability.controller.ts` |
| Loki structured logs | `apps/api/src/observability/logs.adapter.ts` |
| Sentry error capture | `apps/api/src/observability/sentry.adapter.ts` |
| Grafana provisioning | `infra/observability/grafana/provisioning/`, `infra/observability/grafana/dashboards/signal-lab-overview.json` |
| Compose startup/stop | `docker-compose.yml`, `package.json` (`stack:up`, `stack:down`) |
| Verification rehearsal | `scripts/rehearsal-check.mjs`, `README.md` |

---

## Cursor AI Layer

### Custom Skills

| # | Skill name | Назначение |
|---|-----------|-----------|
| 1 | `scenario-observability-check` | Проверка signal chain по runId |
| 2 | `story-executor` | Единый flow выполнения story (in-progress -> review -> done) |
| 3 | `submission-evidence-map` | Маппинг требований к проверяемым артефактам |
| 4 | `signal-lab-orchestrator` | Оркестрация атомарных задач с resume-контекстом |

### Commands

| # | Command | Что делает |
|---|---------|-----------|
| 1 | `build-verify` | Полный quality gate прогон |
| 2 | `observability-rehearsal` | Проверка observability walkthrough |
| 3 | `submission-prep` | Финальная подготовка submission-артефактов |

### Hooks

| # | Hook | Какую проблему решает |
|---|------|----------------------|
| 1 | `validate-sprint-status` | Ловит повреждение структуры sprint-status перед ответом |
| 2 | `validate-readme-workflow` | Ловит пропажу секций run/verify/stop в README |

### Rules

| # | Rule file | Что фиксирует |
|---|----------|---------------|
| 1 | `stack-and-boundaries.md` | Обязательный стек и границы слоев |
| 2 | `observability-verification.md` | Signal verification требования |
| 3 | `story-delivery-workflow.md` | Дисциплина story-статусов и quality gates |
| 4 | `prisma-patterns.md` | Prisma-only data access, миграции, schema conventions |
| 5 | `frontend-patterns.md` | TanStack Query, RHF, shadcn/ui, Tailwind patterns |
| 6 | `error-handling.md` | Backend exception filters, frontend error feedback |

### Marketplace Skills

| # | Skill | Зачем подключён |
|---|-------|----------------|
| 1 | `nextjs` | App Router conventions, Server Components, data fetching |
| 2 | `react-best-practices` | Контроль качества TSX-компонентов |
| 3 | `shadcn` | Component installation, theming, Tailwind integration |
| 4 | `verification` | E2E проверка полного user flow |
| 5 | `investigation-mode` | Системная диагностика проблем в рантайме |
| 6 | `observability` | Instrumentation, dashboards, performance debugging |
| 7 | `workflow` | Шаблоны stepwise orchestration |
| 8 | `vercel-cli` | Deploy/env операции из терминала |

**Что закрыли custom skills, чего нет в marketplace:**
- Story lifecycle discipline tied to local BMad sprint status and artifacts.
- Project-specific observability verification against assignment endpoints/contracts.
- Submission evidence mapping directly against local rubric/checklist expectations.
- Local orchestrator resume model via `_bmad-output/orchestrator-context.json`.

---

## Orchestrator

- **Путь к skill**: `.cursor/skills/signal-lab-orchestrator/SKILL.md`
- **Путь к context file** (пример): `_bmad-output/orchestrator-context.json`
- **Сколько фаз**: `7` (PRD Analysis → Codebase Scan → Planning → Decomposition → Implementation → Review → Report)
- **Какие задачи для fast model** (80%+): schema edits, DTOs, simple endpoints, metrics/logs, UI components, docs, status updates
- **Поддерживает resume**: да

---

## Скриншоты / видео

- [x] UI приложения — see `evidence/ui-dashboard.png`
- [x] Grafana dashboard с данными — see `evidence/grafana-dashboard.png`
- [x] Loki logs — see `evidence/loki-logs.png`
- [x] Sentry error — see `evidence/sentry-events.png`

(Screenshots captured from live local stack after running both `system_error` and `success` scenarios.)

---

## Что не успел и что сделал бы первым при +4 часах

- Real Sentry SDK integration (`@sentry/node` init + `captureException`) for cloud-visible error capture instead of in-memory adapter.
- Promtail/Docker log driver integration for shipping container logs to Loki (currently using in-app structured log adapter).
- More Grafana dashboard panels: per-scenario latency percentiles, error rate over time by scenario type.
- E2E Playwright tests for the full reviewer flow (run scenario -> verify signals -> check history).
- Database seed script for demo-ready initial state.

---

## Вопросы для защиты (подготовься)

1. Почему именно такая декомпозиция skills?
2. Какие задачи подходят для малой модели и почему?
3. Какие marketplace skills подключил, а какие заменил custom — и почему?
4. Какие hooks реально снижают ошибки в повседневной работе?
5. Как orchestrator экономит контекст по сравнению с одним большим промптом?
