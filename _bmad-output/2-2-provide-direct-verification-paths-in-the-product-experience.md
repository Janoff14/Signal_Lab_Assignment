# Story 2.2: Provide Direct Verification Paths in the Product Experience

Status: done

## Story

As a reviewer,  
I want explicit one-click links to metrics, logs, dashboard, and error verification,  
so that I can validate signals quickly within the interview timebox.

## Acceptance Criteria

1. Given I view the main verification area, when I inspect observability link cards, then Prometheus, Loki, Grafana, and Sentry destinations are clearly labeled and reachable, and labels indicate expected evidence.
2. Given I run the required error scenario, when I open verification links, then each signal path is verifiable without hidden navigation, and links remain stable with documented endpoint parity.

## Tasks / Subtasks

- [x] Add explicit observability verification links section in dashboard.
- [x] Provide evidence expectations per destination.
- [x] Add `/grafana` in-app path for reviewer navigation.

## Dev Agent Record

### Agent Model Used

Codex (GPT-5.3)

### Completion Notes List

- Added verification links for Prometheus, Loki, Grafana, and Sentry in the main UI.
- Added descriptive evidence hints beside each link for reviewer clarity.
- Added app route at `/grafana` as required navigation path.

### File List

- `_bmad-output/2-2-provide-direct-verification-paths-in-the-product-experience.md`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/grafana/page.tsx`

### Change Log

- 2026-04-14: Added direct observability verification links and grafana route; moved to `done`.
