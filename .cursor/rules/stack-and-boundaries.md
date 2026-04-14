# Stack and Boundaries Rule

- Keep required stack fixed: Next.js App Router + RHF + TanStack Query, NestJS, PostgreSQL/Prisma, Prometheus, Loki, Grafana, Sentry, Docker Compose.
- Do not replace required technologies without explicit written rationale in docs.
- Keep frontend thin: no direct DB or observability-vendor calls from UI components.
- Keep backend layering: controller -> service -> repository/adapters.
- Preserve shared contracts in `packages/contracts`; avoid duplicated DTO/type definitions.
