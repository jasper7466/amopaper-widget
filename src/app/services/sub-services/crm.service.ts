import { NopaperApiService } from '../api/nopaper-api/nopaper-api.service';
import { PostMessageResponses } from '../../types/crm-messages.types';
import { PostMessageService } from './post-message.service';
import { Injectable } from '@angular/core';
import { PostMessageRequests } from '../../types/crm-messages.types';
import { Store } from '@ngrx/store';
import {
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { AmoApiService } from '../api/amo-api/amo-api.service';
import { documentPacketsIdCrmFieldName } from '../../constants/config';
import { updateCrmContextAction } from '../../store/crm-context/actions';
import { setPacketsIdsAction } from '../../store/packets/actions';
import { IPatchLeadResponse } from '../api/amo-api/amo-api.types';

@Injectable()
export class CrmService {
  private packetIdFieldId: number;
  private leadId: number;

  private packetsIdsPollingBreaker = new Subject<void>();

  constructor(
    private postMessageService: PostMessageService<
      PostMessageRequests,
      PostMessageResponses
    >,
    private store: Store,
    private amoApiService: AmoApiService,
    private nopaperApiService: NopaperApiService
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

  public getCrmContext(): Observable<any> {
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

  public getPacketsFieldId(): Observable<any> {
    return this.amoApiService.getLeadsCustomFieldsAll().pipe(
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

  public startPacketsIdsPolling(): void {
    this.stopPacketsIdsPolling();

    console.log('start packets id polling from crm');
    timer(1, 3000)
      .pipe(
        switchMap(() => this.getLeadPacketsIds()),
        takeUntil(this.packetsIdsPollingBreaker)
      )
      .subscribe();
  }

  public stopPacketsIdsPolling(): void {
    this.packetsIdsPollingBreaker.next();
  }

  private setLeadPacketsIds(idList: number[] | null) {
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

  public attachPacketToLead(packetId: number): Observable<IPatchLeadResponse> {
    return this.getLeadPacketsIds().pipe(
      switchMap((packetsIds) =>
        this.setLeadPacketsIds(packetsIds.concat(packetId))
      )
    );
  }

  public detachPacketFromLead(
    packetId: number
  ): Observable<IPatchLeadResponse> {
    return this.getLeadPacketsIds().pipe(
      switchMap((packetsIds) =>
        this.setLeadPacketsIds(packetsIds.filter((id) => id !== packetId))
      )
    );
  }

  private getLeadPacketsIds(): Observable<number[]> {
    return this.amoApiService.getLeadById(this.leadId).pipe(
      map((lead) => lead.custom_fields_values),
      map((fields) =>
        fields?.filter((field) => field.field_id === this.packetIdFieldId)
      ),
      map((fields) => fields?.pop()),
      map((field) => field?.values.pop()?.value),
      map((stringified) => JSON.parse(stringified || '[]')),
      tap((packetsIds) => {
        this.store.dispatch(setPacketsIdsAction({ packetsIds: packetsIds }));
      })
    );
  }
}
