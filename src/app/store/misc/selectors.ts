import { IMiscState, MISC_KEY } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<IMiscState>(MISC_KEY);

export const packetTitleSelector = createSelector(
  featureSelector,
  (state) => state.packetTitle
);
