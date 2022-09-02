import { CheckByPhoneResponse, CheckByPhoneRequest } from './nopaper-api.types';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  subdomainSelector,
  xApiKeySelector,
} from 'src/app/store/crm-context/selectors';

const SCHEME = 'https://';
const BASE_URL = 'nopaper-demo.abanking.ru/lk-api/external/api';

@Injectable({
  providedIn: 'root',
})
export class NopaperApiService {
  private headers: HttpHeaders;
  readonly baseURL: string = `${SCHEME}${BASE_URL}`;

  // TODO: только для отладки с локальным сервером авторизации
  private xApiKey?: string;
  private subdomain?: string;
  //

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(xApiKeySelector).subscribe((xApiKey) => {
      this.xApiKey = xApiKey;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': `${xApiKey}`,
      });
    });
    this.store
      .select(subdomainSelector)
      .subscribe((subdomain) => (this.subdomain = subdomain));
  }

  private post$<Request, Response>(
    path: string,
    body: Request
  ): Observable<Response> {
    return this.http.post<Response>(`${this.baseURL}${path}`, body, {
      headers: this.headers,
    });
  }

  // TODO: только для отладки с локальным сервером авторизации
  getAmoToken$(): Observable<string> {
    return this.http
      .post<{ access_token: string }>('http://localhost:5200/access_token', {
        x_api_key: this.xApiKey,
        subdomain: this.subdomain,
      })
      .pipe(map((response) => response.access_token));
  }

  checkByPhone(phone: string): Observable<CheckByPhoneResponse> {
    return this.post$<CheckByPhoneRequest, CheckByPhoneResponse>(
      `/profile/fl/check-by-phone-v2`,
      { phonenumber: phone }
    );
  }
}
