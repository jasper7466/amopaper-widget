import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

export const NOPAPER_KEY = 'nopaper';

export interface INopaperState {
  packetId: number | null;
  stepName: StepName | null;
}

export const initialState: INopaperState = {
  packetId: null,
  stepName: null,
};
