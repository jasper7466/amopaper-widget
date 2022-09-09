import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  resetPacketIdAction,
  resetStepNameAction,
  setPacketIdAction,
  setStepNameAction,
} from './actions';

export const nopaperReducer = createReducer(
  initialState,
  on(setPacketIdAction, (state, { packetId }) => ({
    ...state,
    packetId,
  })),
  on(resetPacketIdAction, (state) => ({
    ...state,
    packetId: initialState.packetId,
  })),
  on(setStepNameAction, (state, { stepName }) => ({ ...state, stepName })),

  on(resetStepNameAction, (state) => ({
    ...state,
    stepName: initialState.stepName,
  }))
);
