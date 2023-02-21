import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { MISC_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { IShareLink } from 'src/app/interfaces/share-link.interface';

export const setNewPacketTitleAction = createAction(
  `[${MISC_KEY}] set packet title`,
  props<Pick<IPacketDetails, 'title'>>()
);

export const resetNewPacketTitleAction = createAction(
  `[${MISC_KEY}] reset packet title`
);

export const setShareLinkAction = createAction(
  `[${MISC_KEY}] set share link`,
  props<IShareLink>()
);

export const setNewPacketIdAction = createAction(
  `[${MISC_KEY}] set just created packet id`,
  props<Pick<IPacketDetails, 'id'>>()
);
