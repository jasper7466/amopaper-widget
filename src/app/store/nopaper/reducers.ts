import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  resetPacketIdAction,
  resetStepNameAction,
  // setPacketsIdsAction,
  setStepNameAction,
} from './actions';

export const nopaperReducer = createReducer(
  initialState,
  // on(setPacketsIdsAction, (state, { packetsIds }) => ({
  //   ...state,
  //   packetsIds,
  // })),
  on(resetPacketIdAction, (state) => ({
    ...state,
    packetId: initialState.packetsIds,
  })),
  on(setStepNameAction, (state, { stepName }) => ({ ...state, stepName })),

  on(resetStepNameAction, (state) => ({
    ...state,
    stepName: initialState.stepName,
  }))
);
