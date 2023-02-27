import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { AmoApiService } from '../api/amo-api/amo-api.service';
import { updateCrmContextAction } from '../../store/crm-context/actions';
import { AmoPostApiService } from '../api/amo-post-api/amo-post-api.service';
import { config } from 'src/app/constants/config';
import { activeLeadIdSelector } from 'src/app/store/app-context/selectors';
import { CrmJsonStorageService } from './crm-json-storage.service';
import { updateLeadJsonStorageAction } from 'src/app/store/crm-lead-context/actions';

const crmJsonStoragePollingInterval = config.crmJsonStoragePollingInterval;
@Injectable()
export class CrmService {
  private crmJsonStoragePollingBreaker = new Subject<void>();
  private activeLeadId: number;

  private activeLeadId$ = this.store.select(activeLeadIdSelector);

  constructor(
    private store: Store,
    private crmJsonStorageService: CrmJsonStorageService,
    private amoApiService: AmoApiService,
    private amoPostApiService: AmoPostApiService
  ) {
    this.activeLeadId$.subscribe((id) => (this.activeLeadId = id));
  }

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

  private getJsonStorage(): Observable<any> {
    return this.crmJsonStorageService
      .getStorage()
      .pipe(
        tap((storageState) =>
          this.store.dispatch(updateLeadJsonStorageAction(storageState))
        )
      );
  }

  public getCrmContext(): Observable<any> {
    return this.amoPostApiService.getCrmContext().pipe(
      tap((context) => {
        this.store.dispatch(updateCrmContextAction(context));
      })
    );
  }

  public startJsonStoragePolling(): void {
    this.stopJsonStoragePolling();

    timer(1, crmJsonStoragePollingInterval)
      .pipe(
        switchMap(() => this.getJsonStorage()),
        takeUntil(this.crmJsonStoragePollingBreaker)
      )
      .subscribe();
  }

  public stopJsonStoragePolling(): void {
    this.crmJsonStoragePollingBreaker.next();
  }

  public attachPacketToLead(packetId: number): Observable<any> {
    return this.crmJsonStorageService.getStorage().pipe(
      switchMap((state) => {
        if (state.packetsIdsList.includes(packetId)) {
          return of(null);
        }

        return this.crmJsonStorageService.setStorage({
          packetsIdsList: [...state.packetsIdsList, packetId],
        });
      })
    );
  }

  public detachPacketFromLead(packetId: number): Observable<any> {
    return this.crmJsonStorageService.getStorage().pipe(
      switchMap((state) => {
        const filteredIdList = state.packetsIdsList.filter(
          (id) => id !== packetId
        );
        if (state.packetsIdsList.length === filteredIdList.length) {
          return of(null);
        }
        return this.crmJsonStorageService.setStorage({
          packetsIdsList: filteredIdList,
        });
      })
    );
  }

  // public getLeadAttachments(): Observable<void> {
  //   return this.amoApiService.getLeadAttachments(this.activeLeadId).pipe(
  //     tap(console.log),
  //     switchMap(() => of())
  //   );
  // }
}
