export const MISC_KEY = 'misc';

export interface IMiscState {
  packetTitle: string;
  shareLink: string;
}

export const initialState: IMiscState = {
  packetTitle: '',
  shareLink: '',
};
