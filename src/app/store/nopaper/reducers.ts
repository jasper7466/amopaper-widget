import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { resetPacketIdAction, setPacketIdAction } from './actions';

export const nopaperReducer = createReducer(
  initialState,
  on(setPacketIdAction, (state, { packetId }) => ({
    ...state,
    packetId,
  })),
  on(resetPacketIdAction, (state) => ({ ...state, packetId: undefined }))
);
