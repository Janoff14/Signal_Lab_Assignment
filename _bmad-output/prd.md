---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - _bmad-output/signal-lab-product-brief.md
  - _bmad-output/project-context.md
documentCounts:
  productBriefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 1
workflowType: 'prd'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: brownfield
---

# Product Requirements Document - Signal Lab Assignment

**Author:** BMad
**Date:** 2026-04-14

## Executive Summary

Signal Lab Assignment is a brownfield web application project built to prove production-grade execution quality under interview constraints. The product outcome is not feature breadth; it is an operational, verifiable, and cleanly documented system where every stated requirement can be validated quickly by a reviewer. The target user is the technical interviewer evaluating engineering judgment, delivery discipline, and system reliability in a constrained timebox.

The core problem being solved is evaluation ambiguity: many assignment submissions claim quality but are hard to run, hard to verify, and hard to extend. This product addresses that by prioritizing deterministic behavior, explicit verification paths, concise documentation, and straightforward handoff. Success means a reviewer can run the system, validate required signals and behavior end-to-end, and understand implementation decisions without reverse engineering intent.

### What Makes This Special

This implementation differentiates through disciplined simplicity: fast, efficient engineering choices with no unnecessary complexity, paired with systematic documentation and maintainability-oriented logging. The differentiator moment is reviewer confidence - when the evaluator sees that setup, verification, and handoff all work without friction.

The core insight is that interview-grade excellence is demonstrated through operational completeness and clarity, not ornamental complexity. By fulfilling all requirements quickly, keeping UX/backend/frontend behavior stable, and producing a readable README and verification path, the project becomes both a valid assessment artifact and a practical base for future extension by another engineer.

## Project Classification

Project Type: web application (`web_app`)  
Domain: general software assignment context (`general`)  
Complexity: low domain complexity, with meaningful integration complexity across required observability and delivery constraints  
Project Context: brownfield

## Success Criteria

### User Success

- Everything in `ASSIGNMENT.md` is operational, fast to verify, and easy for a first-time reviewer.
- UI/UX is intuitive with zero-friction flow from open app to run scenario to verify outputs.
- Reviewer completes required verification in <= 15 minutes.

### Business Success

- Submission aligns to `SUBMISSION_CHECKLIST.md` and passes reviewer flow on first try.
- Target rubric outcome: max-points orientation from `RUBRIC.md` (practical target: 80-100 band).
- Work is completed at high quality within <= 7 hours remaining.

### Technical Success

- Implementation is accurate, simple, and clean; no unnecessary complexity.
- No blocker bugs in core workflow (frontend, backend, observability, docs walkthrough).
- Proper testing exists for critical workflows and required signals.
- Architecture is modular and scalable so changes/extensions are low-risk.

### Measurable Outcomes

- 100% required assignment checkpoints demonstrable from docs.
- 4/4 observability signals verifiable in walkthrough.
- 0 critical defects in demo path.
- End-to-end setup + run + verify process stays deterministic and repeatable.
- Delivery fits timebox: <= 7 hours.

## Product Scope

### MVP - Minimum Viable Product

- Everything explicitly required in `ASSIGNMENT.md` plus checklist-complete handoff.
- Fast, smooth reviewer experience with clear README/demo instructions.
- Clean modular structure that supports maintainability.

### Growth Features (Post-MVP)

- Broader test coverage, richer dashboards, extra scenarios, better DX automation.

### Vision (Future)

- Scalable observability playground plus AI workflow foundation that another engineer can extend immediately.

## User Journeys

1) Reviewer - Success Path (Primary Journey)  
Opening scene: A technical interviewer opens your repo with limited time and zero internal context. Their goal is to validate quality quickly, not decode your architecture.  
Rising action: They run the documented startup command, open the UI, trigger `system_error`, and follow verification links for metrics, logs, dashboard, and Sentry.  
Climax: Every required signal appears where expected, with clear naming and traceable run behavior.  
Resolution: Reviewer confidently concludes the solution is operational, well-structured, and interview-ready within the 15-minute window.

