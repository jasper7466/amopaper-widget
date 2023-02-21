import { SIGNATURES_KEY, ISignaturesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISignaturesState>(SIGNATURES_KEY);

export const signatureSelector = createSelector(
  featureSelector,
  (state) => state.signatures
);
