export type TConstants = {
  user: Record<string, never>;
  user_rights: {
    is_admin: boolean;
    is_free_user: boolean;
  };
  account: Record<string, never>;
  managers: Record<string, never>;
  groups: Record<string, never>;
  task_types: Record<string, never>;
};

export interface IWidgetSettings {
  active: 'S' | 'N' | 'Y';
  category_code?: 'own_integrations' | '';
  id: number;
  images_path: string;
  oauth_client_uuid: string;
  path: string;
  status: 'not_configured' | 'installed';
  support: unknown[];
  version: string;
  widget_active: 'N' | 'Y';
  widget_code: string;
}

export interface ISystem {
  amohash: string;
  amouser: string;
  amouser_id: number;
  area: TLocation;
  displayed_count: number;
  displayed_count_by_area: { [key in TPageCode]: number };
  domain: string;
  server: string;
  subdomain: string;
}

export type TPageCode =
  | 'dashboard'
  | 'leads'
  | 'leads-trash'
  | 'leads-pipeline'
  | 'customers'
  | 'contacts'
  | 'customers-pipeline'
  | 'customers-trash'
  | 'contacts-trash'
  | 'companies'
  | 'mail'
  | 'todo'
  | 'todo-trash'
  | 'todo-line'
  | 'todo-calendar'
  | 'events'
  | 'authlog'
  | 'stats'
  | 'stats-human'
  | 'statsCalls'
  | `widget-page:${string}`
  | 'settings'
  | `advanced-settings:${number}`
  | 'widgetsSettings'
  | 'settings-users'
  | 'settings-communications'
  | 'catalogs'
  | 'leads_card'
  | 'contacts_card'
  | 'companies_card'
  | 'customers_card';

type TLocation =
  | 'lcard'
  | 'cucard'
  | 'ccard'
  | 'comcard'
  | 'llist'
  | 'culist'
  | 'clist'
  | 'tlist'
  | 'tline'
  | 'tcalendar'
  | 'settings'
  | 'advanced_settings'
  | 'card_sdk'
  | 'catalogs'
  | 'digital_pipeline'
  | 'lead_sources'
  | 'whatsapp_modal';