2) Reviewer - Edge/Recovery Path (Primary Edge Case)  
Opening scene: Reviewer follows docs but one signal is missing or delayed (for example, dashboard panel empty).  
Rising action: They use troubleshooting notes, known endpoints, and explicit verification fallback steps to isolate whether issue is startup order, config wiring, or data refresh lag.  
Climax: Recovery path leads to deterministic corrective action and re-verification succeeds without guesswork.  
Resolution: Even when failure occurs, the system remains debuggable and trustworthy; reviewer sees engineering maturity, not fragility.

3) Candidate/Developer - Delivery Path (Secondary User)  
Opening scene: You operate under strict timebox and scoring pressure, needing fast execution without sacrificing quality.  
Rising action: You implement the thin slice first, validate against assignment/rubric/checklist, and keep docs synchronized with working behavior.  
Climax: Core stack + observability + AI-layer requirements are all verifiably complete, with modular code and clean handoff artifacts.  
Resolution: You finish on time with a submission that is simple, accurate, scalable, and easy for another engineer to continue.

4) Maintainer/QA - Troubleshooting Path (Ops/Support User)  
Opening scene: A maintainer or QA engineer inherits the project and must investigate a failed verification run.  
Rising action: They use README/checklist, logs, metrics, and service boundaries to localize failure (UI trigger, API orchestration, persistence, or observability adapter).  
Climax: Modular structure and explicit instrumentation allow quick root-cause isolation and low-risk fixes.  
Resolution: System health is restored quickly, and future changes remain safe because the architecture is intentionally scalable and maintainable.

### Journey Requirements Summary

- Deterministic, first-time runnable setup and verification flow.
- Explicit happy-path + failure-recovery documentation.
- Clear observability traceability across scenario execution.
- Modular architecture boundaries to support debugging and future scale.
- Reviewer-centric UX that minimizes friction and cognitive load.
- Handoff artifacts that enable continuation without tribal knowledge.

## Web App Specific Requirements

### Project-Type Overview

Signal Lab will be implemented as a SPA-oriented web application optimized for fast, frictionless reviewer verification. The UX should prioritize deterministic execution of the required flow (run scenario to verify signals) over broad feature surface. SEO is out of scope for this assignment context, and the interaction model is standard request/response (no real-time channel required).

### Technical Architecture Considerations

- Frontend architecture follows Next.js App Router with SPA-like interaction patterns for key user flows.
- Browser support targets broad modern browser compatibility (not Chrome-only), with stable behavior for first-time reviewer usage.
- Data interactions use request/response calls with clear loading, success, and error states.
- Accessibility baseline focuses on practical fundamentals: keyboard navigability for core actions, clear labels, and understandable feedback states.
- Performance focus is reviewer-perceived speed: fast initial task completion and minimal interaction friction in the main walkthrough.

### Browser & Compatibility Requirements

- Support current major desktop browsers used by interviewers (Chrome, Edge, Firefox, Safari recent versions).
- Avoid browser-specific behavior in core scenario execution and verification navigation.
- Ensure key interactions degrade gracefully if minor browser differences occur.

### UX & Interaction Requirements

- Core UI path must be obvious on first visit: select scenario, run, inspect results/links.
- Request/response lifecycle states (idle/loading/success/error) must be explicit and user-readable.
- Error handling should be actionable and concise, not verbose or ambiguous.
- Information density should remain high while keeping interface simple and clean.

### Accessibility Baseline

- Keyboard-accessible controls for scenario execution and verification links.
- Semantic labels for form fields and actions.
- Clear focus visibility and readable contrast in core screens.
- Basic ARIA usage where native semantics are insufficient.

### Implementation Considerations

- Keep frontend components modular to support scaling and later extension.
- Keep API contract boundaries explicit so frontend behavior remains predictable.
- Prioritize assignment-critical paths over optional UI polish.
- Ensure all requirements remain easy to verify through README/checklist-guided flow.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP focused on proving assignment-critical outcomes quickly and reliably.  
**Resource Requirements:** Solo implementation (single engineer) with disciplined scope control and documentation-first verification flow.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Reviewer success path (run + verify full signal chain).
- Reviewer recovery path (clear troubleshooting when one signal fails).
- Candidate delivery path (timeboxed, clean handoff execution).
- Maintainer troubleshooting path (modular diagnostics and fixability).

