import { constants, IWidgetSettings, ISystem } from './amo-crm';

export type PostMessageRequests = {
  getCrmContextRequest: null;
};

export type PostMessageResponses = {
  getCrmContextResponse: {
    settings: IWidgetSettings & { x_api_key: string };
    system: ISystem;
    constants: {
      user_rights: constants['user_rights'];
    };
    isCard: boolean;
    cardId: number | false;
  };
};
