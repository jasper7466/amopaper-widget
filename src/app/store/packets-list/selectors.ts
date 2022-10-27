import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPacketsState, PACKETS_KEY } from '.';

export const featureSelector =
  createFeatureSelector<IPacketsState>(PACKETS_KEY);

export const packetsListSelector = createSelector(
  featureSelector,
  (state) => state.packets
);

export const packetsIdsSelector = createSelector(
  featureSelector,
  (state) => state.packetsIds
);
