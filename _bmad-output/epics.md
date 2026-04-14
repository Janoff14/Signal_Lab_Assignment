---
stepsCompleted:
  - step-01-validate-prerequisites
inputDocuments:
  - _bmad-output/prd.md
  - _bmad-output/architecture.md
  - _bmad-output/ux-design-specification.md
  - ASSIGNMENT.md
  - RUBRIC.md
  - SUBMISSION_CHECKLIST.md
---

# Signal Lab Assignment - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Signal Lab Assignment, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: User can select a supported scenario type and submit a run request from the main UI.
FR2: System validates scenario run input before execution begins.
FR3: System executes the selected scenario through a single orchestration path.
FR4: System assigns a unique run identifier to each scenario execution.
FR5: User can view execution outcome state for each submitted run (success/failure).
FR6: User can view history of recent scenario runs.
FR7: User can inspect run metadata including scenario type, status, timestamp, and run identifier.
FR8: System preserves run records for later verification and troubleshooting.
FR9: Maintainer can correlate a run across persistence and observability outputs using shared identifiers.
FR10: System emits Prometheus-compatible metrics for scenario execution events.
FR11: System emits structured logs suitable for Loki ingestion for each run.
FR12: System captures and reports error events to Sentry for failure scenarios.
FR13: Required observability signals are produced from real UI-triggered executions.
FR14: Observability outputs are associated with initiating run identifier and scenario type.
FR15: User can access explicit verification links/paths for metrics, logs, and dashboard views.
FR16: User can verify metric signal presence through documented metrics endpoint.
FR17: User can verify log signal presence through documented Loki flow.
FR18: User can verify dashboard visibility of run-related signals via Grafana path.
FR19: User can verify error capture presence in Sentry for designated error scenarios.
FR20: Maintainer can start all required services with a single documented compose command.
FR21: Maintainer can stop the full stack with a single documented command.
FR22: System runs with required stack components and preserves assignment technology boundaries.
FR23: Maintainer can provision and run application in clean environment using repository docs.
FR24: System persists scenario run records to PostgreSQL through Prisma.
FR25: System returns consistent run response contracts usable by frontend workflows.
FR26: Frontend consumes backend run and history contracts without direct datastore coupling.
FR27: System enforces stable scenario type and run identifier naming across UI/API/logs/metrics.
FR28: First-time reviewer can complete core scenario run flow without hidden navigation steps.
FR29: UI presents clear request lifecycle states (idle/loading/success/error).
FR30: Reviewer receives actionable recovery guidance when verification step fails.
FR31: UI keeps core controls keyboard-accessible and semantically labeled.
FR32: README enables running, verifying, and stopping the system end-to-end.
FR33: Submission package documents stack usage evidence for required technologies.
FR34: Submission package documents observability verification steps for each required signal type.
FR35: Submission checklist is completable with traceable implementation references.
FR36: Rule artifacts are available to enforce stack and workflow guardrails in AI-assisted development.
FR37: Custom skills are available to execute recurring project workflows, including observability workflows.
FR38: Command shortcuts are available for common build/verify/submission workflows.
FR39: Hooks are available to catch practical workflow issues early.
FR40: Integrated marketplace skills are identifiable and justified in workflow.
FR41: Orchestrator skill can decompose work into atomic tasks.
FR42: Orchestrator preserves and reuses context artifacts to continue across sessions.
FR43: Orchestrator routes suitable subtasks to smaller/faster models while preserving coherence.
FR44: Orchestrator produces readable execution summary for handoff and review.

### NonFunctional Requirements

