import {
    setAppActiveLeadIdAction,
    setAppActivePacketIdAction,
    setAppInitAction,
} from './actions';
import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';

export const appContextReducer = createReducer(
    initialState,
    on(setAppInitAction, (state) => ({
        ...state,
        isInitialized: true,
    })),
    on(setAppActivePacketIdAction, (state, { packetId }) => ({
        ...state,
        activePacketId: packetId,
    })),
    on(setAppActiveLeadIdAction, (state, { leadId }) => ({
        ...state,
        activeLeadId: leadId,
    }))
);
