FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/notifications-service/package.json apps/notifications-service/package.json
COPY packages/interfaces packages/interfaces
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/notifications-service...
COPY apps/notifications-service apps/notifications-service
RUN pnpm --filter @repo/notifications-service build
RUN pnpm --filter @repo/notifications-service --prod deploy --legacy /prod/notifications-service

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3006
COPY --from=build /prod/notifications-service/package.json ./package.json
COPY --from=build /prod/notifications-service/node_modules ./node_modules
COPY --from=build /app/apps/notifications-service/dist ./dist
EXPOSE 3006
CMD ["node", "dist/main.js"]
