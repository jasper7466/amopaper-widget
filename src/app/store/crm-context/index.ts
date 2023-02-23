import { ICrmContext } from 'src/app/interfaces/crm-context.interface';

export const CRM_CONTEXT_KEY = 'crm-context';

export type LeadAttachment = {
  fileName: string;
  fileUuid: string;
  versionUuid: string;
  isDrive: boolean;
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
};

export interface ICrmContextState {
  context: ICrmContext | null;
  documentsPacketIdCustomFieldId: number;
  attachments: LeadAttachment[];
}

export const initialState: ICrmContextState = {
  context: null,
  documentsPacketIdCustomFieldId: -1,
  attachments: [],
};
