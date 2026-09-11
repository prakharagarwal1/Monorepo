FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/enrollments-service/package.json apps/enrollments-service/package.json
COPY packages/interfaces packages/interfaces
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/enrollments-service...
COPY apps/enrollments-service apps/enrollments-service
RUN pnpm --filter @repo/enrollments-service build
RUN pnpm --filter @repo/enrollments-service --prod deploy --legacy /prod/enrollments-service

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3005
COPY --from=build /prod/enrollments-service/package.json ./package.json
COPY --from=build /prod/enrollments-service/node_modules ./node_modules
COPY --from=build /app/apps/enrollments-service/dist ./dist
EXPOSE 3005
CMD ["node", "dist/main.js"]