NFR1: Scenario submission to API acknowledgment completes within 2 seconds in normal local demo conditions.
NFR2: Run history retrieval and render completes within 2 seconds for typical dataset size.
NFR3: Verification pages/paths are navigable without blocking waits longer than 5 seconds per step.
NFR4: UX feedback state is shown immediately on user action.
NFR5: Clean startup using documented commands reliably brings required services operational with no hidden steps.
NFR6: Mandatory verification walkthrough is repeatable end-to-end across runs.
NFR7: Scenario execution failures produce explicit user-visible outcomes.
NFR8: Observability verification path remains operational for each required signal type.
NFR9: Required integrations (PostgreSQL/Prisma, Prometheus, Loki, Grafana, Sentry) remain consistently wired.
NFR10: Integration configuration is externally configurable and documented.
NFR11: Cross-system traceability is preserved via consistent identifiers.
NFR12: Integration failures are diagnosable via documented endpoints/logs/troubleshooting.
NFR13: Core workflow controls are keyboard-accessible.
NFR14: Main flow form/action elements expose clear semantic labels.
NFR15: Focus visibility is preserved in core interactive paths.
NFR16: Core flow readability and contrast meet baseline usability.
NFR17: Architecture maintains clear module boundaries for low-risk changes.
NFR18: Code and docs remain aligned so a new maintainer can run and verify using repo guidance only.
NFR19: Scenario/run identifier naming remains consistent across UI, API, persistence, logs, and metrics.
NFR20: Troubleshooting guidance exists for common verification failures.
NFR21: No secrets or credentials are hardcoded in committed source.
NFR22: Sensitive configuration is provided through environment variables with setup docs.
NFR23: Error handling does not expose sensitive internals in user-facing paths.
NFR24: System design supports adding scenarios/observability extensions without core redesign.
NFR25: Core flows remain stable under expected low-concurrency assignment load.
NFR26: Modular boundaries support future scale-up work without full rewrite.

### Additional Requirements

- Use required stack exactly: Next.js App Router, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, NestJS, PostgreSQL/Prisma, Prometheus, Loki, Grafana, Sentry, Docker Compose.
- Provide deterministic one-command startup using `docker compose up -d` and a single-command shutdown path.
- Keep frontend thin; orchestration and integrations belong to backend service layer.
- Use a single authoritative scenario execution path that performs validation, persistence, and observability emission.
- Emit all required observability outputs on execution path: metric, structured log, and Sentry event for error scenario.
- Persist run before returning success response and include run identifier in response.
- Preserve run-id and scenario-type correlation across DB rows, metrics labels, logs, and Sentry context.
- Provide reviewer-verifiable endpoints/paths: `http://localhost:3000`, `http://localhost:3001/metrics`, `http://localhost:3100`, and `http://localhost:3000/grafana`.
- Keep scenario behavior deterministic and demo-friendly (no hidden random behavior that breaks verification).
- Support clean API contracts with stable DTOs and explicit error envelope mapping.
- Use modular project boundaries aligned to web app, API, contracts, and observability adapters.
- Implement committed Prisma schema and migrations for reproducible setup.
- Provide explicit troubleshooting flow for delayed/missing signals.
- Make docs/checklist first-class deliverables, not optional artifacts.
- Implement required Cursor AI layer artifacts: rules, at least 3 custom skills (including observability), at least 3 commands, at least 2 hooks, at least 6 marketplace skills with rationale.
- Implement orchestrator skill with atomic decomposition, context artifact for resume, model-selection rationale, and readable final report.
- Prioritize assignment-critical paths under timebox; optional polish should not block verification completeness.
- Starter template decision captured in architecture: monorepo baseline (Turborepo) with separate `apps/web` and `apps/api`.

### UX Design Requirements

