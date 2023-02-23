import { domainSelector } from '../../../store/crm-context/selectors';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { accessTokenSelector } from 'src/app/store/access-token/selectors';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { getCompaniesCustomFieldsAllEndpoint } from './endpoints/get-companies-custom-fields-all.endpoint';
import { getLeadsCustomFieldsAllEndpoint } from './endpoints/get-leads-custom-fields-all.endpoint';
import { patchLeadCustomFieldValueCustomEndpoint } from './endpoints/patch-lead-custom-field-value.custom-endpoint';
import { getLeadCustomFieldValueCustomEndpoint } from './endpoints/get-lead-custom-field-value.custom-endpoint';
import { getLeadAttachmentsEndpoint } from './endpoints/get-lead-attachments.endpoint';

const BASE_URL_COMPILER: (domain?: string) => string =
  environment.getAmoBaseUrl;

@Injectable()
export class AmoApiService extends ApiService {
  constructor(http: HttpClient, private store: Store) {
    super(http);

    this.setHeaders({ 'Content-Type': 'application/json' });

    this.store.select(accessTokenSelector).subscribe((token) => {
      this.setHeaders({ Authorization: `Bearer ${token}` });
    });

    this.store.select(domainSelector).subscribe((domain) => {
      this.baseUrl = BASE_URL_COMPILER(domain);
    });
  }

  public getCompaniesCustomFieldsAll = getCompaniesCustomFieldsAllEndpoint;
  public getLeadsCustomFieldsAll = getLeadsCustomFieldsAllEndpoint;
  public patchLeadCustomFieldValue = patchLeadCustomFieldValueCustomEndpoint;
  public getLeadCustomFieldValue = getLeadCustomFieldValueCustomEndpoint;
  public getLeadAttachments = getLeadAttachmentsEndpoint;
}
