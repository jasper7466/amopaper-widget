import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { updateAccessTokenAction } from './actions';

export const accessTokenReducer = createReducer(
  initialState,
  on(updateAccessTokenAction, (state, { token }) => ({
    ...state,
    token,
  }))
);
