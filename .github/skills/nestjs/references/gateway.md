# Gateway Configuration

## Upstreams

The gateway (`apps/api-gateway`) forwards requests to upstream services. Upstream URLs are configured via environment variables and resolved through Docker DNS in Compose.

## Environment Variables

- `STUDENTS_SERVICE_URL` — students service upstream
- `TEACHERS_SERVICE_URL` — teachers service upstream
- `COURSES_SERVICE_URL` — courses service upstream
- `ENROLLMENTS_SERVICE_URL` — enrollments service upstream
- `NOTIFICATIONS_SERVICE_URL` — notifications service upstream

## Rules

- Keep upstreams configurable through environment variables
- Preserve the global `/api` prefix on all NestJS applications
- The gateway metadata response (`GET /api`) lists available routes
- Health check: `GET /api/health` returns gateway status and configured upstreams
