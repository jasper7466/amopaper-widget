import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { setSignaturesAction, clearSignaturesAction } from './actions';

export const signaturesReducer = createReducer(
  initialState,
  on(clearSignaturesAction, (state) => ({ ...state })),
  on(setSignaturesAction, (state, payload) => ({
    ...state,
    signatures: payload,
  }))
);
