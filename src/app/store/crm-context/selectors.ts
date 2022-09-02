import { ICrmContextState, CONTEXT_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ICrmContextState>(CONTEXT_KEY);

export const xApiKeySelector = createSelector(
  featureSelector,
  (state) => state.context?.settings.x_api_key
);

export const domainSelector = createSelector(
  featureSelector,
  (state) => state.context?.system.domain
);

export const subdomainSelector = createSelector(
  featureSelector,
  (state) => state.context?.system.subdomain
);