**Must-Have Capabilities:**
- Full required stack implemented exactly as specified.
- Deterministic `docker compose up -d` startup.
- Working UI flow for required scenario execution.
- End-to-end observability verification (Prometheus, Loki, Grafana, Sentry).
- Prisma persistence with traceable run identifiers.
- Clear README + walkthrough + completed submission checklist.
- Required Cursor AI layer minimums (rules, skills, commands, hooks, marketplace, orchestrator).

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Better dashboard depth and richer observability UX.
- Expanded test coverage beyond critical path.
- Extra scenarios and improved dev ergonomics/automation.
- Documentation polish and optional visual aids.

**Phase 3 (Expansion):**
- Broader scenario catalog and richer analytics.
- More advanced orchestrator capabilities and workflow intelligence.
- Stronger extensibility patterns for team-scale evolution.

### Risk Mitigation Strategy

**Technical Risks:**
- Highest risk: integrating all observability tools correctly.
- Mitigation: wire and verify observability first, then build outward; keep contracts explicit; validate each signal incrementally using real runs.

**Market/Interview Risks:**
- Highest risk: failing observability verification during reviewer walkthrough.
- Mitigation: treat verification path as P0 acceptance gate; rehearse full 15-minute flow; keep troubleshooting guidance explicit.

**Resource Risks:**
- Single-builder constraint increases scope pressure and context-switch overhead.
- Mitigation: strict thin-slice sequencing, hard cutoff for non-essentials, continuous checklist tracking.

**4-Hour Contingency Cut:**
- First drop: orchestrator complexity and advanced AI-layer enhancements beyond minimum required functionality.
- Keep: operational core + observability verification + required submission artifacts.

## Functional Requirements

### Scenario Execution & Run Orchestration

- FR1: Reviewer can select a supported scenario type and submit a run request from the main UI.
- FR2: System can validate scenario run input before execution begins.
- FR3: System can execute the selected scenario through a single orchestration path.
- FR4: System can assign a unique run identifier to each scenario execution.
- FR5: Reviewer can view the execution outcome state for each submitted run (success/failure).

### Run History & Traceability

- FR6: Reviewer can view a history list of recent scenario runs.
- FR7: Reviewer can inspect key metadata for each run (scenario type, status, timestamp, run identifier).
- FR8: System can preserve run records for later verification and troubleshooting.
- FR9: Maintainer can correlate a run across persistence and observability outputs using shared identifiers.

### Observability Signal Production

- FR10: System can emit a Prometheus-compatible metric for scenario execution events.
- FR11: System can emit structured logs suitable for Loki ingestion for each run.
- FR12: System can capture and report error events to Sentry for failure scenarios.
- FR13: System can ensure required observability signals are produced from real UI-triggered executions.
- FR14: System can associate observability outputs with the initiating run identifier and scenario type.

### Observability Verification Experience

- FR15: Reviewer can access explicit verification links/paths for metrics, logs, and dashboard views from the product experience or documentation.
- FR16: Reviewer can verify metric signal presence through the documented metrics endpoint.
- FR17: Reviewer can verify log signal presence through the documented Loki path/query flow.
- FR18: Reviewer can verify dashboard visibility of run-related signals via Grafana access path.
- FR19: Reviewer can verify error capture presence in Sentry for designated error scenarios.

### Stack & Environment Operability

- FR20: Maintainer can start all required services with a single documented compose command.
- FR21: Maintainer can stop the full stack with a single documented command.
- FR22: System can run with the required stack components and preserve assignment-required technology boundaries.
- FR23: Maintainer can provision and run the application in a clean environment using repository documentation.

### Data Persistence & Contract Consistency

- FR24: System can persist scenario run records to PostgreSQL via Prisma.
- FR25: System can return consistent run response contracts usable by frontend workflows.
- FR26: Frontend can consume backend run and history contracts without direct data-store coupling.
- FR27: System can enforce stable scenario type and run identifier naming across UI, API, logs, and metrics contexts.

### Reviewer-Centric UX & Error Recovery

