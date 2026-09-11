import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  health() {
    return this.gatewayService.health();
  }

  @Get()
  info() {
    return {
      service: 'api-gateway',
      status: 'ok',
      routes: ['/students', '/teachers', '/courses', '/enrollments', '/notifications'],
    };
  }
}
