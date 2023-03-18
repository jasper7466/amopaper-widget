import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPacketsState, PACKETS_KEY } from '.';

export const featureSelector =
  createFeatureSelector<IPacketsState>(PACKETS_KEY);

export const packetsSelector = createSelector(
  featureSelector,
  (state) => state.packets
);

export const packetsIdsSelector = createSelector(featureSelector, (state) =>
  state.packets.map((item) => item.id)
);

export const packetsIsTouchedSelector = createSelector(
  featureSelector,
  (state) => state.isPacketsIdsTouched
);

export const packetSelector = (id: number) =>
  createSelector(packetsSelector, (packets) => {
    const packet = packets.find((item) => item.id === id);
    if (!packet) {
      throw new Error(`packetSelector: Packet #${id} does not exist in store.`);
    }
    return packet;
  });

export const packetStepNameSelector = (id: number) =>
  createSelector(packetSelector(id), (packet) => packet.status);

export const packetTitleSelector = (id: number) =>
  createSelector(packetSelector(id), (packet) => packet.title);
