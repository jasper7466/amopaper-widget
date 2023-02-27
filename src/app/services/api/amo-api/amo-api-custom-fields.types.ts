import { IAmoBaseResponse, IEmbeddedItem } from './amo-api-common.types';

type TCustomFieldType =
  | 'text'
  | 'numeric'
  | 'checkbox'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'url'
  | 'textarea'
  | 'radiobutton'
  | 'streetaddress'
  | 'smart_address'
  | 'birthday'
  | 'legal_entity'
  | 'date_time'
  | 'price'
  | 'category'
  | 'items'
  | 'tracking_data'
  | 'linked_entity'
  | 'chained_list'
  | 'monetary'
  | 'file';

type TCustomFieldEnum = {
  id: number;
  value: string;
  sort: number;
};

type TCustomFieldEntityType =
  | 'leads'
  | 'contacts'
  | 'companies'
  | 'segments'
  | 'customers'
  | 'catalogs';

type TCustomFieldRemind = 'never' | 'day' | 'week' | 'month';

export interface ICustomField extends IEmbeddedItem {
  id: number;
  name: string;
  type: TCustomFieldType;
  account_id: number;
  code: string | null;
  sort: number;
  is_api_only: boolean;
  enums: TCustomFieldEnum[] | null;
  group_id: string | null;
  required_statuses: any[];
  is_deletable: boolean;
  is_predefined: boolean;
  entity_type: TCustomFieldEntityType;
  remind?: TCustomFieldRemind | null;
  triggers: any[];
  currency: string | null;
  hidden_statuses: [];
}

interface ICustomFieldsValues {
  field_id: number;
  values: {
    value: any;
  }[];
}

export interface IGetCustomFieldsResponse
  extends IAmoBaseResponse<{ custom_fields: ICustomField[] }> {}

export interface IPatchLeadRequest {
  name: string;
  price: number;
  status_id: number;
  pipeline_id: number;
  created_by: number;
  updated_by: number;
  closed_at: number;
  created_at: number;
  updated_at: number;
  loss_reason_id: number;
  responsible_user_id: number;
  custom_fields_values: ICustomFieldsValues[];
  _embedded: { [key: string]: any };
  request_id: string;
}

export interface IPatchLeadResponse {
  id: number;
  updated_at: number;
  request_id: string;
}

export interface IGetLeadByIdResponse {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number;
  source_id: number;
  created_by: number;
  updated_by: number;
  closed_at: number;
  created_at: number;
  updated_at: number;
  closest_task_at: number;
  is_deleted: boolean;
  custom_fields_values: ICustomFieldsValues[] | null;
  score: number | null;
  account_id: number;
  is_price_modified_by_robot: boolean;
  _embedded: { [key: string]: any };
}
