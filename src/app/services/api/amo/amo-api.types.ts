import { Nullable } from './../../../../types/common';

type customFieldType =
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

type customFieldEnum = {
  id: number;
  value: string;
  sort: number;
};

type customFieldEntityType =
  | 'leads'
  | 'contacts'
  | 'companies'
  | 'segments'
  | 'customers'
  | 'catalogs';

type customFieldRemind = 'never' | 'day' | 'week' | 'month';

export type customField = {
  id: number;
  name: string;
  type: customFieldType;
  account_id: number;
  code: Nullable<string>;
  sort: number;
  is_api_only: boolean;
  enums: Nullable<customFieldEnum[]>;
  group_id: Nullable<string>;
  required_statuses: any[];
  is_deletable: boolean;
  is_predefined: boolean;
  entity_type: customFieldEntityType;
  remind?: Nullable<customFieldRemind>;
  triggers: any[];
  currency: Nullable<string>;
  hidden_statuses: [];
  _links: {
    self: {
      href: string;
    };
  };
};

export interface GetCustomFieldsResponse {
  _total_items: number;
  _page: number;
  _page_count: number;
  _links: {
    self: {
      href: string;
    };
    next?: {
      href: string;
    };
    last?: {
      href: string;
    };
  };
  _embedded: {
    custom_fields: customField[];
  };
}

interface Paginable {
  limit: number;
  page: number;
}

export interface GetCustomFieldsOptions extends Paginable {}

interface CustomFieldsValue {
  field_id: number;
  values: {
    value: any;
  }[];
}

export interface PatchLeadRequestBody {
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
  custom_fields_values: CustomFieldsValue[];
  _embedded: { [key: string]: any };
  request_id: string;
}

export interface PatchLeadResponse {
  id: number;
  updated_at: number;
  request_id: string;
}

export interface GetLeadByIdResponse {
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
  custom_fields_values: CustomFieldsValue[] | null;
  score: number | null;
  account_id: number;
  is_price_modified_by_robot: boolean;
  _embedded: { [key: string]: any };
}
