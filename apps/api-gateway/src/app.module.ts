import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
  controllers: [GatewayController, ProxyController],
  providers: [GatewayService, ProxyService],
})
export class AppModule {}
