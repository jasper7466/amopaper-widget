export const TOKEN_KEY = 'token';

export interface ITokenState {
  token: string | null;
}

export const initialState: ITokenState = {
  token: null,
};
