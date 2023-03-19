import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, takeUntil, tap, timer } from 'rxjs';
import { updateCrmContextAction } from '../../store/crm-context/actions';
import { AmoPostApiService } from '../api/amo-post-api/amo-post-api.service';
import { config } from 'src/app/constants/config';
import { CrmJsonStorageService } from './crm-json-storage.service';
import { updateLeadJsonStorageAction } from 'src/app/store/crm-lead-context/actions';
import { crmContextSelector } from 'src/app/store/crm-context/selectors';
import { NotificationService } from './notification.service';
import { notifications } from 'src/app/constants/notifications';

const crmJsonStoragePollingInterval = config.crmJsonStoragePollingInterval;
@Injectable()
export class CrmService {
  private storagePollingBreaker = new EventEmitter<void>();
  private context: ReturnType<typeof crmContextSelector>;

  private context$ = this.store.select(crmContextSelector);

  constructor(
    private store: Store,
    private crmJsonStorageService: CrmJsonStorageService,
    private amoPostApiService: AmoPostApiService,
    private notificationService: NotificationService
  ) {
    this.context$.subscribe((context) => (this.context = context));
  }

  public checkWidgetStatus(): void | never {
    if (!this.context) {
      throw new Error(`${this.constructor.name}: crmContext is not defined.`);
    }

    const { isAdminUser, isWidgetActive, isWidgetConfigured } = this.context;

    if (!isWidgetActive || !isWidgetConfigured) {
      if (isAdminUser) {
        this.notificationService.notify(notifications.widgetNotConfiguredAdmin);
      } else {
        this.notificationService.notify(notifications.widgetNotConfiguredAdmin);
      }
    }
  }

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
        takeUntil(this.storagePollingBreaker)
      )
      .subscribe();
  }

  public stopJsonStoragePolling(): void {
    this.storagePollingBreaker.emit();
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
}
