import { MISC_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export const setNewPacketTitleAction = createAction(
  `[${MISC_KEY}] set packet title`,
  props<{ packetTitle: string }>()
);

export const resetNewPacketTitleAction = createAction(
  `[${MISC_KEY}] reset packet title`
);