UX-DR1: Implement a desktop-first dashboard with explicit action-to-status-to-verification hierarchy.
UX-DR2: Keep a single clear primary entry action for scenario execution in first viewport.
UX-DR3: Provide immediate run acknowledgment and explicit lifecycle states (`idle`, `loading/running`, `success`, `error`).
UX-DR4: Add a persistent high-visibility run status strip with run ID, scenario, state, and last-updated timestamp.
UX-DR5: Implement one-click observability quick-link cards for Prometheus, Loki, Grafana, and Sentry.
UX-DR6: Represent signal state with text + icon + semantic color (never color-only).
UX-DR7: Show clear "pending signal" messaging for telemetry propagation delays.
UX-DR8: Distinguish delayed vs failed states and present different guidance for each.
UX-DR9: Provide inline recovery hints plus linked troubleshooting checklist for failed/delayed verification.
UX-DR10: Keep run history visible as secondary context, not primary flow blocker.
UX-DR11: Preserve deterministic navigation with no hidden steps in critical reviewer path.
UX-DR12: Apply consistent 8px-based spacing rhythm and stable section hierarchy.
UX-DR13: Use neutral-first visual palette with restrained accent and explicit semantic status colors.
UX-DR14: Use readable typographic hierarchy and monospace for technical values like run IDs/timestamps.
UX-DR15: Enforce keyboard accessibility for scenario controls and verification links.
UX-DR16: Maintain visible focus states and semantic labels for forms/actions.
UX-DR17: Meet WCAG 2.1 AA baseline for contrast, keyboard operation, and status communication.
UX-DR18: Keep core flow usable across breakpoints (mobile/tablet/desktop) while prioritizing desktop.
UX-DR19: Preserve quick-link verification visibility on narrow screens without deep navigation.
UX-DR20: Ensure empty/loading/error states include clear next-action guidance.
UX-DR21: Reuse consistent state vocabulary across UI components (`running/pending/success/failed`).
UX-DR22: Compose reusable components for scenario runner, status strip, observability links, signal badge, and recovery hint panel.
UX-DR23: Disable duplicate submissions while run creation is in-flight.
UX-DR24: Keep feedback concise, operational, and reviewer-oriented; avoid noisy decorative UI.

### FR Coverage Map

### FR Coverage Map

FR1: Epic 1 - Select and submit scenario from UI.
FR2: Epic 1 - Validate run input at submission.
FR3: Epic 1 - Execute scenario via one orchestration path.
FR4: Epic 1 - Generate unique run identifier.
FR5: Epic 1 - Show run outcome state.
FR6: Epic 1 - Display recent run history.
FR7: Epic 1 - Show run metadata for traceability.
FR8: Epic 1 - Preserve run records.
FR9: Epic 1 - Correlate run across persistence and telemetry.
FR10: Epic 2 - Emit Prometheus metrics.
FR11: Epic 2 - Emit Loki-structured logs.
FR12: Epic 2 - Capture Sentry errors.
FR13: Epic 2 - Ensure signals from real UI-triggered runs.
FR14: Epic 2 - Bind telemetry to run identifier and scenario type.
FR15: Epic 2 - Provide explicit verification links.
FR16: Epic 2 - Verify metrics endpoint signal.
FR17: Epic 2 - Verify Loki signal path.
FR18: Epic 2 - Verify Grafana signal visibility.
FR19: Epic 2 - Verify Sentry capture for error scenario.
FR20: Epic 3 - Start services with one command.
FR21: Epic 3 - Stop services with one command.
FR22: Epic 3 - Preserve required stack boundaries.
FR23: Epic 3 - Reproduce setup from docs in clean environment.
FR24: Epic 1 - Persist runs in PostgreSQL with Prisma.
FR25: Epic 1 - Return stable run response contract.
FR26: Epic 1 - Frontend consumes contracts without datastore coupling.
FR27: Epic 1 - Keep naming consistent across UI/API/logs/metrics.
FR28: Epic 1 - Keep first-time reviewer path clear.
FR29: Epic 1 - Show clear run lifecycle states.
FR30: Epic 2 - Provide actionable verification failure recovery guidance.
FR31: Epic 1 - Keep controls keyboard-accessible and semantically labeled.
FR32: Epic 3 - Provide end-to-end run/verify/stop README flow.
FR33: Epic 3 - Document stack usage evidence.
FR34: Epic 3 - Document observability verification steps.
FR35: Epic 3 - Complete submission checklist with traceable refs.
FR36: Epic 4 - Provide effective project rules.
FR37: Epic 4 - Provide useful custom skills.
FR38: Epic 4 - Provide high-value workflow commands.
FR39: Epic 4 - Provide practical hooks that catch issues early.
FR40: Epic 4 - Integrate and justify marketplace skills.
FR41: Epic 5 - Decompose work into atomic orchestrator tasks.
FR42: Epic 5 - Persist and reuse context for resume.
FR43: Epic 5 - Route subtasks to smaller/faster models where fit.
FR44: Epic 5 - Produce readable execution summary for handoff.

## Epic List

### Epic 1: Run Scenarios with Clear, Traceable Results
Reviewer can execute a scenario from the main UI and immediately get clear run outcomes, stable history, and correlated identifiers across app layers.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR24, FR25, FR26, FR27, FR28, FR29, FR31.

