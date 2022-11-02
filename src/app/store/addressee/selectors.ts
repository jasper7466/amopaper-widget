import { IAddresseeState, WIDGET_CONTEXT_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAddresseeState>(WIDGET_CONTEXT_KEY);

export const isAddresseeAddedSelector = createSelector(
  featureSelector,
  (state) => state.type !== null
);

export const addresseePhoneSelector = createSelector(
  featureSelector,
  (state) => state.phone
);

export const addresseeSelector = createSelector(featureSelector, (state) => ({
  ...state,
}));