- FR28: First-time reviewer can complete the core scenario run flow without hidden navigation steps.
- FR29: UI can present clear request lifecycle states (idle/loading/success/error) for run actions.
- FR30: Reviewer can receive actionable recovery guidance when a verification step fails.
- FR31: UI can keep core controls keyboard-accessible and semantically labeled for baseline accessibility.

### Documentation & Submission Readiness

- FR32: Maintainer can follow README to run, verify, and stop the system end-to-end.
- FR33: Submission package can document stack usage evidence for all required technologies.
- FR34: Submission package can document observability verification steps for each required signal type.
- FR35: Submission checklist can be completed with traceable references to implementation artifacts.

### Cursor AI Layer Capabilities

- FR36: Maintainer can access rule artifacts that enforce stack and workflow guardrails in AI-assisted development.
- FR37: Maintainer can use custom skills to execute recurring project workflows, including observability-focused workflows.
- FR38: Maintainer can use command shortcuts for common build/verify/submission flows.
- FR39: System can apply hooks that catch practical workflow issues before they propagate.
- FR40: Maintainer can identify and justify integrated marketplace skills used in the workflow.

### Orchestrator Capability

- FR41: Maintainer can invoke an orchestrator skill that decomposes work into atomic tasks.
- FR42: Orchestrator can preserve and reuse context artifacts to support continuation across sessions.
- FR43: Orchestrator can route suitable subtasks toward smaller/faster models while preserving overall workflow coherence.
- FR44: Orchestrator can produce a readable execution summary for handoff and review.

## Non-Functional Requirements

### Performance

- NFR1: Core reviewer action (scenario submission to API acknowledgment) completes within <= 2 seconds under normal local demo conditions.
- NFR2: Run history retrieval and render completes within <= 2 seconds for typical assignment dataset size.
- NFR3: Reviewer verification flow pages/paths are navigable without blocking waits longer than 5 seconds per step under normal local conditions.
- NFR4: Core UX feedback state (loading/success/error) is shown immediately on user action to avoid ambiguous idle behavior.

### Reliability

- NFR5: A clean startup using documented commands reliably brings required services to operational state with no manual hidden steps.
- NFR6: The mandatory verification walkthrough is repeatable end-to-end across multiple runs without non-deterministic failures in core path.
- NFR7: Scenario execution failures produce explicit, user-visible failure outcomes rather than silent errors.
- NFR8: Observability verification path remains operational for each required signal type in the assignment's expected flow.

### Integration

- NFR9: Required integrations (PostgreSQL/Prisma, Prometheus, Loki, Grafana, Sentry) remain consistently wired in a single documented environment.
- NFR10: Integration configuration is externally configurable and documented so reviewers can run without code edits.
- NFR11: Cross-system traceability is preserved via consistent identifiers between execution, persistence, logs, and metrics.
- NFR12: Integration failures are diagnosable through documented endpoints, logs, and troubleshooting guidance.

### Accessibility (Baseline)

- NFR13: Core workflow controls are keyboard-accessible and operable without pointer-only interaction.
- NFR14: Form and action elements in the main flow expose clear semantic labels.
- NFR15: Focus visibility is preserved in core interactive paths.
- NFR16: Baseline readability and contrast are sufficient for first-time reviewer operation of critical flows.

### Maintainability

- NFR17: Architecture maintains clear module boundaries so core flows can be modified without broad refactor impact.
- NFR18: Code and docs remain aligned such that a new maintainer can run and verify the system using repository guidance only.
- NFR19: Naming conventions for scenario/run identifiers are consistent across UI, API, persistence, logs, and metrics.
- NFR20: Troubleshooting guidance exists for common verification failures to reduce handoff friction.

### Security (Baseline)

- NFR21: No secrets or credentials are hardcoded in committed source artifacts.
- NFR22: Environment-specific sensitive configuration is supplied via environment variables and documented setup.
- NFR23: Error handling avoids exposing sensitive internal details in user-facing paths during normal operation.

### Scalability (Assignment-Appropriate Baseline)

- NFR24: System design supports adding new scenarios and observability extensions without restructuring core architecture.
- NFR25: Core flows remain stable under expected assignment/demo load (single reviewer, low concurrent usage).
- NFR26: Modular boundaries support future scale-up work as a follow-on phase rather than requiring redesign from scratch.
