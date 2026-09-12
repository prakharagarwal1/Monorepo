# Turborepo Pipeline

## turbo.json

Tasks are defined with dependency tracking:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"],
      "outputs": ["coverage/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Rules

- `^build` means "run build in dependencies first"
- Only declare outputs that are actually produced
- `dev` tasks should be `cache: false` and `persistent: true`
- Keep the pipeline flat; avoid deep dependency chains
