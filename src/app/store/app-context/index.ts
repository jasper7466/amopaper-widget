export const appContextKey = 'app-context';

export interface IAppContextState {
  isInitialized: boolean;
  activePacketId: number;
  activeLeadId: number;
}

export const initialState: IAppContextState = {
  isInitialized: false,
  activePacketId: -1,
  activeLeadId: -1,
};
