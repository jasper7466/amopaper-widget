import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { updateCrmContextAction } from './actions';
import { setAppActiveLeadIdAction } from '../app-context/actions';

@Injectable()
export class CrmContextEffects {
  constructor(private _actions$: Actions) {}

  private _onUpdateCrmContextEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateCrmContextAction),
      map((context) => setAppActiveLeadIdAction({ leadId: context.cardId }))
    )
  );
}
