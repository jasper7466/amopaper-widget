import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  setNewPacketTitleAction,
  resetNewPacketTitleAction,
  setShareLinkAction,
} from './actions';

export const miscReducer = createReducer(
  initialState,
  on(setNewPacketTitleAction, (state, { packetTitle }) => ({
    ...state,
    packetTitle,
  })),
  on(resetNewPacketTitleAction, (state) => ({
    ...state,
    packetTitle: '',
  })),
  on(setShareLinkAction, (state, { shareLink }) => ({
    ...state,
    shareLink,
  }))
);
