import { ICrmLeadJsonStorage } from 'src/app/interfaces/crm-lead-json-storage.interface';

export const CRM_LEAD_KEY = 'crm-lead-context';

export interface ICrmLeadState {
  name: string | null;
  jsonStorage: ICrmLeadJsonStorage;
}

export const initialState: ICrmLeadState = {
  name: null,
  jsonStorage: { packetsIdsList: [] },
};
