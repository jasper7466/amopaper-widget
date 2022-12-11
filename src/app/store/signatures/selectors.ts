import { SIGNATURES_KEY, ISignaturesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISignaturesState>(SIGNATURES_KEY);

const identifiersSelector = createSelector(
  featureSelector,
  (state) => state.identifiers
);

export const filesSelector = createSelector(
  featureSelector,
  (state) => state.files
);

const signatureSelector = createSelector(
  featureSelector,
  (state) => state.signature
);

export const filesIdentifiersSelector = createSelector(
  identifiersSelector,
  (state) => {
    const identifiers: number[] = [];
    const ofertaId = state.ofertaOriginal?.documentFileId;

    if (ofertaId) {
      identifiers.push(ofertaId);
    }

    identifiers.push(
      ...state.signDocumentList.map((item) => item.documentFileId)
    );

    return identifiers;
  }
);

export const signaturesSignedIdentifiersSelector = createSelector(
  identifiersSelector,
  (state) => state.signDocumentList
);

export const signaturesSenderSignatureSelector = createSelector(
  signatureSelector,
  (state) => state[0]
);

export const signaturesReceiverSignatureSelector = createSelector(
  signatureSelector,
  (state) => state[1]
);
