FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/teachers-service/package.json apps/teachers-service/package.json
COPY packages/interfaces packages/interfaces
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/teachers-service...
COPY apps/teachers-service apps/teachers-service
RUN pnpm --filter @repo/teachers-service build
RUN pnpm --filter @repo/teachers-service --prod deploy --legacy /prod/teachers-service

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3003
COPY --from=build /prod/teachers-service/package.json ./package.json
COPY --from=build /prod/teachers-service/node_modules ./node_modules
COPY --from=build /app/apps/teachers-service/dist ./dist
EXPOSE 3003
CMD ["node", "dist/main.js"]
