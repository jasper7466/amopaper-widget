import { ITokenState, tokenKey } from './index';
import { createAction, props } from '@ngrx/store';

export const updateAccessTokenAction = createAction(
    `[${tokenKey}] update action`,
    props<ITokenState>()
);
