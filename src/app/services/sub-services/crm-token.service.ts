import { Injectable } from '@angular/core';
import { AccessTokenApiService } from '../api/access-token-api/access-token-api.service';
import { Observable, tap, switchMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateAccessTokenAction } from 'src/app/store/access-token/actions';

@Injectable()
export class CrmTokenService {
    constructor(
        private _store$: Store,
        private _accessTokenApiService: AccessTokenApiService
    ) {}

    /**
   * Получает токен доступа для amoCRM.
   *
   * Результат сохраняется в хранилище.
   * @returns
   */
    public getAmoAccessToken$(): Observable<void> {
        return this._accessTokenApiService.getAmoAccessToken$().pipe(
            tap(({ accessToken }) =>
                this._store$.dispatch(updateAccessTokenAction({ token: accessToken }))
            ),
            switchMap(() => of(void 0))
        );
    }
}
