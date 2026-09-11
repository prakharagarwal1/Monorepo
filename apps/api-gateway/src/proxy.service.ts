import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
]);

const SERVICE_URLS: Record<string, string> = {
  students: process.env.STUDENTS_SERVICE_URL ?? 'http://127.0.0.1:3002',
  teachers: process.env.TEACHERS_SERVICE_URL ?? 'http://127.0.0.1:3003',
  courses: process.env.COURSES_SERVICE_URL ?? 'http://127.0.0.1:3004',
  enrollments: process.env.ENROLLMENTS_SERVICE_URL ?? 'http://127.0.0.1:3005',
  notifications: process.env.NOTIFICATIONS_SERVICE_URL ?? 'http://127.0.0.1:3006',
};

@Injectable()
export class ProxyService {
  async forward(req: Request, res: Response): Promise<void> {
    const service = this.serviceFor(req.path);
    if (!service) {
      res.status(404).json({ error: 'Unknown gateway route' });
      return;
    }

    const upstreamPath = req.originalUrl;
    const url = new URL(upstreamPath, SERVICE_URLS[service]);
    const method = req.method;
    const headers = new Headers();

    for (const [name, value] of Object.entries(req.headers)) {
      if (value !== undefined && !HOP_BY_HOP_HEADERS.has(name.toLowerCase())) {
        headers.set(name, Array.isArray(value) ? value.join(', ') : value);
      }
    }

    const body = this.serializeBody(req.body);

    try {
      const upstreamResponse = await fetch(url, {
        method,
        headers,
        body: body ? new Uint8Array(body) : undefined,
        redirect: 'manual',
      });
      const responseHeaders = new Headers(upstreamResponse.headers);
      for (const name of HOP_BY_HOP_HEADERS) {
        responseHeaders.delete(name);
      }

      res.status(upstreamResponse.status);
      for (const [name, value] of responseHeaders.entries()) {
        res.setHeader(name, value);
      }

      if (method === 'HEAD' || upstreamResponse.status === 204) {
        res.end();
        return;
      }

      res.send(Buffer.from(await upstreamResponse.arrayBuffer()));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upstream request failed';
      res.status(502).json({
        error: 'Bad gateway',
        service,
        message,
      });
    }
  }

  private serviceFor(path: string): keyof typeof SERVICE_URLS | undefined {
    const normalizedPath = path.replace(/^\/api\/?/, '').replace(/^\/+|\/+$/g, '');
    const segment = normalizedPath.split('/')[0];
    if (segment && segment in SERVICE_URLS) {
      return segment as keyof typeof SERVICE_URLS;
    }
    return undefined;
  }

  private serializeBody(body: unknown): Buffer | undefined {
    if (body === undefined || body === null) {
      return undefined;
    }
    if (Buffer.isBuffer(body)) {
      return body;
    }
    if (typeof body === 'string') {
      return Buffer.from(body);
    }
    if (body instanceof URLSearchParams) {
      return Buffer.from(body.toString());
    }
    return Buffer.from(JSON.stringify(body));
  }
}
