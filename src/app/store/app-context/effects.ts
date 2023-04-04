import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { appLoadAction, setAppInitAction } from './actions';
import { CommonLogicService } from 'src/app/services/common-logic.service';

@Injectable()
export class AppContextEffects {
  constructor(
    private _actions$: Actions,
    private _commonLogic: CommonLogicService
  ) {}

  private _onAppLoadEffect = createEffect(() =>
    this._actions$.pipe(
      ofType(appLoadAction),
      map(() => this._commonLogic.init()),
      map(() => setAppInitAction())
    )
  );
}
