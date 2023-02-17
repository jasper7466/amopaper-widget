export const PACKETS_KEY = 'packets';

export type PacketStatus =
  | 'new'
  | 'nopaperPrepareFiles'
  | 'nopaperPreview'
  | 'nopaperPreviewBeforeOferta'
  | 'nopaperOfertaSenderPreview'
  | 'nopaperSenderSign'
  | 'nopaperReceiverPreview'
  | 'nopaperReceiverPreviewBeforeOferta'
  | 'nopaperOfertaReceiverPreview'
  | 'nopaperReceiverSigning'
  | 'nopaperEnd'
  | 'nopaperEndRead'
  | 'nopaperError'
  | 'nopaperErrorEnd'
  | 'nopaperDelete'
  | 'nopaperSenderCancel'
  | 'nopaperSenderCancelEnd'
  | 'nopaperSignRefused'
  | 'nopaperSignRefusedEnd'
  | 'nopaperSignRefusedRead';

export interface IPacket {
  title: string;
  creationDate: string | null;
  status: PacketStatus | null;
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
  status: null,
};

export const initialState: IPacketsState = {
  packetsIds: [],
  packets: {},
  isPacketsIdsTouched: false,
};
