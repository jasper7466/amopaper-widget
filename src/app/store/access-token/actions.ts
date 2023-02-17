import { ITokenState, TOKEN_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export const updateAccessTokenAction = createAction(
  `[${TOKEN_KEY}] update action`,
  props<ITokenState>()
);
