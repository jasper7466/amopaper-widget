import {
  ISystem,
  IWidgetSettings,
  TConstants,
} from '../amo-post-api-common.types';
import { Observable, map, tap } from 'rxjs';
import { AmoPostApiService } from '../amo-post-api.service';
import { ICrmContext } from 'src/app/interfaces/crm-context.interface';

interface IGetCrmContextRequest {}

interface IGetCrmContextResponse {
  settings: IWidgetSettings & { x_api_key: string };
  system: ISystem;
  constants: {
    user_rights: TConstants['user_rights'];
  };
  isCard: boolean;
  cardId: number | false;
}

const responseAdapter = (response: IGetCrmContextResponse): ICrmContext => ({
  isAdminUser: response.constants.user_rights.is_admin,
  isCard: response.isCard,
  cardId: typeof response.cardId === 'number' ? response.cardId : -1,
  domain: response.system.domain,
  subdomain: response.system.subdomain,
  oAuthUuid: response.settings.oauth_client_uuid,
  xApiKey: response.settings.x_api_key,
  isWidgetActive: response.settings.active === 'Y',
  isWidgetConfigured: response.settings.widget_active === 'Y',
});

export function getCrmContextEndpoint(
  this: AmoPostApiService
): Observable<ICrmContext> {
  return this.postMessageTransportService
    .request<IGetCrmContextRequest, IGetCrmContextResponse>({
      action: 'getCrmContextRequest',
      backwardAction: 'getCrmContextResponse',
      payload: {},
    })
    .pipe(map(responseAdapter));
}
