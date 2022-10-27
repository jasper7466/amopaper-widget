import { Nullable } from 'src/app/types/common';

export const TOKEN_KEY = 'token';

export interface ITokenState {
  token: Nullable<string>;
}

export const initialState: ITokenState = {
  token: null,
};
