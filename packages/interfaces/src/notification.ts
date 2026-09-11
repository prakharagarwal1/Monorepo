export interface Notification {
  id: string;
  recipientId: string;
  type: 'email' | 'sms' | 'in-app';
  subject: string;
  message: string;
  status: 'queued' | 'sent' | 'failed';
  createdAt: string;
}

export interface CreateNotificationDto {
  recipientId: string;
  type: Notification['type'];
  subject: string;
  message: string;
  status?: Notification['status'];
}

export interface UpdateNotificationDto {
  status?: Notification['status'];
  message?: string;
}