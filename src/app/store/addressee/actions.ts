import { ADDRESSEE_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { IAddresseeExistence } from 'src/app/interfaces/addressee-existence.interface';
import { IAddressee } from 'src/app/interfaces/addressee.interface';

export const addresseeUpdateAction = createAction(
  `[${ADDRESSEE_KEY}] addressee update`,
  props<Pick<IAddressee, 'idType' | 'idValue'>>()
);

export const addresseeCheckAction = createAction(`[${ADDRESSEE_KEY}] check`);

export const addresseeSetExistenceAction = createAction(
  `[${ADDRESSEE_KEY}] set existence`,
  props<IAddresseeExistence>
);

export const addresseeSubmitAction = createAction(
  `[${ADDRESSEE_KEY}] submit`,
  props<IAddresseeExistence>
);

export const resetAddresseeAction = createAction(`[${ADDRESSEE_KEY}] remove`);
