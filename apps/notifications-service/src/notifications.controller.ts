import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification, CreateNotificationDto, UpdateNotificationDto } from '@academy/interfaces';
import { notifications } from './data';

@Controller('notifications')
export class NotificationsController {
  private readonly notifications: Notification[] = notifications;

  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(): Notification[] {
    return this.notificationsService.findAll(this.notifications);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'notifications-service', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Notification {
    return this.notificationsService.findOne(this.notifications, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateNotificationDto): Notification {
    return this.notificationsService.create(this.notifications, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto): Notification {
    return this.notificationsService.update(this.notifications, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.notificationsService.remove(this.notifications, id);
  }
}
