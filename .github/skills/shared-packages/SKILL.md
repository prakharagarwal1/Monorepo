---
name: shared-packages
description: "Use when working on shared TypeScript packages in packages/, including @academy/ui, @academy/utils, @academy/constants, @academy/interfaces, or @academy/axios-interceptors. Covers package structure, exports, and cross-package dependencies."
argument-hint: "Describe the shared package task: component, utility, constant, type, or interceptor change in packages/."
user-invocable: true
disable-model-invocation: false
---

# Shared Packages Skill

## When to Use

- Creating or modifying code in `packages/ui`, `packages/utils`, `packages/constants`, `packages/interfaces`, or `packages/axios-interceptors`
- Adding a new shared component, hook, utility, constant, or type
- Updating package exports, dependencies, or build configuration
- Resolving cross-package imports between shared packages

## Package Inventory

| Package                       | Purpose                             | Dependencies     |
| ----------------------------- | ----------------------------------- | ---------------- |
| `@academy/ui`                 | Shared React components             | react, react-dom |
| `@academy/utils`              | Shared utility functions            | none             |
| `@academy/constants`          | Shared constants                    | none             |
| `@academy/interfaces`         | Shared TypeScript types             | none             |
| `@academy/axios-interceptors` | Axios request/response interceptors | axios            |

## Conventions

- Each package has its own `package.json` and `tsconfig.json`
- Build with `tsc`; run `pnpm --filter <package> build` to compile
- Export the public API from `src/index.ts`
- Keep packages dependency-light; avoid circular dependencies
- `@academy/interfaces` exports types only; do not add runtime logic
- `@academy/utils` and `@academy/constants` should be side-effect free
- `@academy/axios-interceptors` should be framework-agnostic (works with any axios instance)

## Procedure

1. Identify the package and the kind of change (component, utility, type, interceptor)
2. Add or modify code under `packages/<package>/src`
3. Update `packages/<package>/src/index.ts` to export the new API
4. Run `pnpm --filter <package> build` to verify compilation
5. Run `pnpm typecheck` to verify cross-package type resolution

## References

- [Package Structure](./references/structure.md)
- [Interceptors](./references/interceptors.md)
