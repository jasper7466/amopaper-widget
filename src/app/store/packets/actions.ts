import { createAction, props } from '@ngrx/store';
import { StepName } from 'src/app/services/api/nopaper-api/nopaper-api.types';

export const setPacketsIdsAction = createAction(
  '[PACKETS] update packets ids',
  props<{ packetsIds: number[] }>()
);

export const setPacketStepAction = createAction(
  '[PACKETS] update packet step',
  props<{ packetId: number; stepName: StepName }>()
);

export const setPacketDetailsAction = createAction(
  '[PACKETS] set packet info',
  props<{ packetId: number; title: string; creationDate: string }>()
);
