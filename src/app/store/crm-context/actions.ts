import { ICrmContext } from 'src/app/interfaces/crm-context.interface';
import { CONTEXT_KEY, LeadAttachment } from './index';
import { createAction, props } from '@ngrx/store';

export const updateCrmContextAction = createAction(
  `[${CONTEXT_KEY}] update CRM context`,
  props<ICrmContext>()
);

export const setLeadAttachmentsAction = createAction(
  `[${CONTEXT_KEY}] set lead attachments`,
  props<{ attachments: LeadAttachment[] }>()
);
