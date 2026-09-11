# Academy Monorepo

A pnpm and Turborepo monorepo for an Academy Hub application. It combines a Next.js 15 App Router frontend with six NestJS 11 microservices and one NestJS API gateway.

## Architecture

| Service                 |   Port | Technology | Purpose                                        |
| ----------------------- | -----: | ---------- | ---------------------------------------------- |
| `web`                   | `3000` | Next.js 15 | Academy Hub landing page and student directory |
| `api-gateway`           | `3001` | NestJS 11  | API gateway and reverse proxy                  |
| `students-service`      | `3002` | NestJS 11  | Student records                                |
| `teachers-service`      | `3003` | NestJS 11  | Teacher records                                |
| `courses-service`       | `3004` | NestJS 11  | Course catalog                                 |
| `enrollments-service`   | `3005` | NestJS 11  | Enrollment records                             |
| `notifications-service` | `3006` | NestJS 11  | Notification records                           |

All NestJS applications use a global `/api` prefix. The gateway forwards requests to the upstream services over Docker DNS names.

## Prerequisites

- Node.js 22 or newer
- pnpm 10 or newer
- Docker with Docker Compose v2

## Local development

```powershell
pnpm install
pnpm dev
```

Run individual applications with:

```powershell
pnpm dev:web
pnpm dev:api
pnpm dev:students
pnpm dev:teachers
pnpm dev:courses
pnpm dev:enrollments
pnpm dev:notifications
```

The local development scripts use the ports listed in the architecture table.

## Validation

```powershell
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

The production build validates all seven workspace packages. The NestJS packages currently use in-memory repositories, so their Jest suites intentionally pass with no tests.

## Docker Compose

Start the complete stack:

```powershell
pnpm docker:up
```

Or run Compose directly:

```powershell
docker compose up --build --detach
```

Stop the stack:

```powershell
pnpm docker:down
```

Compose waits for each upstream service to become healthy before starting the gateway. The web and gateway health checks are available at:

- `http://localhost:3000/health`
- `http://localhost:3001/api/health`

## API routes

The gateway exposes:

- `GET /api/health` — gateway status and configured upstreams
- `GET /api` — gateway metadata and available routes
- `GET|POST|PATCH|DELETE /api/students[/:id]`
- `GET|POST|PATCH|DELETE /api/teachers[/:id]`
- `GET|POST|PATCH|DELETE /api/courses[/:id]`
- `GET|POST|PATCH|DELETE /api/enrollments[/:id]`
- `GET|POST|PATCH|DELETE /api/notifications[/:id]`

Example:

```powershell
Invoke-RestMethod http://localhost:3001/api/students

$student = @{
  firstName = "Test"
  lastName  = "Student"
  email     = "test.student@example.edu"
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:3001/api/students `
  -ContentType "application/json" `
  -Body $student
```

The same routes are available directly on each service under its published port and the `/api` prefix.

## Frontend

Open `http://localhost:3000` after starting the stack. The landing page links to `/students`, which renders the seeded student records by calling the gateway. If the gateway is unavailable, the student page displays a graceful unavailable state.

## Configuration

Copy `.env.example` to `.env` for local development:

```powershell
Copy-Item .env.example .env
```

The Compose file supplies container-to-container upstream URLs. The environment variables in `.env.example` are useful when running applications directly on the host.

## Extending the monorepo

1. Add a new application under `apps/`.
2. Add its package to `pnpm-workspace.yaml` discovery through the existing `apps/*` pattern.
3. Add its build, development, and health-check scripts.
4. Add a Dockerfile and a Compose service.
5. Add its upstream URL to the gateway configuration.
6. Add the route to `GatewayController` and the gateway metadata response.

The current repositories are intentionally in-memory so the example can run without a database. Replace the service repository implementations with a database adapter when persistence is required.
