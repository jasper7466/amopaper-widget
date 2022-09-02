import { CrmContext } from './index';
import { createAction, props } from '@ngrx/store';

export const updateCrmContextAction = createAction(
  '[CRM-CONTEXT] update',
  props<CrmContext>()
);
