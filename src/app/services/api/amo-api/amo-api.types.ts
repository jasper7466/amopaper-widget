import { Nullable } from '../../../types/common';

type Links = {
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

interface IEmbeddedItem {
  _links: Links;
}

interface IAmoBaseResponse<PayloadType> {
  _total_items: number;
  _page: number;
  _page_count: number;
  _links: Links;
  _embedded: PayloadType;
}

type CustomFieldType =
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

type CustomFieldEnum = {
  id: number;
  value: string;
  sort: number;
};

type CustomFieldEntityType =
  | 'leads'
  | 'contacts'
  | 'companies'
  | 'segments'
  | 'customers'
  | 'catalogs';

type CustomFieldRemind = 'never' | 'day' | 'week' | 'month';

export interface ICustomField extends IEmbeddedItem {
  id: number;
  name: string;
  type: CustomFieldType;
  account_id: number;
  code: Nullable<string>;
  sort: number;
  is_api_only: boolean;
  enums: Nullable<CustomFieldEnum[]>;
  group_id: Nullable<string>;
  required_statuses: any[];
  is_deletable: boolean;
  is_predefined: boolean;
  entity_type: CustomFieldEntityType;
  remind?: Nullable<CustomFieldRemind>;
  triggers: any[];
  currency: Nullable<string>;
  hidden_statuses: [];
}

export interface IGetCustomFieldsResponse
  extends IAmoBaseResponse<{ custom_fields: ICustomField[] }> {}

interface NoteParams {
  attachment: {
    file_name: string;
    file_uuid: string;
    is_drive_attachment: boolean;
    original_name: string;
    text: string;
    version_uuid: string;
  };
  common: unknown;
  call_in: unknown;
  call_out: unknown;
  service_message: unknown;
  message_cashier: unknown;
  geolocation: unknown;
  sms_in: unknown;
  sms_out: unknown;
  extended_service_message: unknown;
}

export type NoteType = keyof NoteParams;

interface INote<T extends keyof NoteParams> extends IEmbeddedItem {
  account_id: number;
  created_at: number;
  created_by: number;
  entity_id: number;
  group_id: number;
  id: number;
  note_type: T;
  params: NoteParams[T];
  responsible_user_id: number;
  updated_at: number;
  updated_by: number;
}

interface IAttachmentNote extends INote<'attachment'> {}

export interface IGetLeadAttachmentsResponse
  extends Omit<
    IAmoBaseResponse<{ notes: IAttachmentNote[] }>,
    '_total_items' | '_page_count'
  > {}

// interface IPaginable {
//   limit: number;
//   page: number;
// }

// export interface IGetCustomFieldsOptions extends IPaginable {}

interface ICustomFieldsValue {
  field_id: number;
  values: {
    value: any;
  }[];
}

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
  custom_fields_values: ICustomFieldsValue[];
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
  custom_fields_values: ICustomFieldsValue[] | null;
  score: number | null;
  account_id: number;
  is_price_modified_by_robot: boolean;
  _embedded: { [key: string]: any };
}
