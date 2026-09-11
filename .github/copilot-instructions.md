# Academy Monorepo Copilot Instructions

## Project Requirements

- [x] Verify that `.github/copilot-instructions.md` exists.
- [x] Clarify project requirements: pnpm, Node.js 22, Turborepo, Next.js App Router, NestJS, and Docker Compose.

- [x] Scaffold the pnpm and Turborepo monorepo in the workspace root.

- [x] Implement the Next.js frontend and all six NestJS applications.
- [x] Add Dockerfiles and root Docker Compose orchestration.

- [x] Install required extensions: none required.

- [x] Compile and validate the project with `pnpm build`, `pnpm typecheck`, `pnpm lint`, and `pnpm test`.

- [x] Create and run VS Code tasks in `.vscode/tasks.json`.

- [x] Launch the complete stack and validate it in the browser at `http://localhost:3000`.

- [x] Complete `README.md` and this checklist.

## Development Guidance

- Use `.` as the project working directory and keep communication concise.
- Preserve the pnpm workspace, Turborepo task graph, strict TypeScript configuration, and Compose service names.
- Use `pnpm --filter <package>` for package-specific commands.
- Keep gateway upstreams configurable through environment variables and preserve the global `/api` prefix on NestJS applications.
- Use named wildcard syntax such as `{*path}` for Express 5 and path-to-regexp 8 routes.
- Exclude generated output, dependencies, environment files, logs, and `*.tsbuildinfo` from Docker build contexts.
- Do not install VS Code extensions unless the project explicitly requires them.
- Run relevant builds, type checks, linting, tests, Compose validation, and runtime health checks after source changes.

## Runtime Commands

```powershell
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm docker:up
pnpm docker:down
```

The stack exposes the web application on port `3000`, the gateway on `3001`, and five domain services on ports `3002` through `3006`.
