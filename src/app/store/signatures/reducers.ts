import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { setFilesIdentifiersAction, setFileSignatureAction } from './actions';

export const signaturesReducer = createReducer(
  initialState,
  on(setFilesIdentifiersAction, (state, payload) => {
    return {
      ...state,
      identifiers: payload,
    };
  }),
  on(setFileSignatureAction, (state, payload) => {
    return {
      ...state,
      signature: payload,
    };
  })
);
