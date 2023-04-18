import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IGetAmoAccessTokenResponse } from './access-token-local-api.types';
import { Observable } from 'rxjs';

const baseUrl = environment.localBaseTokenUrl;

@Injectable()
export class AccessTokenLocalApiService extends ApiService {
    private _xApiKey$ = this._store$.select(xApiKeySelector);
    private _xApiKey: string;

    constructor(http: HttpClient, private _store$: Store) {
        super(http);

        this.baseUrl = baseUrl;
        this.setHeaders({ 'Content-Type': 'application/json' });
        this._xApiKey$.subscribe((key) => {
            if (key) {
                this._xApiKey = key;
            }
        });
    }

    public getAmoAccessToken$(): Observable<IGetAmoAccessTokenResponse> {
        return this.post$<{ xApiKey: string }, IGetAmoAccessTokenResponse>(
            '/access_token',
            { xApiKey: this._xApiKey },
        );
    }
}
