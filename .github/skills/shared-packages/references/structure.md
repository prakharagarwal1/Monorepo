# Package Structure

## Standard Layout

```
packages/<name>/
  package.json
  tsconfig.json
  src/
    index.ts        # Public export surface
    <feature>.ts    # Implementation
```

## Rules

- `main` points to the compiled output (`dist/index.js`) or `src/index.ts` for source-only packages
- `types` points to the matching `.d.ts` file
- `files` in `package.json` should include only `dist` for published packages
- Use relative imports within the package; use package names for cross-package imports
- Each package should compile independently with `tsc`

## Dependency Direction

- `apps/*` depend on `packages/*`
- `packages/*` should not depend on `apps/*`
- `packages/axios-interceptors` depends on `axios`
- `packages/ui` depends on `react` and `react-dom`
- `packages/utils`, `packages/constants`, `packages/interfaces` have no runtime dependencies
