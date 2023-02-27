import { initialPacketState, initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  updatePacketsIdsListAction,
  setPacketDetailsAction,
  setPacketStatusAction,
} from './actions';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

export const packetsReducer = createReducer(
  initialState,
  on(updatePacketsIdsListAction, (state, { payload }) => {
    const newIdsList = payload;
    const oldIdsList = state.ids;

    const idsToAdd = newIdsList.filter((id) => !oldIdsList.includes(id));
    const idsToRemove = oldIdsList.filter((id) => !newIdsList.includes(id));

    if (idsToAdd.length === 0 && idsToRemove.length === 0) {
      return { ...state, isPacketsIdsTouched: true };
    }

    const updatedIds = [...state.ids]
      .filter((id) => idsToRemove.includes(id))
      .concat(idsToAdd);

    const newPackets: IPacketDetails[] = idsToAdd.map((id) => ({
      id,
      ...initialPacketState,
    }));

    const updatedPackets = [...state.packets]
      .filter((packet) => !idsToRemove.includes(packet.id))
      .concat(newPackets);

    return {
      ...state,
      ids: updatedIds,
      packets: updatedPackets,
      isPacketsIdsTouched: true,
    };
  }),
  on(setPacketStatusAction, (state, { id, status }) => {
    const indexToUpdate = state.packets.findIndex((item) => item.id === id);
    const packetToUpdate = state.packets[indexToUpdate];

    if (indexToUpdate >= 0 && packetToUpdate.status === status) {
      return { ...state };
    }

    const updatedPacketsList = [...state.packets].splice(indexToUpdate, 1, {
      ...packetToUpdate,
      status,
    });

    return {
      ...state,
      packets: updatedPacketsList,
    };
  }),
  on(setPacketDetailsAction, (state, { id, title, createTimeUtc }) => {
    const indexToUpdate = state.packets.findIndex((item) => item.id === id);
    const packetToUpdate = state.packets[indexToUpdate];

    title = title.length ? title : initialPacketState.title;

    if (
      indexToUpdate >= 0 &&
      packetToUpdate.title === title &&
      packetToUpdate.createTimeUtc === createTimeUtc
    ) {
      return { ...state };
    }

    const updatedPacketsList = [...state.packets].splice(indexToUpdate, 1, {
      ...packetToUpdate,
      title,
      createTimeUtc,
    });

    return {
      ...state,
      packets: updatedPacketsList,
    };
  })
);
