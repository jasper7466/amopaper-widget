import { SIGNATURES_KEY, ISignaturesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISignaturesState>(SIGNATURES_KEY);

export const signaturesSelectorAll = createSelector(
  featureSelector,
  (state) => state
);

export const signaturesSignedIdentifiersSelector = createSelector(
  featureSelector,
  (state) => state.identifiers.signDocumentList
);

export const signaturesSenderSignatureSelector = createSelector(
  featureSelector,
  (state) => state.signature[0]
);

export const signaturesReceiverSignatureSelector = createSelector(
  featureSelector,
  (state) => state.signature[1]
);
