import { Nullable } from 'src/types/common';
import { PostMessageResponses } from 'src/types/crm-messages.types';

export type CrmContext = PostMessageResponses['getCrmContextResponse'];

export const CONTEXT_KEY = 'context';

export interface ICrmContextState {
  context: Nullable<CrmContext>;
  documentsPacketIdCustomFieldId: number;
}

export const initialState: ICrmContextState = {
  context: null,
  documentsPacketIdCustomFieldId: -1,
};
