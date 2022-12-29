import { CONTEXT_KEY, CrmContext, LeadAttachment } from './index';
import { createAction, props } from '@ngrx/store';

export const updateCrmContextAction = createAction(
  `[${CONTEXT_KEY}] update CRM context`,
  props<CrmContext>()
);

export const setLeadAttachmentsAction = createAction(
  `[${CONTEXT_KEY}] set lead attachments`,
  props<{ attachments: LeadAttachment[] }>()
);
