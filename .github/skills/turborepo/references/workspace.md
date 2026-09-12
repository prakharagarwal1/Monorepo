# Workspace Setup

## pnpm-workspace.yaml

```yaml
packages:
  - apps/*
  - packages/*
```

## Root package.json Scripts

```json
{
  "scripts": {
    "build": "turbo run build",
    "typecheck": "turbo run typecheck",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "dev": "turbo run dev",
    "docker:up": "docker compose up --build --detach",
    "docker:down": "docker compose down"
  }
}
```

## Rules

- Use `pnpm install` to link workspace packages
- Use `pnpm --filter <package>` for isolated commands
- Add new apps under `apps/` and packages under `packages/`
- Keep package names scoped (e.g. `@academy/ui`)
