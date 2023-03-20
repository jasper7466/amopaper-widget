import { AmoApiModule, POST_MESSAGE_HTTP_CLIENT_TOKEN } from './amo-api.module';
import { domainSelector } from '../../../store/crm-context/selectors';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { accessTokenSelector } from 'src/app/store/access-token/selectors';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { getEntityCustomFieldsAllEndpoint } from './endpoints/get-entity-custom-fields-all.endpoint';
import { Observable, map } from 'rxjs';
import { getLeadEndpoint } from './endpoints/get-lead.endpoint';
import { ICrmCustomFieldValues } from 'src/app/interfaces/crm-custom-field-value.interface';
import { ICrmCustomFieldInfo } from 'src/app/interfaces/crm-custom-field.interface-info';
import { patchLeadEndpoint } from './endpoints/patch-lead.endpoint';

const BASE_URL_COMPILER: (domain: string) => string = environment.getAmoBaseUrl;

@Injectable({
  providedIn: AmoApiModule,
})
export class AmoApiService extends ApiService {
  constructor(
    @Inject(POST_MESSAGE_HTTP_CLIENT_TOKEN) http: HttpClient,
    private store: Store
  ) {
    super(http);

    this.setHeaders({ 'Content-Type': 'application/json' });

    this.store.select(accessTokenSelector).subscribe((token) => {
      this.setHeaders({ Authorization: `Bearer ${token}` });
    });

    this.store.select(domainSelector).subscribe((domain) => {
      if (domain) {
        this.baseUrl = BASE_URL_COMPILER(domain);
      }
    });
  }

  public getLeadsCustomFieldsInfoByName(
    fieldName: string
  ): Observable<ICrmCustomFieldInfo[]> {
    return getEntityCustomFieldsAllEndpoint
      .call(this, 'leads')
      .pipe(
        map((response) => response.filter((item) => item.name === fieldName))
      );
  }

  public getLeadCustomFieldValues(
    leadId: number,
    fieldId: number
  ): Observable<ICrmCustomFieldValues[]> {
    return getLeadEndpoint.call(this, leadId).pipe(
      map((response) => {
        if (response.custom_fields_values === null) {
          return [];
        }

        return response.custom_fields_values
          .map((item) => ({
            id: item.field_id,
            values: item.values.map((item) => item.value),
          }))
          .filter((item) => item.id === fieldId);
      })
    );
  }

  public setLeadCustomFieldValuesById(
    leadId: number,
    values: ICrmCustomFieldValues[]
  ) {
    return patchLeadEndpoint.call(this, leadId, {
      custom_fields_values: values.map((item) => ({
        field_id: item.id,
        values: item.values.map((item) => ({ value: item })),
      })),
    });
  }

  public getLeadName(leadId: number): Observable<string> {
    return getLeadEndpoint
      .call(this, leadId)
      .pipe(map((response) => response.name));
  }
}
