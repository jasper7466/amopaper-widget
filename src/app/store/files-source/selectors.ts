import { filesSourceKey, ISourceFilesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<ISourceFilesState>(filesSourceKey);

export const sourceFilesSelector = createSelector(
    featureSelector,
    (state) => state.files,
);

export const sourceFilesTotalCountSelector = createSelector(
    featureSelector,
    (state) => state.totalCount,
);

export const sourceFilesLoadedCountSelector = createSelector(
    featureSelector,
    (state) => state.loadedCount,
);

export const isSourceFilesCompleteAllSelector = createSelector(
    featureSelector,
    (state) => state.isComplete,
);
