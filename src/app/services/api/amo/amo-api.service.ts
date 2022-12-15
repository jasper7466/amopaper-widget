import { ServicesCoreModule } from './../../services-core.module';
import { domainSelector } from './../../../store/crm-context/selectors';
import {
  GetCustomFieldsResponse,
  customField,
  PatchLeadRequestBody,
  IPatchLeadResponse,
  GetLeadByIdResponse,
} from './amo-api.types';
import { map, Observable, expand, EMPTY, reduce } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { accessTokenSelector } from 'src/app/store/access-token/selectors';
import { environment } from 'src/environments/environment';

@Injectable()
export class AmoApiService {
  private headers: HttpHeaders;
  private baseURL: string;

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(accessTokenSelector).subscribe((token) => {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    });
    this.store.select(domainSelector).subscribe((domain) => {
      this.baseURL = environment.getAmoBaseUrl(domain!);
    });
  }

  private get$<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${path}`, {
      headers: this.headers,
    });
  }

  private patch$<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });
  }

  get getCompaniesCustomFieldsAll$(): Observable<customField[]> {
    return this.get$<GetCustomFieldsResponse>('/companies/custom_fields').pipe(
      expand((response) =>
        response._links.next
          ? // TODO: для работы через прокси в режиме разработки
            // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
            this.get$<GetCustomFieldsResponse>(
              `/companies/custom_fields?page=${++response._page}`
            )
          : EMPTY
      ),
      map((response) => response._embedded.custom_fields),
      reduce((acc, current) => acc.concat(current))
    );
  }

  get getLeadsCustomFieldsAll$(): Observable<customField[]> {
    return this.get$<GetCustomFieldsResponse>('/leads/custom_fields').pipe(
      expand((response) =>
        response._links.next
          ? // TODO: для работы через прокси в режиме разработки
            // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
            this.get$<GetCustomFieldsResponse>(
              `/companies/custom_fields?page=${++response._page}`
            )
          : EMPTY
      ),
      map((response) => response._embedded.custom_fields),
      reduce((acc, current) => acc.concat(current))
    );
  }

  patchLeadById(id: number, data: Partial<PatchLeadRequestBody>) {
    return this.patch$<IPatchLeadResponse>(`/leads/${id}`, data);
  }

  getLeadById$(id: number): Observable<GetLeadByIdResponse> {
    return this.get$(`/leads/${id}`);
  }
}
