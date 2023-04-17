import { Injectable } from '@angular/core';
import { AmoApiService } from '../api/amo-api/amo-api.service';
import { Observable, map, switchMap, tap, of } from 'rxjs';
import { config } from 'src/app/constants/config';
import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';
import { Store } from '@ngrx/store';
import { activeLeadIdSelector } from 'src/app/store/app-context/selectors';

const initialStorageState: ICrmLeadJsonStorage = {
    packetsIdsList: [],
};

const storageFieldName = config.crmJsonStorageFieldName;

@Injectable()
export class CrmJsonStorageService {
    private _storageFieldId: number;
    private _activeLeadId: number;

    private _activeLead$ = this._store$.select(activeLeadIdSelector);

    constructor(private _amoApiService: AmoApiService, private _store$: Store) {
        this._activeLead$.subscribe((leadId) => (this._activeLeadId = leadId));
    }

    public init$(): Observable<void> {
        return this.getStorageFieldId$();
    }

    private getStorageFieldId$(): Observable<void> {
        return this._amoApiService
            .getLeadsCustomFieldsInfoByName$(storageFieldName)
            .pipe(
                map((fields) => {
                    if (fields.length === 0) {
                        throw new Error(`Missing custom field ${storageFieldName}`);
                    }
                    if (fields.length > 1) {
                        throw new Error(`Custom fields duplicate: ${storageFieldName}`);
                    }

                    return fields[0].id;
                }),
                tap((id) => (this._storageFieldId = id)),
                switchMap(() => of(void 0))
            );
    }

    public getStorage$(): Observable<ICrmLeadJsonStorage> {
        return this._amoApiService
            .getLeadCustomFieldValues$(this._activeLeadId, this._storageFieldId)
            .pipe(
                map((response) => {
                    if (response.length === 0) {
                        return initialStorageState;
                    }

                    if (response.length > 1) {
                        throw new Error('Got more than one custom field values array');
                    }

                    if (response[0].values.length > 1) {
                        throw new Error('Got more than one custom field value');
                    }

                    return {
                        ...initialStorageState,
                        ...JSON.parse(response[0].values[0]),
                    };
                })
            );
    }

    public setStorage$(payload: Partial<ICrmLeadJsonStorage>): Observable<void> {
        return this.getStorage$().pipe(
            switchMap((actualState) => {
                const newStateStringified = JSON.stringify({
                    ...actualState,
                    ...payload,
                });

                return this._amoApiService.setLeadCustomFieldValuesById$(
                    this._activeLeadId,
                    [{ id: this._storageFieldId, values: [newStateStringified] }]
                );
            }),
            switchMap(() => of(void 0))
        );
    }
}
