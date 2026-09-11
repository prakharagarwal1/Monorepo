FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/students-service/package.json apps/students-service/package.json
COPY packages/interfaces packages/interfaces
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/students-service...
COPY apps/students-service apps/students-service
RUN pnpm --filter @repo/students-service build
RUN pnpm --filter @repo/students-service --prod deploy --legacy /prod/students-service

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
COPY --from=build /prod/students-service/package.json ./package.json
COPY --from=build /prod/students-service/node_modules ./node_modules
COPY --from=build /app/apps/students-service/dist ./dist
EXPOSE 3002
CMD ["node", "dist/main.js"]
