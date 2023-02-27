import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { appLoadAction, setAppInitAction } from './actions';
import { CommonLogicService } from 'src/app/services/common-logic.service';

@Injectable()
export class AppContextEffects {
  constructor(
    private actions$: Actions,
    private commonLogic: CommonLogicService
  ) {}

  private onAppLoadEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(appLoadAction),
      map(() => this.commonLogic.init()),
      map(() => setAppInitAction())
    )
  );
}
