import { createAction, props } from '@ngrx/store';
import { crmLeadKey } from '.';
import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';

export const updateLeadNameAction = createAction(
  `[${crmLeadKey}] update lead name`,
  props<{ name: string }>()
);

export const updateLeadJsonStorageAction = createAction(
  `[${crmLeadKey}] update json storage state`,
  props<ICrmLeadJsonStorage>()
);
