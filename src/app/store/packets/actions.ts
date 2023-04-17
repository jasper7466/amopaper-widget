import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { packetsKey } from './index';
import { createAction, props } from '@ngrx/store';
import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';

export const updatePacketsIdsListAction = createAction(
    `[${packetsKey}] update by identifiers list`,
    props<{ payload: ICrmLeadJsonStorage['packetsIdsList'] }>()
);

export const setPacketStatusAction = createAction(
    `[${packetsKey}] update status`,
    props<Pick<IPacketDetails, 'id' | 'status'>>()
);

export const setPacketDetailsAction = createAction(
    `[${packetsKey}] set packet info`,
    props<Pick<IPacketDetails, 'id' | 'title' | 'createTimeUtc'>>()
);
