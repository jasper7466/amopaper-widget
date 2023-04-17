import { appContextKey, IAppContextState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAppContextState>(appContextKey);

export const activeLeadIdSelector = createSelector(
    featureSelector,
    (state) => state.activeLeadId
);
