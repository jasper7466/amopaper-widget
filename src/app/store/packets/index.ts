import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

export const packetsKey = 'packets';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface IPacketsState {
  ids: ICrmLeadJsonStorage['packetsIdsList'];
  packets: IPacketDetails[];
  isPacketsIdsTouched: boolean;
}

export const initialPacketState: Omit<IPacketDetails, 'id'> = {
  title: 'Без названия',
  createTimeUtc: undefined,
  status: undefined,
};

export const initialState: IPacketsState = {
  ids: [],
  packets: [],
  isPacketsIdsTouched: false,
};
