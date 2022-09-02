import { PostMessageResponses } from '../../types/crm-messages.types';
import { PostMessageService } from './post-message.service';
import { Injectable } from '@angular/core';
import { PostMessageRequests } from '../../types/crm-messages.types';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  timeout = 3000;

  constructor(
    private postMessageService: PostMessageService<
      PostMessageRequests,
      PostMessageResponses
    >,
    private store: Store
  ) {}

  // checkWidgetStatus() {
  //   if (!this.context) {
  //     throw new Error('CRM context is undefined');
  //   }

  //   const { active, status } = this.context.settings;
  //   const isAdmin = this.context.constants.user_rights.is_admin;

  //   if (active !== 'Y' || status === 'not_configured') {
  //     if (isAdmin) {
  //       this.notificationService.notify(notifications.widgetNotConfiguredAdmin);
  //     } else {
  //       this.notificationService.notify(notifications.widgetNotConfiguredAdmin);
  //     }
  //   }
  // }

  get getCrmContext$() {
    return this.postMessageService.request$(
      'getCrmContextRequest',
      'getCrmContextResponse',
      null
    );
  }
}
