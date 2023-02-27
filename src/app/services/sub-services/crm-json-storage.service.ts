import { Injectable } from '@angular/core';
import { AmoApiService } from '../api/amo-api/amo-api.service';
import { Observable, map, switchMap, tap } from 'rxjs';
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
  private storageFieldId: number;
  private activeLeadId: number;

  private activeLead$ = this.store.select(activeLeadIdSelector);

  constructor(private amoApiService: AmoApiService, private store: Store) {
    this.activeLead$.subscribe((leadId) => (this.activeLeadId = leadId));
  }

  public init(): Observable<any> {
    return this.getStorageFieldId();
  }

  private getStorageFieldId(): Observable<number> {
    return this.amoApiService
      .getLeadsCustomFieldsInfoByName(storageFieldName)
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
        tap((id) => (this.storageFieldId = id))
      );
  }

  public getStorage(): Observable<ICrmLeadJsonStorage> {
    return this.amoApiService
      .getLeadCustomFieldValues(this.activeLeadId, this.storageFieldId)
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

  public setStorage(payload: Partial<ICrmLeadJsonStorage>): Observable<any> {
    return this.getStorage().pipe(
      switchMap((actualState) => {
        const newStateStringified = JSON.stringify({
          ...actualState,
          ...payload,
        });

        return this.amoApiService.setLeadCustomFieldValuesById(
          this.activeLeadId,
          [{ id: this.storageFieldId, values: [newStateStringified] }]
        );
      })
    );
  }
}
