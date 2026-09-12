---
name: turborepo
description: "Use when working with Turborepo task orchestration, turbo.json, pnpm workspace configuration, monorepo scripts, or running build/typecheck/lint/test across packages. Covers Turborepo conventions and pnpm workspace patterns."
argument-hint: "Describe the Turborepo task: pipeline config, workspace script, or cross-package command."
user-invocable: true
disable-model-invocation: false
---

# Turborepo Skill

## When to Use

- Modifying `turbo.json` or adding Turborepo tasks
- Working on `pnpm-workspace.yaml`, root `package.json` scripts, or workspace configuration
- Running or debugging `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`
- Adding a new package or app to the monorepo
- Understanding dependency relationships between packages and apps

## Project Context

- Package manager: pnpm 10 with `pnpm-workspace.yaml`
- Monorepo tool: Turborepo with `turbo.json`
- Node.js: 22 or newer
- Apps: `web`, `api-gateway`, and five domain services under `apps/`
- Shared packages: `packages/ui`, `packages/utils`, `packages/constants`, `packages/interfaces`, `packages/axios-interceptors`

## Conventions

- Use `pnpm --filter <package>` for package-specific commands
- Turborepo tasks are defined in `turbo.json` with `dependsOn` and `outputs`
- Build outputs go to `dist/` for packages and `.next/` for the Next.js app
- The root scripts delegate to Turborepo: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`
- Workspace globs: `apps/*` and `packages/*`
- Keep the Turborepo task graph minimal; only declare real dependencies

## Procedure

1. Identify whether the change is to `turbo.json`, workspace config, or a root script
2. Make minimal edits to the configuration files
3. Run the relevant root command (`pnpm build`, `pnpm typecheck`, etc.) to validate
4. Use `pnpm --filter <package>` to test individual packages in isolation

## References

- [Pipeline Configuration](./references/pipeline.md)
- [Workspace Setup](./references/workspace.md)
