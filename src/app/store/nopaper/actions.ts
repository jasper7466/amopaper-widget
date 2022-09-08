import { createAction, props } from '@ngrx/store';

export const setPacketIdAction = createAction(
  '[NOPAPER] set packed id',
  props<{ packetId: number }>()
);

export const resetPacketIdAction = createAction('[NOPAPER] reset packed id');
