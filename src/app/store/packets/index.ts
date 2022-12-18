import { StepName } from 'src/app/services/api/nopaper-api/nopaper-api.types';

export const PACKETS_KEY = 'packets';

export interface IPacket {
  title: string;
  creationDate: string | null;
  stepName: StepName | null;
}

export type Packets = { [key: number]: IPacket };

export interface IPacketsState {
  packetsIds: number[];
  packets: Packets;
  isPacketsIdsTouched: boolean;
}

export const initialPacketState: IPacket = {
  title: 'Без названия',
  creationDate: null,
  stepName: null,
};

export const initialState: IPacketsState = {
  packetsIds: [],
  packets: {},
  isPacketsIdsTouched: false,
};
