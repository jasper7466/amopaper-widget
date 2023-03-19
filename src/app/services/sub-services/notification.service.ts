import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';

export type Notification = {
  type: 'error' | 'info';
  title?: string;
  details?: string;
  hint?: string;
};

const baseContext: Notification = {
  type: 'info',
  hint: 'В случае регулярного повторения ошибки - обратитесь в службу поддержки Nopaper.',
};

@Injectable()
export class NotificationService {
  context: Notification;

  constructor(private routingService: RoutingService) {}

  public notify(context: Notification) {
    this.context = { ...baseContext, ...context };
    this.routingService.goNotificationPage();
  }

  public error(context: Omit<Notification, 'type'>) {
    this.notify({
      type: 'error',
      ...context,
    });
  }

  public info(context: Omit<Notification, 'type'>) {
    this.notify({
      type: 'info',
      ...context,
    });
  }
}
