import { IAddresseeState, WIDGET_CONTEXT_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAddresseeState>(WIDGET_CONTEXT_KEY);

export const addresseeSelector = createSelector(featureSelector, (state) => ({
  ...state,
}));

export const isAddresseeAddedSelector = createSelector(
  featureSelector,
  (state) => state.type !== null
);

export const addresseeTypeSelector = createSelector(
  featureSelector,
  (state) => state.type
);

export const addresseeNameSelector = createSelector(
  featureSelector,
  (state) => state.name
);

export const addresseePhoneSelector = createSelector(
  featureSelector,
  (state) => state.phone
);

export const addresseeVatIdSelector = createSelector(
  featureSelector,
  (state) => state.vatId
);
