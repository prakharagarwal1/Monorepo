import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  health() {
    return {
      status: 'ok',
      service: 'api-gateway',
      upstreams: {
        students: process.env.STUDENTS_SERVICE_URL ?? 'http://127.0.0.1:3002',
        teachers: process.env.TEACHERS_SERVICE_URL ?? 'http://127.0.0.1:3003',
        courses: process.env.COURSES_SERVICE_URL ?? 'http://127.0.0.1:3004',
        enrollments: process.env.ENROLLMENTS_SERVICE_URL ?? 'http://127.0.0.1:3005',
        notifications: process.env.NOTIFICATIONS_SERVICE_URL ?? 'http://127.0.0.1:3006',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
