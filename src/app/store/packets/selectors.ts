import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPacketsState, PACKETS_KEY } from '.';

export const featureSelector =
  createFeatureSelector<IPacketsState>(PACKETS_KEY);

export const packetsSelector = createSelector(
  featureSelector,
  (state) => state.packets
);

export const packetsIdsSelector = createSelector(
  featureSelector,
  (state) => state.packetsIds
);

export const packetsIdsIsTouchedSelector = createSelector(
  featureSelector,
  (state) => state.isPacketsIdsTouched
);

export const packetStepNameSelector = (id: number) =>
  createSelector(packetsSelector, (packets) => packets[id]?.stepName);

export const packetTitleSelector = (id: number) =>
  createSelector(packetsSelector, (packets) => packets[id]?.title);

export const packetSelector = (id: number) =>
  createSelector(packetsSelector, (packets) => packets[id]);
