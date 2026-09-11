FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-gateway/package.json apps/api-gateway/package.json
RUN corepack enable && pnpm install --frozen-lockfile --filter @repo/api-gateway...
COPY turbo.json eslint.config.mjs tsconfig.base.json ./
COPY apps/api-gateway apps/api-gateway
RUN pnpm --filter @repo/api-gateway build
RUN pnpm --filter @repo/api-gateway --prod deploy --legacy /prod/api-gateway

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
COPY --from=build /prod/api-gateway/package.json ./package.json
COPY --from=build /prod/api-gateway/node_modules ./node_modules
COPY --from=build /app/apps/api-gateway/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]
