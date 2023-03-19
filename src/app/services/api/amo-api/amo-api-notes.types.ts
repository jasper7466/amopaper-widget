import { IAmoBaseResponse, IEmbeddedItem } from './amo-api-common.types';

interface INoteParams {
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

export type TNoteType = keyof INoteParams;

interface INote<T extends keyof INoteParams> extends IEmbeddedItem {
  account_id: number;
  created_at: number;
  created_by: number;
  entity_id: number;
  group_id: number;
  id: number;
  note_type: T;
  params: INoteParams[T];
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
