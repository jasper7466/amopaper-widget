import { constants, IWidgetSettings, ISystem } from './amo-crm';

export type OutboxRequests = {
  getCrmContextRequest: null;
};

export type InboxResponses = {
  getCrmContextResponse: {
    settings: IWidgetSettings & { x_api_key: string };
    system: ISystem;
    constants: {
      user_rights: constants['user_rights'];
    };
  };
};
