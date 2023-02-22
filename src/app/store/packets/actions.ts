import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { PACKETS_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { TLeadPacketsIdsList } from 'src/app/interfaces/lead-packets-ids.type';

export const updatePacketsByIdsListAction = createAction(
  `[${PACKETS_KEY}] update by identifiers list`,
  props<{ payload: TLeadPacketsIdsList }>()
);

export const setPacketStatusAction = createAction(
  `[${PACKETS_KEY}] update status`,
  props<Pick<IPacketDetails, 'id' | 'status'>>()
);

export const setPacketDetailsAction = createAction(
  `[${PACKETS_KEY}] set packet info`,
  props<Pick<IPacketDetails, 'id' | 'title' | 'createTimeUtc'>>()
);
