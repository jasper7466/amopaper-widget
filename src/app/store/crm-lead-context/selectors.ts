import { CRM_LEAD_KEY, ICrmLeadState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ICrmLeadState>(CRM_LEAD_KEY);

export const leadNameSelector = createSelector(
  featureSelector,
  (state) => state.name
);
