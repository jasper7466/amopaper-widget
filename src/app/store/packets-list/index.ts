import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

export const PACKETS_KEY = 'packets';

export interface IPacket {
  stepName: StepName | null;
}

export type Packets = { [key: number]: IPacket };

export interface IPacketsState {
  packetsIds: number[];
  packets: Packets;
  isPacketsIdsTouched: boolean;
}

export const initialPacketState: IPacket = {
  stepName: null,
};

export const initialState: IPacketsState = {
  packetsIds: [],
  packets: {},
  isPacketsIdsTouched: false,
};
