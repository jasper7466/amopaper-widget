import { crmLeadKey, ICrmLeadState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<ICrmLeadState>(crmLeadKey);

export const leadNameSelector = createSelector(
  featureSelector,
  (state) => state.name
);
