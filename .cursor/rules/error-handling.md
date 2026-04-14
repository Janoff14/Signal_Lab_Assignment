# Error Handling Rule

## Backend
- Use NestJS built-in exceptions (`BadRequestException`, `InternalServerErrorException`, etc.) for HTTP error responses.
- All unhandled exceptions are caught by the global `HttpExceptionFilter` and returned as structured JSON.
- `system_error` scenarios must throw and produce: Prometheus error counter increment, structured error log, and Sentry event capture — all sharing the same `runId`.
- `validation_error` scenarios must return HTTP 400 with a descriptive message.
- Never swallow exceptions silently; always log at minimum `warn` level.

## Frontend
- Wrap TanStack Query mutations with `onError` callbacks that surface user-facing feedback.
- API call failures should show status and message from the response body, not raw network errors.
- Use try/catch only when there is a meaningful recovery path; otherwise let the error propagate to the query error state.
