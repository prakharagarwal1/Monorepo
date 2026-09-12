---
name: nestjs
description: "Use when working on NestJS 11 services in apps/api-gateway or apps/*-service, including controllers, services, modules, DTOs, and routing. Covers NestJS 11 conventions, global /api prefix, and in-memory repositories."
argument-hint: "Describe the NestJS task: controller, service, module, DTO, or route change in any service or the gateway."
user-invocable: true
disable-model-invocation: false
---

# NestJS Skill

## When to Use

- Creating or modifying NestJS controllers, services, or modules
- Working in `apps/api-gateway` or any `apps/*-service` directory
- Adding or updating DTOs, routes, or validation
- Configuring the global `/api` prefix or upstream proxy rules
- Writing or running Jest tests for NestJS packages

## Project Context

- Framework: NestJS 11 with TypeScript
- Global prefix: all NestJS apps use a global `/api` prefix
- Services: `students-service` (3002), `teachers-service` (3003), `courses-service` (3004), `enrollments-service` (3005), `notifications-service` (3006)
- Gateway: `api-gateway` (3001) proxies requests to upstream services via Docker DNS names
- Repositories: intentionally in-memory for the example; replace with a database adapter when persistence is needed
- Testing: Jest with `jest.config.js` in each service

## Conventions

- Use `@Controller('resource')` to define resource routes
- Use standard HTTP decorators: `@Get()`, `@Post()`, `@Patch()`, `@Delete()`
- Use DTOs with `class-validator` for input validation
- Keep services thin: controllers delegate to services, services delegate to repositories
- Use NestJS dependency injection; register providers in the module
- Follow the existing in-memory repository pattern in each service's `data.ts`
- The gateway exposes `/api/health`, `/api`, and forwards resource routes to upstreams

## Procedure

1. Identify the service and the layer to change (controller, service, module, DTO)
2. Locate the file under `apps/<service>/src`
3. Make minimal edits following NestJS decorators and DI conventions
4. Run `pnpm --filter <service> build` or `pnpm --filter <service> test` to validate
5. Verify routes through the gateway at `http://localhost:3001/api`

## References

- [Routing & Controllers](./references/controllers.md)
- [Services & Repositories](./references/services.md)
- [Gateway Configuration](./references/gateway.md)
