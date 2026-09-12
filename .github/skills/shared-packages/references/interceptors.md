# Axios Interceptors

## Purpose

`@academy/axios-interceptors` provides reusable request and response interceptors for axios instances used across the monorepo.

## Usage

```typescript
import axios from "axios";
import { attachInterceptors } from "@academy/axios-interceptors";

const api = axios.create({ baseURL: process.env.API_BASE_URL });
attachInterceptors(api);
```

## Rules

- Interceptors must be framework-agnostic; do not import React or NestJS-specific code
- Handle request headers, error responses, and retries in a consistent way
- Export a single `attachInterceptors` function that takes an axios instance
- Keep the interceptor logic testable and side-effect free
