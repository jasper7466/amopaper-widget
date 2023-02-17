import { MISC_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export interface INewPacketIdProps {
  packetId: number;
}

export interface IShareLinkProps {
  shareLink: string;
}

export const setNewPacketTitleAction = createAction(
  `[${MISC_KEY}] set packet title`,
  props<{ packetTitle: string }>()
);

export const resetNewPacketTitleAction = createAction(
  `[${MISC_KEY}] reset packet title`
);

export const setShareLinkAction = createAction(
  `[${MISC_KEY}] set share link`,
  props<IShareLinkProps>()
);

export const setNewPacketIdAction = createAction(
  `[${MISC_KEY}] set just created packet id`,
  props<INewPacketIdProps>()
);
