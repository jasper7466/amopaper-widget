import { TLeadPacketsIdsList } from 'src/app/interfaces/lead-packets-ids.type';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { WithOptional } from 'src/app/types/common';

export const PACKETS_KEY = 'packets';
export interface IPacketsState {
  ids: TLeadPacketsIdsList;
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
