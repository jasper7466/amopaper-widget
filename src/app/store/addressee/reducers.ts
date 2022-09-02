import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  addAddresseeByPhoneAction,
  addAddresseeByVatIdAction,
  removeAddresseeAction,
  setAddresseeExistenceAction,
} from './actions';

export const widgetContextReducer = createReducer(
  initialState,
  on(addAddresseeByPhoneAction, (state, { phone }) => ({
    ...state,
    isAdded: true,
    phone,
  })),
  on(addAddresseeByVatIdAction, (state, { vatId }) => ({
    ...state,
    isAdded: true,
    vatId,
  })),
  on(setAddresseeExistenceAction, (state) => ({
    ...state,
    isExists: true,
  })),
  on(removeAddresseeAction, () => ({
    ...initialState,
  }))
);
