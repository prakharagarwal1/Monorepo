import { Controller, All, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('{*path}')
  forward(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forward(req, res);
  }
}
