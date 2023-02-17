import { ADDRESSEE_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export interface IAddresseeExistenceProps {
  isExists: boolean;
}

export const addAddresseeByPhoneAction = createAction(
  `[${ADDRESSEE_KEY}] add addressee by phone`,
  props<{ phone: string }>()
);

export const addAddresseeByVatIdAction = createAction(
  `[${ADDRESSEE_KEY}] add addressee by vat-id`,
  props<{ vatId: string }>()
);

export const setAddresseeExistenceAction = createAction(
  `[${ADDRESSEE_KEY}] set addressee existence`,
  props<IAddresseeExistenceProps>
);

export const resetAddresseeAction = createAction(
  `[${ADDRESSEE_KEY}] remove addressee`
);
