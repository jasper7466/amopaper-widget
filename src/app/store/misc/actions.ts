import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { miscKey } from './index';
import { createAction, props } from '@ngrx/store';
import { IShareLink } from 'src/app/interfaces/share-link.interface';

export const setNewPacketTitleAction = createAction(
  `[${miscKey}] set packet title`,
  props<Pick<IPacketDetails, 'title'>>()
);

export const resetNewPacketTitleAction = createAction(
  `[${miscKey}] reset packet title`
);

export const setShareLinkAction = createAction(
  `[${miscKey}] set share link`,
  props<IShareLink>()
);

export const setNewPacketIdAction = createAction(
  `[${miscKey}] set just created packet id`,
  props<Pick<IPacketDetails, 'id'>>()
);