### Epic 2: Verify Observability Signals with Confidence
Reviewer can confirm metrics, logs, dashboard data, and error capture for each run through direct links, clear signal states, and actionable recovery guidance.
**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR30.

### Epic 3: Operate and Submit the Project Reliably
Maintainer can start, stop, validate, and hand off the full required stack quickly using deterministic infrastructure and complete verification documentation.
**FRs covered:** FR20, FR21, FR22, FR23, FR32, FR33, FR34, FR35.

### Epic 4: Enable Cursor Productivity with Guardrails
Maintainer can use a practical AI layer (rules, skills, commands, hooks, marketplace skills) that makes work faster and safer in new chats.
**FRs covered:** FR36, FR37, FR38, FR39, FR40.
**Implementation note:** Build this epic in lockstep with Epic 5 so artifacts behave as one coherent AI operating system, not disconnected files.

### Epic 5: Orchestrate Delivery with Context-Efficient AI Execution
Maintainer can run an orchestrator that breaks work into atomic tasks, resumes with saved context, chooses right-size models, and reports outcomes clearly.
**FRs covered:** FR41, FR42, FR43, FR44.
**Implementation note:** Integrate directly with Epic 4 artifacts (rules/skills/commands/hooks) and validate as a single rubric-facing AI layer experience.

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Run Scenarios with Clear, Traceable Results

Reviewer can execute a scenario from the main UI and immediately get clear run outcomes, stable history, and correlated identifiers across app layers.

### Story 1.1: Set Up Initial Project from Starter Template

As a maintainer,
I want to initialize the project from the approved starter template baseline,
So that development starts with the required structure and deterministic tooling.

**Acceptance Criteria:**

**Given** the repository is at initial setup state
**When** I scaffold from the approved monorepo starter approach
**Then** required app boundaries exist (`apps/web`, `apps/api`, and shared contracts location)
**And** dependencies install successfully with documented setup commands

**Given** starter initialization is complete
**When** I run baseline checks
**Then** development scripts execute without structural errors
**And** setup instructions are captured for reproducible onboarding

### Story 1.2: Run a Scenario from the Main UI

As a reviewer,
I want to select a scenario and trigger a run from one clear action area,
So that I can start verification immediately without navigation friction.

**Acceptance Criteria:**

**Given** I open the main dashboard with no active run
**When** I select a supported scenario and click Run
**Then** the system submits the request through the single scenario-run API path
**And** the UI shows immediate submission acknowledgment and disables duplicate submission while in-flight

**Given** I submit invalid or incomplete input
**When** validation fails on client or server boundary
**Then** I receive clear actionable feedback in the same UI area
**And** no run is created

### Story 1.3: Persist and Return Traceable Run Records

As a maintainer,
I want each run saved with stable identifiers and metadata,
So that every execution is auditable and consistent across layers.

**Acceptance Criteria:**

**Given** a valid scenario run request is accepted
**When** backend orchestration executes
**Then** a run record is persisted via Prisma/PostgreSQL before success response
**And** response returns stable contract fields including run ID, scenario type, status, and timestamps

**Given** a run record exists
**When** I inspect persisted data and API payload
**Then** scenario/run naming conventions are consistent
**And** contract shape matches frontend expectations without datastore coupling

### Story 1.4: Display Current Run Status with Immediate State Clarity

As a reviewer,
I want to see explicit lifecycle states for the active run,
So that I always know what is happening after I click Run.

**Acceptance Criteria:**

**Given** I trigger a run
**When** processing begins
**Then** UI transitions through explicit states (`idle` -> `loading/running` -> `success|error`)
**And** state language is deterministic and visible

**Given** run status updates are received
**When** state changes
**Then** the status strip updates with run ID, scenario, and last-updated timestamp
**And** status remains readable and keyboard/screen-reader friendly

### Story 1.5: Show Run History for Fast Traceability

As a reviewer,
I want a recent run history list with key metadata,
So that I can validate and compare executions without re-running blindly.

**Acceptance Criteria:**

**Given** one or more runs exist
**When** I view the history module
**Then** I can see recent runs with scenario type, status, timestamp, and run ID
**And** history loads within expected local performance thresholds

