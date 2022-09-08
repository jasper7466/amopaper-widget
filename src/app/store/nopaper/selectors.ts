import { INopaperState, NOPAPER_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector =
  createFeatureSelector<INopaperState>(NOPAPER_KEY);

export const packetIdSelector = createSelector(
  featureSelector,
  (state) => state.packetId
);
