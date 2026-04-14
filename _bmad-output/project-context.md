---
project_name: 'Signal Lab Assignment'
user_name: 'BMad'
date: '2026-04-14'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
existing_patterns_found: 0
status: 'complete'
rule_count: 41
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Stack is locked unless a strong written justification is provided.
- Frontend must use: Next.js (App Router), Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form.
- Backend must use: NestJS.
- Data layer must use: PostgreSQL with Prisma (schema + migrations required).
- Observability must include: Prometheus, Loki, Grafana, Sentry.
- Infrastructure must run with Docker Compose via `docker compose up -d`.
- Verification endpoints/paths must remain testable:
  - UI: `http://localhost:3000`
  - Metrics: `http://localhost:3001/metrics`
  - Loki: `http://localhost:3100`
  - Grafana via app path: `http://localhost:3000/grafana`

## Critical Implementation Rules

### Language-Specific Rules

- Use one language strategy consistently per app package; avoid arbitrary TS/JS mixing.
- If TypeScript is selected for a package, keep strict typing at module boundaries (API DTOs, service outputs, query/mutation contracts).
- Keep null/undefined handling explicit in scenario execution and observability payloads.
- Prefer async/await for IO flows; avoid mixed `.then()` chains in request handlers and instrumentation paths.
- Fail loudly on scenario errors: capture to Sentry and return explicit API error responses.
- Keep import layering stable:
  - frontend UI -> API client/hooks -> shared types/contracts
  - backend controller -> service -> infra adapters (db/metrics/logging/error)
- Never silently swallow exceptions; log structured context and rethrow or map to explicit HTTP errors.

### Framework-Specific Rules

- Next.js app must expose a single clear scenario trigger flow:
  - RHF form for scenario selection/input
  - TanStack Query mutation for execution
  - history query for latest runs
- Keep frontend thin: no direct DB or observability vendor calls from UI components.
- NestJS owns orchestration: controller validates input, service executes scenario, adapters emit signals.
- Every scenario execution path must emit all three observability outputs:
  - metric (Prometheus),
  - structured log (Loki path),
  - error/event (Sentry when applicable).
- Prisma writes happen before success response; include run identifier in response for traceability.
- UI must provide explicit verification links used by reviewer flow:
  - `/` for run action
  - `/grafana` link/path from app
  - clear references to metrics and Loki endpoints in UI/docs.
- Keep scenario logic deterministic and demo-friendly (no hidden randomness that breaks verification).

### Testing Rules

- Keep one mandatory smoke path that mirrors interviewer flow:
  - start stack,
  - run `system_error`,
  - verify metric/log/dashboard/Sentry signal.
- Backend tests must cover scenario service behavior:
  - persistence attempted,
  - metric emission called,
  - log emission called,
  - Sentry capture called for error scenario.
- Do not over-invest in broad test suites before thin slice is stable.
- Prefer deterministic assertions over timing-fragile checks (avoid flaky sleeps when possible).
- Any test/mock around observability adapters must assert payload shape includes scenario/run identifiers.
- Before submission, run one manual end-to-end verification from clean startup and record exact results in checklist.

### Code Quality & Style Rules

- Prefer small, single-purpose modules over large multi-responsibility files.
- Keep observability concerns explicit and centralized (metrics/logging/sentry adapters), not scattered inline.
- Use consistent naming for scenario/run identifiers across frontend, backend, logs, and metrics labels.
- Keep API contracts stable and documented in code (DTO/schema/types), then align frontend queries/mutations to those contracts.
- Avoid "magic" constants for scenario names, ports, or dashboard paths; define shared constants/config.
- Comments should explain non-obvious intent only (especially around observability and orchestration boundaries).
- Do not introduce abstractions that hide assignment-required behavior from reviewers.

### Development Workflow Rules

- Implement in thin vertical slices; each slice must be demonstrable end-to-end before expanding scope.
- Keep task decomposition explicit for AI execution:
  - task goal,
  - files touched,
  - acceptance check,
  - handoff note for next step.
- Prioritize P0 pass criteria over optional polish when scope pressure appears.
- Any major change to stack/tooling requires a written rationale in docs before implementation.
- Keep README/checklist updated continuously, not only at the end.
- Before considering a task complete, verify with command + UI action + observable output.
- Ensure `.cursor` artifacts are operational in fresh-chat conditions (no hidden assumptions).

### Critical Don't-Miss Rules

- Do not claim observability is working unless all required signals are verifiably produced after a real UI-triggered scenario run.
- Do not replace required stack components without strong documented justification (penalty risk).
- Do not ship a "demo-only" flow that bypasses persistence or instrumentation paths.
- Do not hide reviewer-critical behavior behind undocumented scripts or implicit local setup.
- Do not leave `.cursor` assets as templates; each rule/skill/command/hook must map to a real workflow problem.
- Do not let orchestrator become a generic planner; it must decompose work for small-model execution and preserve resumable context.
- Do not submit without a clean from-scratch verification run matching the 15-minute reviewer flow.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow all rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file when new patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update when technology stack or verification flow changes.
- Review periodically and remove rules that become obvious.
- Keep rule wording concrete and testable.

Last Updated: 2026-04-14
