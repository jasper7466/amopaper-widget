import { setIdentifiersAction, setOriginalsFilesAction } from './actions';
import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';

export const processedFilesReducer = createReducer(
  initialState,
  on(setIdentifiersAction, (state, payload) => ({
    ...state,
    identifiers: payload,
  })),
  on(setOriginalsFilesAction, (state, { payload }) => ({
    ...state,
    originalFiles: payload,
  }))
);
