import { Nullable } from 'src/app/types/common';
import { PostMessageResponses } from 'src/app/types/crm-messages.types';

export type CrmContext = PostMessageResponses['getCrmContextResponse'];

export const CONTEXT_KEY = 'context';

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
  context: Nullable<CrmContext>;
  documentsPacketIdCustomFieldId: number;
  attachments: LeadAttachment[];
}

export const initialState: ICrmContextState = {
  context: null,
  documentsPacketIdCustomFieldId: -1,
  attachments: [],
};
