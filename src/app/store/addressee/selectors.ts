import { IAddresseeState, ADDRESSEE_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IAddresseeState>(ADDRESSEE_KEY);

export const addresseeSelector = createSelector(featureSelector, (state) => ({
  ...state,
}));

export const isAddresseeAddedSelector = createSelector(
  featureSelector,
  (state) => state.isSubmitted
);
