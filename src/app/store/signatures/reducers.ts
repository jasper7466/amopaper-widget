import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  setFilesAction,
  setFilesIdentifiersAction,
  setFileSignatureAction,
} from './actions';

export const signaturesReducer = createReducer(
  initialState,
  on(setFilesIdentifiersAction, (state, payload) => {
    console.log('DISPATCHED: setFilesIdentifiersAction');
    return {
      ...state,
      identifiers: payload,
    };
  }),
  on(setFilesAction, (state, { payload }) => {
    console.log('DISPATCHED: setFilesAction', payload);
    return {
      ...state,
      files: payload,
    };
  }),
  on(setFileSignatureAction, (state, payload) => {
    console.log('DISPATCHED: setFileSignatureAction');
    return {
      ...state,
      signature: payload,
    };
  })
);
