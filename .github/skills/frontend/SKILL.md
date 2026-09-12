---
name: frontend
description: "Use when working on the Next.js 15 App Router frontend in apps/web, React components in packages/ui, or frontend routing, styling, and hooks. Covers Next.js 15, React 18, TypeScript, and shared UI package conventions."
argument-hint: "Describe the frontend task: component, page, hook, or styling change in apps/web or packages/ui."
user-invocable: true
disable-model-invocation: false
---

# Frontend Skill (Next.js 15 + React 18)

## When to Use

- Creating or modifying pages, layouts, or components in `apps/web`
- Working on shared UI components in `packages/ui`
- Adding or updating frontend hooks in `apps/web/src/hooks`
- Styling, routing, or data-fetching questions for the React app
- Next.js 15 App Router conventions, Server/Client Components, and metadata

## Project Context

- Framework: Next.js 15 with the App Router (`apps/web/src/app`)
- Language: TypeScript with strict mode
- Shared UI package: `packages/ui` (`@academy/ui`) exports React components
- Shared utilities: `packages/utils` (`@academy/utils`), `packages/constants` (`@academy/constants`)
- Shared types: `packages/interfaces` (`@academy/interfaces`)
- HTTP client: Axios interceptors from `packages/axios-interceptors` (`@academy/axios-interceptors`)
- API base: gateway at `http://localhost:3001` (or `NEXT_PUBLIC_API_BASE_URL`)
- Port: `3000` for local development

## Conventions

- Use the Next.js App Router: `apps/web/src/app` for routes, `layout.tsx` for shared layout
- Prefer Server Components by default; mark interactive components with `'use client'`
- Import shared components from `@academy/ui`, types from `@academy/interfaces`, constants from `@academy/constants`
- Use the Axios interceptor package for API calls; keep error handling consistent
- Keep client components small and focused; lift shared state to the nearest common parent or a hook
- Use Tailwind/CSS Modules for styling (follow the existing style system in the app)

## Procedure

1. Identify whether the change is a route, component, hook, or styling concern
2. Locate the relevant file under `apps/web/src` or `packages/ui/src`
3. Make minimal, focused edits following the App Router conventions
4. Run `pnpm --filter web dev` to verify locally, or `pnpm typecheck` for type safety
5. Validate the page in the browser at `http://localhost:3000`

## References

- [Next.js Config](./references/nextjs.md)
- [Component Conventions](./references/components.md)
