import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { updateCrmContextAction } from './actions';

export const crmContextReducer = createReducer(
    initialState,
    on(updateCrmContextAction, (state, payload) => ({
        ...state,
        context: payload,
    }))
    // on(setLeadAttachmentsAction, (state, { attachments }) => ({
    //   ...state,
    //   attachments,
    // }))
);
