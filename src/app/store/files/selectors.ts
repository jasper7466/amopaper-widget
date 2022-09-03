import { FILES_KEY, IFilesState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<IFilesState>(FILES_KEY);

export const filesSelector = createSelector(
  featureSelector,
  (state) => state.files
);
