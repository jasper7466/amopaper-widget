import { InboxResponses } from '../../types/crm-messages.types';
import { PostMessageService } from './post-message.service';
import { Injectable } from '@angular/core';
import { OutboxRequests } from '../../types/crm-messages.types';
import { NotificationService } from './notification.service';
import { notifications } from '../constants/notifications';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  context: InboxResponses['getCrmContextResponse'] | null = null;
  timeout = 3000;

  constructor(
    private postMessageService: PostMessageService<
      OutboxRequests,
      InboxResponses
    >,
    private notificationService: NotificationService
  ) {}

  isTopWindow = () => window.location === window.parent.location;

  get getCrmContext$() {
    return this.postMessageService
      .requestWithTimeout$(
        'getCrmContextRequest',
        'getCrmContextResponse',
        null,
        this.timeout
      )
      .pipe(
        catchError(() => {
          this.notificationService.notify(
            notifications.getCrmContextTimeoutError
          );
          return EMPTY;
        }),
        tap((context) => {
          this.context = context;

          const { active, status } = context.settings;
          const isAdmin = context.constants.user_rights.is_admin;

          if (active !== 'Y' || status === 'not_configured') {
            if (isAdmin) {
              this.notificationService.notify(
                notifications.widgetNotConfiguredAdmin
              );
            } else {
              this.notificationService.notify(
                notifications.widgetNotConfiguredAdmin
              );
            }
          }
        })
      );
  }
}
