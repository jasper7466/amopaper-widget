import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { setNewPacketTitleAction } from './actions';

export const miscReducer = createReducer(
  initialState,
  on(setNewPacketTitleAction, (state, { packetTitle }) => ({
    ...state,
    packetTitle,
  }))
);
