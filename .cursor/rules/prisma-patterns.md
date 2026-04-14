# Prisma Patterns Rule

- Use Prisma as the only data-access layer. Raw SQL and alternative ORMs are prohibited.
- All schema changes require a migration via `npx prisma migrate dev --name <descriptive_name>`.
- After any schema change, regenerate the client: `npx prisma generate`.
- Always access Prisma through the repository layer (`*.repository.ts`), never from controllers or services directly.
- Use `cuid()` for primary keys (`@id @default(cuid())`).
- Keep `schema.prisma` as the single source of truth; do not define models elsewhere.
- Use `Json?` type for optional extensible metadata fields rather than adding many nullable columns.
- Include `createdAt DateTime @default(now())` on every model.
- When deploying in Docker, ensure `binaryTargets` includes `linux-musl-openssl-3.0.x`.
