import { IPacket, PacketStatus, PACKETS_KEY, IPacketsState } from './index';
import { createAction, props } from '@ngrx/store';

export interface IPacketIdsProps extends Pick<IPacketsState, 'packetsIds'> {}
export interface IPacketDetailsProps extends Omit<IPacket, 'status'> {
  packetId: number;
}
export interface IPacketStatusProps extends Pick<IPacket, 'status'> {
  packetId: number;
}

export const setPacketsIdsAction = createAction(
  `[${PACKETS_KEY}] update packets ids`,
  props<IPacketIdsProps>()
);

export const setPacketStatusAction = createAction(
  `[${PACKETS_KEY}] update packet step`,
  props<IPacketStatusProps>()
);

export const setPacketDetailsAction = createAction(
  `[${PACKETS_KEY}] set packet info`,
  props<IPacketDetailsProps>()
);
