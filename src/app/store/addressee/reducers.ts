import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  addAddresseeByPhoneAction,
  addAddresseeByVatIdAction,
  resetAddresseeAction,
  setAddresseeExistenceAction,
} from './actions';

export const widgetContextReducer = createReducer(
  initialState,
  on(addAddresseeByPhoneAction, (state, { phone }) => ({
    ...state,
    type: 'phone',
    phone,
    vatId: null,
  })),
  on(addAddresseeByVatIdAction, (state, { vatId }) => ({
    ...state,
    type: 'vatId',
    vatId,
    phone: null,
  })),
  on(setAddresseeExistenceAction, (state) => ({
    ...state,
    isExists: true,
  })),
  on(resetAddresseeAction, () => ({
    ...initialState,
  }))
);
