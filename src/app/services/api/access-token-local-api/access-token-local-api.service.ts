import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IGetAmoAccessTokenResponse } from './access-token-local-api.types';
import { Observable } from 'rxjs';

const BASE_URL = environment.localBaseTokenUrl;

@Injectable()
export class AccessTokenLocalApiService extends ApiService {
  private xApiKey$ = this.store.select(xApiKeySelector);
  private xApiKey: string;

  constructor(http: HttpClient, private store: Store) {
    super(http);

    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });
    this.xApiKey$.subscribe((key) => {
      if (key) {
        this.xApiKey = key;
      }
    });
  }

  public getAmoAccessToken(): Observable<IGetAmoAccessTokenResponse> {
    return this.post<{ x_api_key: string }, IGetAmoAccessTokenResponse>(
      '/access_token',
      { x_api_key: this.xApiKey }
    );
  }
}
