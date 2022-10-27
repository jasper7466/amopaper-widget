import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

export const PACKETS_KEY = 'packets';

export type Packet = {
  stepName: StepName | null;
};

export type Packets = { [key: number]: Packet };

export interface IPacketsState {
  packetsIds: number[];
  packets: Packets;
}

export const initialPacketState: Packet = {
  stepName: null,
};

export const initialState: IPacketsState = {
  packetsIds: [],
  packets: {},
};
