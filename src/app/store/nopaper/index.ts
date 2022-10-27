import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

export const NOPAPER_KEY = 'nopaper';

export interface INopaperState {
  packetsIds: number[];
  stepName: StepName | null;
}

export const initialState: INopaperState = {
  packetsIds: [],
  stepName: null,
};
