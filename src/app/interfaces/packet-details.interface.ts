import { TPacketStatus } from './packet-status.type';

export interface IPacketDetails {
  id: number;
  title: string;
  createTimeUtc: string;
  status: TPacketStatus;
}
