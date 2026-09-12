# Next.js 15 Reference

## App Router Structure

```
apps/web/src/app/
  layout.tsx        # Root layout
  page.tsx          # Home route
  students/
    page.tsx        # /students route
  loading.tsx       # Suspense boundaries
  error.tsx         # Error boundaries
  globals.css       # Global styles
```

## Key Rules

- `layout.tsx` should not be marked `'use client'` unless it needs interactivity
- Use `generateMetadata` for dynamic page metadata
- Use `searchParams` for query-string access in pages
- Server Components can fetch data directly; Client Components use `useState`/`useEffect`
- Avoid importing `@academy/ui` server-side if it depends on browser APIs

## Commands

```powershell
pnpm --filter web dev      # Start dev server on port 3000
pnpm --filter web build    # Production build
pnpm --filter web lint     # Lint the web app
```
