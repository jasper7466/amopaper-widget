import { addresseeKey } from './index';
import { createAction, props } from '@ngrx/store';
import { IAddresseeExistence } from 'src/app/interfaces/addressee-existence.interface';
import { IAddressee } from 'src/app/interfaces/addressee.interface';

export const addresseeUpdateAction = createAction(
    `[${addresseeKey}] addressee update`,
    props<Pick<IAddressee, 'idType' | 'idValue'>>(),
);

export const addresseeCheckAction = createAction(`[${addresseeKey}] check`);

export const addresseeSetExistenceAction = createAction(
    `[${addresseeKey}] set existence`,
  props<IAddresseeExistence>,
);

export const addresseeSubmitAction = createAction(
    `[${addresseeKey}] submit`,
  props<IAddresseeExistence>,
);

export const resetAddresseeAction = createAction(`[${addresseeKey}] remove`);
