import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  setRawFilesAction,
  setFilesIdentifiersAction,
  setFileSignatureAction,
  setDecodedFilesAction,
  clearFilesAction,
} from './actions';

export const signaturesReducer = createReducer(
  initialState,
  on(setFilesIdentifiersAction, (state, payload) => {
    console.log('DISPATCHED: setFilesIdentifiersAction', payload);
    return {
      ...state,
      identifiers: payload,
    };
  }),
  on(setRawFilesAction, (state, { payload }) => {
    console.log('DISPATCHED: setRawFilesAction', payload);
    return {
      ...state,
      rawFiles: payload,
    };
  }),
  on(setDecodedFilesAction, (state, { payload }) => {
    console.log('DISPATCHED: setDecodedFilesAction', payload);
    return {
      ...state,
      decodedFiles: payload,
    };
  }),
  on(clearFilesAction, (state) => {
    console.log('DISPATCHED: clearFilesAction');
    return {
      ...state,
      identifiers: initialState.identifiers,
      rawFiles: initialState.rawFiles,
      decodedFiles: initialState.decodedFiles,
    };
  }),
  on(setFileSignatureAction, (state, payload) => {
    console.log('DISPATCHED: setFileSignatureAction', payload);
    return {
      ...state,
      signature: payload,
    };
  })
);
