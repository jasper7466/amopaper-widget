import { Injectable } from '@angular/core';
import { AccessTokenApiService } from '../api/access-token-api/access-token-api.service';
import { Observable, tap, switchMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateAccessTokenAction } from 'src/app/store/access-token/actions';

@Injectable()
export class CrmTokenService {
  constructor(
    private store: Store,
    private accessTokenApiService: AccessTokenApiService
  ) {}

  /**
   * Получает токен доступа для amoCRM.
   *
   * Результат сохраняется в хранилище.
   * @returns
   */
  public getAmoAccessToken(): Observable<void> {
    return this.accessTokenApiService.getAmoAccessToken().pipe(
      tap(({ accessToken }) =>
        this.store.dispatch(updateAccessTokenAction({ token: accessToken }))
      ),
      switchMap(() => of(void 0))
    );
  }
}
