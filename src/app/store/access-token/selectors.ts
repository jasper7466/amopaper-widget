import { ITokenState, TOKEN_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<ITokenState>(TOKEN_KEY);

export const accessTokenSelector = createSelector(
  featureSelector,
  (state) => state.token
);
