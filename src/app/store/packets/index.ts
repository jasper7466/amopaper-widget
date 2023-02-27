import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

export const PACKETS_KEY = 'packets';
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
