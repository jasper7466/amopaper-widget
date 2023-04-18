import { filesProcessedKey, IProcessedFilesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<IProcessedFilesState>(filesProcessedKey);

export const originalFilesSelector = createSelector(
    featureSelector,
    (state) => state.originalFiles,
);

const identifiersSelector = createSelector(
    featureSelector,
    (state) => state.identifiers,
);

export const filesIdsOriginalsSelector = createSelector(
    identifiersSelector,
    (state) => state.originals,
);

export const filesIdsStampedSelector = createSelector(
    identifiersSelector,
    (state) => state.stamped,
);
