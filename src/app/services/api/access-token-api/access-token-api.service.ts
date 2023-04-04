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
  private _xApiKey$ = this._store.select(xApiKeySelector);
  private _clientUuid$ = this._store.select(clientUuidSelector);
  private _clientUuid?: string;

  constructor(_http: HttpClient, private _store: Store) {
    super(_http);

    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });

    this._xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });

    this._clientUuid$.subscribe((uuid) => {
      this._clientUuid = uuid;
    });
  }

  public getAmoAccessToken(): Observable<IGetAmoAccessTokenResponse> {
    return this.get<IGetAmoAccessTokenResponse>(
      `/amo-crm/authorization/${this._clientUuid}/access-token`
    );
  }
}