**Given** I inspect a history entry
**When** I compare it to active run output
**Then** identifiers and statuses are consistent with backend contract and persisted records
**And** the history module remains secondary to primary run flow

### Story 1.6: Baseline Accessibility and First-Time Reviewer Clarity

As a first-time reviewer,
I want the core run flow to be obvious and keyboard-operable,
So that I can complete the primary task quickly and confidently.

**Acceptance Criteria:**

**Given** I land on the dashboard for the first time
**When** I scan the page
**Then** the primary run action is visually clear in first viewport
**And** no hidden steps are required to execute a run

**Given** I use keyboard-only navigation
**When** I move through scenario controls and submit action
**Then** focus order is logical and visible
**And** controls/labels are semantically exposed for assistive technologies

## Epic 2: Verify Observability Signals with Confidence

Reviewer can confirm metrics, logs, dashboard data, and error capture for each run through direct links, clear signal states, and actionable recovery guidance.

### Story 2.1: Emit Correlated Metrics, Logs, and Errors per Run

As a maintainer,
I want each scenario execution to emit all required observability signals with run correlation,
So that verification is real, complete, and traceable.

**Acceptance Criteria:**

**Given** a scenario run is executed from the UI
**When** the orchestration path processes the run
**Then** Prometheus metric and Loki-structured log are emitted with run ID and scenario type
**And** failure scenarios capture Sentry events with the same correlation fields

**Given** telemetry emission fails in any adapter
**When** error handling is triggered
**Then** failure is surfaced explicitly through structured error handling
**And** no silent swallow occurs

### Story 2.2: Provide Direct Verification Paths in the Product Experience

As a reviewer,
I want explicit one-click links to metrics, logs, dashboard, and error verification,
So that I can validate signals in under the interview timebox.

**Acceptance Criteria:**

**Given** I view the main verification area
**When** I inspect observability link cards
**Then** Prometheus, Loki, Grafana, and Sentry destinations are clearly labeled and reachable
**And** labels indicate what evidence I should expect in each destination

**Given** I run the required error scenario
**When** I open verification links
**Then** I can confirm each signal path with no hidden navigation steps
**And** links remain stable with documented endpoint parity

### Story 2.3: Display Signal State and Propagation Feedback

As a reviewer,
I want clear signal status feedback (pending/success/failure),
So that delayed telemetry feels controlled instead of broken.

**Acceptance Criteria:**

**Given** a run has been triggered
**When** telemetry is still propagating
**Then** UI shows explicit pending state with last-updated information
**And** status vocabulary remains consistent across components

**Given** one signal succeeds while another is pending or failed
**When** status is rendered
**Then** each signal state is distinguishable with text/icon/color
**And** no status relies on color alone

### Story 2.4: Guide Recovery for Delayed or Missing Signals

As a reviewer,
I want actionable recovery guidance when verification fails,
So that I can determine whether to wait, troubleshoot, or mark blocked.

**Acceptance Criteria:**

**Given** expected telemetry is not visible immediately
**When** system detects delay pattern
**Then** UI presents delayed-state guidance and recheck prompt
**And** suggests next action without ambiguity

**Given** a likely hard failure is detected
**When** recovery panel is shown
**Then** UI provides suspected layer hints and troubleshooting checklist link
**And** user can record or understand blocked verification reason

### Story 2.5: Validate End-to-End Observability Walkthrough Reliability

As a maintainer,
I want a deterministic observability verification flow,
So that reviewers can reproduce the full signal chain consistently.

**Acceptance Criteria:**

**Given** a clean stack startup and required scenario execution
**When** walkthrough steps are followed
**Then** metric/log/dashboard/Sentry verification succeeds in documented sequence
**And** verification remains repeatable across multiple runs

**Given** verification fails at one signal
**When** troubleshooting flow is applied
**Then** diagnosis path is documented and testable
**And** unresolved failures are explicit rather than hidden

## Epic 3: Operate and Submit the Project Reliably

Maintainer can start, stop, validate, and hand off the full required stack quickly using deterministic infrastructure and complete verification documentation.

### Story 3.1: One-Command Infrastructure Startup and Shutdown

