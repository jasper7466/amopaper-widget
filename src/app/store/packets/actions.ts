import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { PACKETS_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export const addPacketsByIdsAction = createAction(
  `[${PACKETS_KEY}] add by identifiers`,
  props<{ payload: Pick<IPacketDetails, 'id'>[] }>()
);

export const setPacketStatusAction = createAction(
  `[${PACKETS_KEY}] update status`,
  props<Pick<IPacketDetails, 'id' | 'status'>>()
);

export const setPacketDetailsAction = createAction(
  `[${PACKETS_KEY}] set packet info`,
  props<Pick<IPacketDetails, 'id' | 'title' | 'createTimeUtc'>>()
);
