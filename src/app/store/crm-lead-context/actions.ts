import { createAction, props } from '@ngrx/store';
import { CRM_LEAD_KEY } from '.';
import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';

export const updateLeadNameAction = createAction(
  `[${CRM_LEAD_KEY}] update lead name`,
  props<{ name: string }>()
);

export const updateLeadJsonStorageAction = createAction(
  `[${CRM_LEAD_KEY}] update json storage state`,
  props<ICrmLeadJsonStorage>()
);
