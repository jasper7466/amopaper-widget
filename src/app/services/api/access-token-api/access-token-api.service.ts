import { Observable } from 'rxjs';
import {
  clientUuidSelector,
  xApiKeySelector,
} from './../../../store/crm-context/selectors';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { IGetAmoAccessTokenResponse } from './access-token-api.types';
import { Store } from '@ngrx/store';

const BASE_URL = environment.nopaperBaseTokenUrl;

@Injectable()
export class AccessTokenApiService extends ApiService {
  private xApiKey$ = this.store.select(xApiKeySelector);
  private clientUuid$ = this.store.select(clientUuidSelector);

  private xApiKey: string = '';
  private clientUuid?: string;

  constructor(http: HttpClient, private store: Store) {
    super(http);

    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });

    this.xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });

    this.clientUuid$.subscribe((uuid) => {
      this.clientUuid = uuid;
    });
  }

  public getAmoAccessToken(): Observable<IGetAmoAccessTokenResponse> {
    return this.get<IGetAmoAccessTokenResponse>(
      `/amo-crm/authorization/access-token/${this.clientUuid}`
    );
  }

  // Для для отладки с локальным сервером авторизации
  public getAmoAccessTokenLocally(): Observable<IGetAmoAccessTokenResponse> {
    return this.post<{ x_api_key: string }, IGetAmoAccessTokenResponse>(
      'http://localhost:5200/access_token',
      { x_api_key: this.xApiKey }
    );
  }
}
