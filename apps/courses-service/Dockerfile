FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/courses-service/package.json apps/courses-service/package.json
COPY packages/interfaces packages/interfaces
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/courses-service...
COPY apps/courses-service apps/courses-service
RUN pnpm --filter @repo/courses-service build
RUN pnpm --filter @repo/courses-service --prod deploy --legacy /prod/courses-service

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3004
COPY --from=build /prod/courses-service/package.json ./package.json
COPY --from=build /prod/courses-service/node_modules ./node_modules
COPY --from=build /app/apps/courses-service/dist ./dist
EXPOSE 3004
CMD ["node", "dist/main.js"]
