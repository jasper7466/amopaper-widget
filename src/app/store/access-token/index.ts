export const tokenKey = 'token';

export interface ITokenState {
    token: string | null;
}

export const initialState: ITokenState = {
    token: null,
};
