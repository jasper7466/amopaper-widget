import { createAction, props } from '@ngrx/store';
import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

export const setPacketsIdsAction = createAction(
  '[PACKETS_LIST] update packets ids',
  props<{ packetsIds: number[] }>()
);

export const setPacketStepAction = createAction(
  '[PACKETS_LIST] update packet step',
  props<{ packetId: number; stepName: StepName }>()
);