As a maintainer,
I want a single command to start and stop the full required stack,
So that setup is deterministic and reviewer-friendly.

**Acceptance Criteria:**

**Given** a clean clone and documented prerequisites
**When** I run the startup command
**Then** all required services (app + PG + Prometheus + Loki + Grafana + required wiring) become operational
**And** there are no hidden manual setup steps

**Given** services are running
**When** I run the stop command
**Then** the stack shuts down cleanly
**And** rerunning startup remains deterministic

### Story 3.2: Reproducible Environment and Configuration Contracts

As a maintainer,
I want complete environment examples and config documentation,
So that the system runs in a fresh environment without code edits.

**Acceptance Criteria:**

**Given** I review env templates and setup docs
**When** I configure local environment from examples
**Then** all required configuration keys for app, DB, and observability are documented
**And** no secrets are hardcoded in repo source

**Given** configuration is applied
**When** I start and verify the app
**Then** integration wiring remains stable and diagnosable
**And** failures point to explicit config/troubleshooting guidance

### Story 3.3: README Walkthrough for Run, Verify, and Stop

As a reviewer,
I want a concise end-to-end walkthrough in README,
So that I can validate the assignment quickly within the timebox.

**Acceptance Criteria:**

**Given** I open README with no project context
**When** I follow run/verify/stop instructions in order
**Then** I can complete the primary verification flow end-to-end
**And** each step references concrete paths/commands and expected outcomes

**Given** one verification step fails
**When** I follow troubleshooting notes in docs
**Then** I can either recover deterministically or record a clear blocked reason
**And** ambiguity is minimized

### Story 3.4: Submission Evidence Mapping to Stack and Observability

As a candidate,
I want submission artifacts that map requirements to implementation evidence,
So that rubric scoring can be completed without guesswork.

**Acceptance Criteria:**

**Given** I prepare final submission package
**When** I populate stack and observability sections
**Then** each required technology has traceable evidence location
**And** each observability signal includes reproduction and verification target

**Given** reviewer checks submission checklist
**When** they follow listed references
**Then** implementation claims are verifiable from repository artifacts
**And** checklist completion does not depend on tribal knowledge

### Story 3.5: Deterministic Verification Rehearsal and Readiness Gate

As a maintainer,
I want a repeatable pre-submission verification gate,
So that regressions are caught before handoff.

**Acceptance Criteria:**

**Given** latest implementation state
**When** I run the documented rehearsal flow from clean startup
**Then** required scenario verification succeeds across metric/log/dashboard/Sentry
**And** readiness status is explicitly recorded

**Given** a rehearsal failure occurs
**When** I execute the documented recovery/triage path
**Then** root cause is narrowed to a concrete layer (infra/config/app/docs)
**And** fix status is captured before submission

## Epic 4: Enable Cursor Productivity with Guardrails

Maintainer can use a practical AI layer (rules, skills, commands, hooks, marketplace skills) that makes work faster and safer in new chats.

### Story 4.1: Author Guardrail Rules for Stack and Workflow

As a maintainer,
I want clear AI rules for stack constraints and delivery standards,
So that generated changes stay compliant and review-ready.

**Acceptance Criteria:**

**Given** a new AI chat session
**When** agent reads project rules
**Then** required stack boundaries and critical workflow constraints are explicit
**And** rule guidance prevents common drift in architecture, observability, and docs quality

**Given** a conflicting implementation proposal
**When** rules are applied
**Then** non-compliant choices are rejected or flagged with rationale
**And** accepted paths remain aligned to assignment requirements

### Story 4.2: Build Custom Skills for Recurring High-Value Workflows

As a maintainer,
I want custom skills for recurring project tasks,
So that work is faster, more consistent, and less error-prone.

**Acceptance Criteria:**

**Given** the AI layer is initialized
**When** I inspect custom skills
**Then** at least three skills exist, including one observability-focused skill
**And** each skill has clear trigger/use guidance and practical workflow value

**Given** a relevant request is issued in a fresh chat
**When** a matching skill is invoked
**Then** execution steps are specific and reproducible
**And** output quality is better than generic prompting

### Story 4.3: Add Commands that Accelerate Build/Verify/Submission Flows

