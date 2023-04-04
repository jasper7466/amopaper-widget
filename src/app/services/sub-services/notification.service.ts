import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';

export type TNotification = {
  type: 'error' | 'info';
  title?: string;
  details?: string;
  hint?: string;
};

const baseContext: TNotification = {
  type: 'info',
  hint: 'В случае регулярного повторения ошибки - обратитесь в службу поддержки Nopaper.',
};

@Injectable()
export class NotificationService {
  public context: TNotification;

  constructor(private _routingService: RoutingService) {}

  public notify(context: TNotification): void {
    this.context = { ...baseContext, ...context };
    this._routingService.goNotificationPage();
  }

  public error(context: Omit<TNotification, 'type'>): void {
    this.notify({
      type: 'error',
      ...context,
    });
  }

  public info(context: Omit<TNotification, 'type'>): void {
    this.notify({
      type: 'info',
      ...context,
    });
  }
}
