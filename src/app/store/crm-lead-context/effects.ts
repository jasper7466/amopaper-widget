import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { updateLeadJsonStorageAction } from './actions';
import { updatePacketsIdsListAction } from '../packets/actions';

@Injectable()
export class CrmLeadContextEffects {
  constructor(private actions$: Actions) {}

  private onUpdateLeadJsonStorageEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLeadJsonStorageAction),
      map((storage) =>
        updatePacketsIdsListAction({ payload: storage.packetsIdsList })
      )
    )
  );
}
