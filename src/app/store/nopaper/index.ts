import { Observable, Subscription } from 'rxjs';

export const NOPAPER_KEY = 'nopaper';

export interface INopaperState {
  packetId: number | undefined;
}

export const initialState: INopaperState = {
  packetId: undefined,
};
