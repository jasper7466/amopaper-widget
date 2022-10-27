import { INopaperState, NOPAPER_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<INopaperState>(NOPAPER_KEY);

// export const packetsIdsSelector = createSelector(
//   featureSelector,
//   (state) => state.packetsIds
// );

export const stepNameSelector = createSelector(
  featureSelector,
  (state) => state.stepName
);
