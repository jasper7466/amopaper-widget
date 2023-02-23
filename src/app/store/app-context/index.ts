export const APP_CONTEXT_KEY = 'app-context';

interface IAppContext {
  isInitialized: boolean;
  activePacketId: number;
}

export const initialState: IAppContext = {
  isInitialized: false,
  activePacketId: -1,
};
