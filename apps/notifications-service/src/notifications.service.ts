import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto, Notification, UpdateNotificationDto } from '@academy/interfaces';

@Injectable()
export class NotificationsService {
  findAll(notifications: Notification[]): Notification[] {
    return notifications;
  }

  findOne(notifications: Notification[], id: string): Notification {
    const notification = notifications.find((item) => item.id === id);
    if (!notification) {
      throw new NotFoundException(`Notification ${id} was not found`);
    }
    return notification;
  }

  create(notifications: Notification[], dto: CreateNotificationDto): Notification {
    const notification: Notification = {
      id: `ntf_${String(notifications.length + 1).padStart(3, '0')}`,
      ...dto,
      status: dto.status ?? 'queued',
      createdAt: new Date().toISOString(),
    };
    notifications.push(notification);
    return notification;
  }

  update(notifications: Notification[], id: string, dto: UpdateNotificationDto): Notification {
    const index = notifications.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Notification ${id} was not found`);
    }
    const current = notifications[index];
    if (!current) {
      throw new NotFoundException(`Notification ${id} was not found`);
    }
    const updated = { ...current, ...dto };
    notifications[index] = updated;
    return updated;
  }

  remove(notifications: Notification[], id: string): void {
    const index = notifications.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Notification ${id} was not found`);
    }
    notifications.splice(index, 1);
  }
}
