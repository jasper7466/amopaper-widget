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

export const setPacketDetailsAction = createAction(
  '[PACKETS_LIST] set packet info',
  props<{ packetId: number; title: string; creationDate: string }>()
);
