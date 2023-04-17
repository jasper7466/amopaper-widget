import { IMiscState, miscKey } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<IMiscState>(miscKey);

export const newPacketTitleSelector = createSelector(
    featureSelector,
    (state) => state.packetTitle
);

export const shareLinkSelector = createSelector(
    featureSelector,
    (state) => state.shareLink
);
