# Component Conventions

## Shared UI Package (`packages/ui`)

- Export components from `packages/ui/src/index.ts`
- Each component gets its own file, e.g. `packages/ui/src/Button.tsx`
- Use React 18 functional components with TypeScript props
- Prefer explicit prop types over inline `React.FC`

## Client Components

- Mark with `'use client'` at the top of the file
- Keep them small and focused on interactivity
- Avoid server-only imports (e.g. `fs`, database clients)

## Hooks

- Located in `apps/web/src/hooks`
- Name files `useXxx.ts`
- Return typed values; avoid side effects outside `useEffect`

## Styling

- Use the existing style system (CSS Modules or Tailwind, as configured)
- Keep styles scoped to the component
- Reuse shared classes/constants rather than duplicating styles
