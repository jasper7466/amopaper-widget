import { ICrmLeadJsonStorage } from './crm-lead-json-storage.interface';

export interface ICrmLead {
    name: string;
    jsonStorage: ICrmLeadJsonStorage;
}
