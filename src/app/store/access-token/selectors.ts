import { ITokenState, tokenKey } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<ITokenState>(tokenKey);

export const accessTokenSelector = createSelector(
    featureSelector,
    (state) => state.token,
);
