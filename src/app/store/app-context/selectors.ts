import { APP_CONTEXT_KEY, IAppContextState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAppContextState>(APP_CONTEXT_KEY);

export const activeLeadIdSelector = createSelector(
  featureSelector,
  (state) => state.activeLeadId
);
