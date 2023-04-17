import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
    addresseeUpdateAction,
    resetAddresseeAction,
    addresseeSetExistenceAction,
    addresseeSubmitAction,
} from './actions';

export const widgetContextReducer = createReducer(
    initialState,
    on(addresseeUpdateAction, (state, { idType, idValue }) => ({
        ...state,
        idType,
        idValue,
    })),
    on(addresseeSetExistenceAction, (state) => ({
        ...state,
        isExists: true,
    })),
    on(addresseeSubmitAction, (state) => ({
        ...state,
        isSubmitted: true,
    })),
    on(resetAddresseeAction, () => ({
        ...initialState,
    }))
);
