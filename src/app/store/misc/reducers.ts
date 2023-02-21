import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  setNewPacketTitleAction,
  resetNewPacketTitleAction,
  setShareLinkAction,
} from './actions';

export const miscReducer = createReducer(
  initialState,
  on(setNewPacketTitleAction, (state, { title }) => ({
    ...state,
    packetTitle: title,
  })),
  on(resetNewPacketTitleAction, (state) => ({
    ...state,
    packetTitle: '',
  })),
  on(setShareLinkAction, (state, { link }) => ({
    ...state,
    shareLink: link,
  }))
);
