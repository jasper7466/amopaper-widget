import { ITokenState } from './index';
import { createAction, props } from '@ngrx/store';

export const updateAccessTokenAction = createAction(
  '[ACCESS_TOKEN] update',
  props<ITokenState>()
);
