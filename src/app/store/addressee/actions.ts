import { createAction, props } from '@ngrx/store';

export const addAddresseeByPhoneAction = createAction(
  '[WIDGET-CONTEXT] add addressee by phone',
  props<{ phone: string }>()
);

export const addAddresseeByVatIdAction = createAction(
  '[WIDGET-CONTEXT] add addressee by vat-id',
  props<{ vatId: string }>()
);

export const setAddresseeExistenceAction = createAction(
  '[WIDGET-CONTEXT] set addressee existence'
);

export const removeAddresseeAction = createAction(
  '[WIDGET-CONTEXT] remove addressee'
);