As a maintainer,
I want reusable command shortcuts for frequent workflows,
So that execution overhead is reduced under time pressure.

**Acceptance Criteria:**

**Given** command definitions are present
**When** I run command shortcuts
**Then** at least three meaningful workflows are supported (for example build, verify, submission prep)
**And** commands map to real project operations rather than placeholder text

**Given** command output is reviewed
**When** execution completes
**Then** result is clear and usable for next step decisions
**And** command behavior is documented in AI-layer docs

### Story 4.4: Implement Practical Hooks to Catch Workflow Failures Early

As a maintainer,
I want hooks that detect realistic mistakes during development,
So that defects are caught before they propagate.

**Acceptance Criteria:**

**Given** hooks are configured
**When** triggering events occur
**Then** at least two hooks run with practical checks relevant to this project
**And** failures provide actionable guidance, not vague warnings

**Given** a known workflow issue happens (for example missing required artifact or state mismatch)
**When** the hook executes
**Then** issue is surfaced immediately
**And** remediation path is explicit

### Story 4.5: Curate Marketplace Skills with Explicit Rationale

As a maintainer,
I want a justified set of marketplace skills,
So that external capabilities complement custom skills coherently.

**Acceptance Criteria:**

**Given** marketplace integration is documented
**When** reviewer inspects selected skills
**Then** at least six skills are connected and each has clear rationale
**And** overlap versus custom skills is intentionally explained

**Given** AI-layer docs are reviewed
**When** maintainer follows integration guidance
**Then** they can identify when to use marketplace versus custom workflows
**And** choices align with assignment priorities

## Epic 5: Orchestrate Delivery with Context-Efficient AI Execution

Maintainer can run an orchestrator that breaks work into atomic tasks, resumes with saved context, chooses right-size models, and reports outcomes clearly.

### Story 5.1: Define Orchestrator Workflow and Atomic Task Model

As a maintainer,
I want an orchestrator that decomposes work into atomic tasks,
So that complex implementation can be executed reliably by smaller units.

**Acceptance Criteria:**

**Given** a multi-step feature request
**When** orchestrator planning runs
**Then** work is broken into atomic, ordered tasks with clear acceptance checks
**And** decomposition avoids oversized or ambiguous task units

**Given** task dependencies are evaluated
**When** task list is produced
**Then** sequence is explicit and minimal
**And** each task is feasible for a focused single-agent pass

### Story 5.2: Implement Context Artifact for Resume and Continuation

As a maintainer,
I want orchestrator state persisted in a context artifact,
So that execution can resume across chat interruptions without losing intent.

**Acceptance Criteria:**

**Given** orchestration progresses through phases
**When** state is saved
**Then** context artifact captures phase status, decisions, and next actionable tasks
**And** artifact is readable and update-safe

**Given** execution is interrupted
**When** orchestrator resumes
**Then** it continues from last completed phase without redoing finished work
**And** context continuity is maintained with minimal manual prompting

### Story 5.3: Route Tasks to Right-Size Models with Explicit Rationale

As a maintainer,
I want orchestrator-level model routing guidance,
So that simple tasks use fast models and complex tasks use stronger reasoning efficiently.

**Acceptance Criteria:**

**Given** an orchestration task list
**When** model assignment is made
**Then** each task has explicit routing rationale (fast versus stronger model)
**And** routing aligns with complexity and risk

**Given** reviewer inspects orchestration outputs
**When** model choices are evaluated
**Then** choices are auditable and practical
**And** routing is not uniformly defaulted without reasoning

### Story 5.4: Produce Coherent Execution Summary and Handoff

As a maintainer,
I want orchestrator to produce a concise execution report,
So that progress, decisions, and remaining risks are clear for handoff.

**Acceptance Criteria:**

**Given** orchestration run completes or pauses
**When** summary is generated
**Then** report includes completed tasks, pending tasks, key decisions, and blockers
**And** handoff guidance is actionable for the next session or reviewer

**Given** Epic 4 artifacts exist
**When** orchestrator summary is reviewed
**Then** report references relevant rules/skills/commands/hooks interactions
**And** combined AI layer behavior is represented as one coherent system
