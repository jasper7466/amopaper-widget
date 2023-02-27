import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { PACKETS_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';

export const updatePacketsIdsListAction = createAction(
  `[${PACKETS_KEY}] update by identifiers list`,
  props<{ payload: ICrmLeadJsonStorage['packetsIdsList'] }>()
);

export const setPacketStatusAction = createAction(
  `[${PACKETS_KEY}] update status`,
  props<Pick<IPacketDetails, 'id' | 'status'>>()
);

export const setPacketDetailsAction = createAction(
  `[${PACKETS_KEY}] set packet info`,
  props<Pick<IPacketDetails, 'id' | 'title' | 'createTimeUtc'>>()
);
