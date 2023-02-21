import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { WithOptional } from 'src/app/types/common';

export const PACKETS_KEY = 'packets';

type TPacket = WithOptional<IPacketDetails, 'status' | 'createTimeUtc'>;
export interface IPacketsState {
  packets: TPacket[];
  isPacketsIdsTouched: boolean;
}

export const initialPacketState: TPacket = {
  id: -1,
  title: 'Без названия',
  createTimeUtc: undefined,
  status: undefined,
};

export const initialState: IPacketsState = {
  packets: [],
  isPacketsIdsTouched: false,
};
