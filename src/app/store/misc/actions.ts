import { createAction, props } from '@ngrx/store';

export const setPacketTitleAction = createAction(
  '[MISC] set packet caption',
  props<{ packetCaption: string }>()
);
