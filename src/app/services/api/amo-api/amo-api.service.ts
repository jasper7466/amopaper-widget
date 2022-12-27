import { domainSelector } from '../../../store/crm-context/selectors';
import {
  IGetCustomFieldsResponse,
  ICustomField,
  IPatchLeadRequest,
  IPatchLeadResponse,
  IGetLeadByIdResponse,
  NoteType,
  IGetLeadAttachmentsResponse,
} from './amo-api.types';
import { map, Observable, expand, EMPTY, reduce, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { accessTokenSelector } from 'src/app/store/access-token/selectors';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

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

  public getCompaniesCustomFieldsAll(): Observable<ICustomField[]> {
    return this.get<IGetCustomFieldsResponse>('/companies/custom_fields').pipe(
      expand((response) =>
        response._links.next
          ? // TODO: для работы через прокси в режиме разработки
            // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
            this.get<IGetCustomFieldsResponse>(
              `/companies/custom_fields?page=${++response._page}`
            )
          : EMPTY
      ),
      map((response) => response._embedded.custom_fields),
      reduce((acc, current) => acc.concat(current))
    );
  }

  public getLeadsCustomFieldsAll(): Observable<ICustomField[]> {
    return this.get<IGetCustomFieldsResponse>('/leads/custom_fields').pipe(
      expand((response) =>
        response._links.next
          ? // TODO: для работы через прокси в режиме разработки
            // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
            this.get<IGetCustomFieldsResponse>(
              `/companies/custom_fields?page=${++response._page}`
            )
          : EMPTY
      ),
      map((response) => response._embedded.custom_fields),
      reduce((acc, current) => acc.concat(current))
    );
  }

  public patchLeadById(
    id: number,
    data: Partial<IPatchLeadRequest>
  ): Observable<IPatchLeadResponse> {
    return this.patch<Partial<IPatchLeadRequest>, IPatchLeadResponse>(
      `/leads/${id}`,
      data
    );
  }

  public getLeadById(id: number): Observable<IGetLeadByIdResponse> {
    return this.get(`/leads/${id}`);
  }

  public getLeadAttachments(leadId: number) {
    const noteType: NoteType = 'attachment';
    return this.get<IGetLeadAttachmentsResponse>(
      `/leads/${leadId}/notes?filter[note_type][0]=${noteType}`
    ).pipe(
      expand((response) =>
        response._links.next
          ? // TODO: для работы через прокси в режиме разработки
            // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
            this.get<IGetLeadAttachmentsResponse>(
              `/companies/custom_fields?page=${++response._page}`
            )
          : EMPTY
      )
    );
  }
}
