import {
  initialPacketState,
  initialState,
  IPacketsState,
  IPacket,
  Packets,
} from './index';
import { createReducer, on } from '@ngrx/store';
import {
  setPacketInfoAction,
  setPacketsIdsAction,
  setPacketStepAction,
} from './actions';

export const packetsReducer = createReducer(
  initialState,
  on(setPacketsIdsAction, (state, { packetsIds }) => {
    console.log('DISPATCHED: setPacketsIdsAction', packetsIds);

    // Если набор пакетов не изменился
    if (
      packetsIds.length === state.packetsIds.length &&
      packetsIds.every((id) => id in state.packets)
    ) {
      return {
        ...state,
        isPacketsIdsTouched: true,
      };
    }

    const justAdded: { [key: number]: IPacket } = {};

    for (const packetId of packetsIds) {
      if (packetId in state.packets) {
        continue;
      }
      justAdded[packetId] = { ...initialPacketState };
    }

    // Добавляем новые пакеты
    let update: Packets = {
      ...state.packets,
      ...justAdded,
    };

    // Исключаем те, чей id отсутствует в запросе
    update = Object.fromEntries(
      Object.entries(update).filter(([key]) =>
        packetsIds.includes(parseInt(key))
      )
    );

    return {
      ...state,
      packetsIds: [...packetsIds],
      packets: {
        ...update,
      },
      isPacketsIdsTouched: true,
    };
  }),
  on(setPacketStepAction, (state, { packetId, stepName }) => {
    console.log('DISPATCHED: setPacketsStepAction', packetId, stepName);

    if (!(packetId in state.packets)) {
      return {
        ...state,
      };
    }

    if (stepName === state.packets[packetId].stepName) {
      return {
        ...state,
      };
    }

    const packet = {
      ...state.packets[packetId],
      stepName,
    };

    return {
      ...state,
      packets: {
        ...state.packets,
        [packetId]: packet,
      },
    };
  }),
  on(setPacketInfoAction, (state, { packetId, title, creationDate }) => {
    console.log('DISPATCHED: setPacketsInfoAction', title, creationDate);

    if (!(packetId in state.packets)) {
      return {
        ...state,
      };
    }

    if (
      title === state.packets[packetId].title ||
      creationDate === state.packets[packetId].creationDate
    ) {
      return {
        ...state,
      };
    }

    const packet = {
      ...state.packets[packetId],
      title,
      creationDate,
    };

    return {
      ...state,
      packets: {
        ...state.packets,
        [packetId]: packet,
      },
    };
  })
);
