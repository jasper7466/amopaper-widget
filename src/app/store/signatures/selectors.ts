import { signaturesKey, ISignaturesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISignaturesState>(signaturesKey);

export const signatureSelector = createSelector(
    featureSelector,
    (state) => state.signatures,
);
