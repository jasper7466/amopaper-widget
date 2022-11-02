import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { setPacketTitleAction } from './actions';

export const miscReducer = createReducer(
  initialState,
  on(setPacketTitleAction, (state, { packetCaption }) => ({
    ...state,
    packetTitle: packetCaption,
  }))
);
