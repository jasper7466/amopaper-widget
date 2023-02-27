import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { updateLeadJsonStorageAction, updateLeadNameAction } from './actions';

export const crmLeadReducer = createReducer(
  initialState,
  on(updateLeadNameAction, (state, { name }) => ({
    ...state,
    name: name,
  })),
  on(updateLeadJsonStorageAction, (state, payload) => ({
    ...state,
    jsonStorage: payload,
  }))
);
