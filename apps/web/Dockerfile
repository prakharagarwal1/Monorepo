FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/web...
COPY apps/web apps/web
RUN pnpm --filter @repo/web... build
RUN pnpm --filter @repo/web --prod deploy --legacy /prod/web

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /prod/web/package.json ./package.json
COPY --from=build /prod/web/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./.next
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "--port", "3000"]
