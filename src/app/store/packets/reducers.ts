import { initialPacketState, initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  addPacketsByIdsAction as setPacketsByIdsAction,
  setPacketDetailsAction,
  setPacketStatusAction,
} from './actions';

export const packetsReducer = createReducer(
  initialState,
  on(setPacketsByIdsAction, (state, { payload }) => {
    const updatedPacketsList = [...state.packets];
    let updateRequired = false;

    // Удаление пакетов, чей id отсутствует в запросе
    for (const packet of updatedPacketsList) {
      const payloadPacket = payload.find((item) => item.id === packet.id);

      if (payloadPacket) {
        continue;
      }

      const indexToRemove = updatedPacketsList.findIndex(
        (item) => item.id === packet.id
      );

      updatedPacketsList.splice(indexToRemove, 1);
      updateRequired = true;
    }

    // Добавление пакетов, чей id отсутствует в хранилище
    for (const packet of payload) {
      const storedPacket = updatedPacketsList.find(
        (item) => item.id === packet.id
      );

      if (storedPacket) {
        continue;
      }

      updatedPacketsList.push({ ...initialPacketState, ...packet });
      updateRequired = true;
    }

    if (!updateRequired) {
      return { ...state };
    }

    return {
      ...state,
      packets: updatedPacketsList,
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
