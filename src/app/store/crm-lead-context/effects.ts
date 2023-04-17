import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { updateLeadJsonStorageAction } from './actions';
import { updatePacketsIdsListAction } from '../packets/actions';

@Injectable()
export class CrmLeadContextEffects {
    constructor(private _actions$: Actions) {}

    private _onUpdateLeadJsonStorageEffect$ = createEffect(() =>
        this._actions$.pipe(
            ofType(updateLeadJsonStorageAction),
            map((storage) =>
                updatePacketsIdsListAction({ payload: storage.packetsIdsList })
            )
        )
    );
}
