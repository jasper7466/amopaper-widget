import { state } from '@angular/animations';
import { SIGNATURES_KEY, ISignaturesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISignaturesState>(SIGNATURES_KEY);

const identifiersSelector = createSelector(
  featureSelector,
  (state) => state.identifiers
);

export const decodedFilesSelector = createSelector(
  featureSelector,
  (state) => state.decodedFiles
);

export const signatureSelector = createSelector(featureSelector, (state) => [
  state.signature[0],
  state.signature[1],
]);

export const filesIdsPreviewSelector = createSelector(
  identifiersSelector,
  (state) => {
    const identifiers: number[] = [];
    const offerId = state.ofertaOriginal.documentFileId;

    if (offerId) {
      identifiers.push(offerId);
    }

    identifiers.push(
      ...state.signDocumentList.map((item) => item.documentFileId)
    );

    return identifiers;
  }
);

export const filesIdsSignedOriginal = createSelector(
  identifiersSelector,
  (state) => {
    const offerOriginalId = state.ofertaOriginal;
    const filesOriginalIds = [...state.signDocumentList];

    if (offerOriginalId.documentFileId) {
      filesOriginalIds.push(offerOriginalId);
    }

    return filesOriginalIds;
  }
);

export const filesIdsSignedStamp = createSelector(
  identifiersSelector,
  (state) => {
    const offerStampedId = state.ofertaWithStamp;
    const filesStampedIds = [...state.stampDocumentList];

    if (offerStampedId.documentFileId) {
      filesStampedIds.push(offerStampedId);
    }

    return filesStampedIds;
  }
);

export const signaturesSenderSignatureSelector = createSelector(
  signatureSelector,
  (state) => state[0]
);

export const signaturesReceiverSignatureSelector = createSelector(
  signatureSelector,
  (state) => state[1]
);
