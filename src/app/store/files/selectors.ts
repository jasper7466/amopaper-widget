import { FILES_KEY, IFilesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<IFilesState>(FILES_KEY);

export const filesSelector = createSelector(
  featureSelector,
  (state) => state.files
);

export const totalCountSelector = createSelector(
  featureSelector,
  (state) => state.totalCount
);

export const loadedCountSelector = createSelector(
  featureSelector,
  (state) => state.loadedCount
);

export const isCompleteSelector = createSelector(
  featureSelector,
  (state) => state.isComplete
);
