import { ICrmContext } from 'src/app/interfaces/crm-context.interface';
import { CRM_CONTEXT_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export const updateCrmContextAction = createAction(
  `[${CRM_CONTEXT_KEY}] update CRM context`,
  props<ICrmContext>()
);

// export const setLeadAttachmentsAction = createAction(
//   `[${CRM_CONTEXT_KEY}] set lead attachments`,
//   props<{ attachments: LeadAttachment[] }>()
// );
