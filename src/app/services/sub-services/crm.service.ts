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
    private _storagePollingBreaker = new EventEmitter<void>();
    private _context: ReturnType<typeof crmContextSelector>;

    private _context$ = this._store$.select(crmContextSelector);

    constructor(
        private _store$: Store,
        private _crmJsonStorageService: CrmJsonStorageService,
        private _amoPostApiService: AmoPostApiService,
        private _notificationService: NotificationService
    ) {
        this._context$.subscribe((context) => (this._context = context));
    }

    public checkWidgetStatus(): void | never {
        if (!this._context) {
            throw new Error(`${this.constructor.name}: crmContext is not defined.`);
        }

        const { isAdminUser, isWidgetActive, isWidgetConfigured } = this._context;

        if (!isWidgetActive || !isWidgetConfigured) {
            if (isAdminUser) {
                this._notificationService.notify(
                    notifications.widgetNotConfiguredAdmin
                );
            } else {
                this._notificationService.notify(
                    notifications.widgetNotConfiguredAdmin
                );
            }
        }
    }

    private getJsonStorage$(): Observable<void> {
        return this._crmJsonStorageService.getStorage$().pipe(
            tap((storageState) =>
                this._store$.dispatch(updateLeadJsonStorageAction(storageState))
            ),
            switchMap(() => of(void 0))
        );
    }

    public getCrmContext$(): Observable<void> {
        return this._amoPostApiService.getCrmContext$().pipe(
            tap((context) => {
                this._store$.dispatch(updateCrmContextAction(context));
            }),
            switchMap(() => of(void 0))
        );
    }

    public startJsonStoragePolling(): void {
        this.stopJsonStoragePolling();

        timer(1, crmJsonStoragePollingInterval)
            .pipe(
                switchMap(() => this.getJsonStorage$()),
                takeUntil(this._storagePollingBreaker)
            )
            .subscribe();
    }

    public stopJsonStoragePolling(): void {
        this._storagePollingBreaker.emit();
    }

    public attachPacketToLead$(packetId: number): Observable<void> {
        return this._crmJsonStorageService.getStorage$().pipe(
            switchMap((state) => {
                if (state.packetsIdsList.includes(packetId)) {
                    return of(void 0);
                }

                return this._crmJsonStorageService.setStorage$({
                    packetsIdsList: [...state.packetsIdsList, packetId],
                });
            })
        );
    }

    public detachPacketFromLead$(packetId: number): Observable<void> {
        return this._crmJsonStorageService.getStorage$().pipe(
            switchMap((state) => {
                const filteredIdList = state.packetsIdsList.filter(
                    (id) => id !== packetId
                );
                if (state.packetsIdsList.length === filteredIdList.length) {
                    return of(void 0);
                }
                return this._crmJsonStorageService.setStorage$({
                    packetsIdsList: filteredIdList,
                });
            })
        );
    }
}
