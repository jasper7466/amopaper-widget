import { IAddresseeState, addresseeKey } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAddresseeState>(addresseeKey);

export const addresseeSelector = createSelector(featureSelector, (state) => ({
    ...state,
}));

export const isAddresseeSubmittedSelector = createSelector(
    featureSelector,
    (state) => state.isSubmitted,
);
