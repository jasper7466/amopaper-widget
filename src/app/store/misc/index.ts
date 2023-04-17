export const miscKey = 'misc';

export interface IMiscState {
    packetTitle: string;
    shareLink: string;
    justCreatedPacketId: number;
}

export const initialState: IMiscState = {
    packetTitle: '',
    shareLink: '',
    justCreatedPacketId: -1,
};
