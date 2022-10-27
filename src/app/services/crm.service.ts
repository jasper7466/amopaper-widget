import { PostMessageResponses } from '../types/crm-messages.types';
import { PostMessageService } from './post-message.service';
import { Injectable } from '@angular/core';
import { PostMessageRequests } from '../types/crm-messages.types';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  retry,
  share,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { AmoApiService } from './api/amo/amo-api.service';
import { documentPacketsIdCrmFieldName } from '../constants/config';
import { updateCrmContextAction } from '../store/crm-context/actions';
import { resetPacketIdAction } from '../store/nopaper/actions';
import { setPacketsIdsAction } from '../store/packets-list/actions';

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  private timeout = 3000;
  private packetIdFieldId: number;
  private leadId: number;

  private packetIdsPollingBreaker = new Subject<void>();

  constructor(
    private postMessageService: PostMessageService<
      PostMessageRequests,
      PostMessageResponses
    >,
    private store: Store,
    private amoApiService: AmoApiService
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

  getCrmContext$() {
    return this.postMessageService
      .request$('getCrmContextRequest', 'getCrmContextResponse', null)
      .pipe(
        tap((context) => {
          if (context.cardId) {
            this.leadId = context.cardId;
          }
          this.store.dispatch(updateCrmContextAction(context));
        })
      );
  }

  getPacketFieldId$() {
    return this.amoApiService.getLeadsCustomFieldsAll$.pipe(
      map((fields) =>
        fields.filter((field) => field.name === documentPacketsIdCrmFieldName)
      ),
      tap((fields) => {
        if (fields.length === 0) {
          throw new Error('Missing documents packet id custom field');
        }
        if (fields.length > 1) {
          throw new Error('Documents packet id custom field duplicate');
        }
      }),
      map((fields) => fields.pop()?.id),
      tap((id) => (this.packetIdFieldId = id as number))
    );
  }

  public startPacketsPolling(): void {
    this.stopPacketsPolling();

    console.log('start packets id polling from crm');
    timer(1, 3000)
      .pipe(
        switchMap(() => this.getPacketsIdList()),
        takeUntil(this.packetIdsPollingBreaker)
      )
      .subscribe();
  }

  public stopPacketsPolling(): void {
    this.packetIdsPollingBreaker.next();
  }

  setPacketIds$(idList: number[] | null) {
    const value = idList ? JSON.stringify(idList) : idList;

    return this.amoApiService.patchLeadById(this.leadId, {
      custom_fields_values: [
        {
          field_id: this.packetIdFieldId,
          values: [{ value }],
        },
      ],
    });
  }

  resetPacketId$() {
    this.store.dispatch(resetPacketIdAction());
    return this.setPacketIds$(null);
  }

  private getPacketsIdList(): Observable<number[]> {
    return this.amoApiService.getLeadById$(this.leadId).pipe(
      map((lead) => lead.custom_fields_values),
      map((fields) =>
        fields?.filter((field) => field.field_id === this.packetIdFieldId)
      ),
      map((fields) => fields?.pop()),
      map((field) => field?.values.pop()?.value),
      map((stringified) => JSON.parse(stringified)),
      tap((packetsIds) => {
        const parsed = packetsIds || [];
        this.store.dispatch(setPacketsIdsAction({ packetsIds: parsed }));
      })
    );
  }
}
