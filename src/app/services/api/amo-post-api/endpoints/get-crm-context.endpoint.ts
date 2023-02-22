import { IPostMessage } from 'src/app/services/transport/post-message-transport.service';
import {
  ISystem,
  IWidgetSettings,
  TConstants,
} from '../amo-post-api-common.types';
import { Observable, map } from 'rxjs';
import { AmoPostApiService } from '../amo-post-api.service';
import { ICrmContext } from 'src/app/interfaces/crm-context.interface';

interface IGetCrmContextRequest extends Required<IPostMessage> {}

interface IGetCrmContextResponse extends IPostMessage {
  payload: {
    settings: IWidgetSettings & { x_api_key: string };
    system: ISystem;
    constants: {
      user_rights: TConstants['user_rights'];
    };
    isCard: boolean;
    cardId: number | false;
  };
}

const responseAdapter = ({ payload }: IGetCrmContextResponse): ICrmContext => ({
  isCard: payload.isCard,
  cardId: typeof payload.cardId === 'number' ? payload.cardId : -1,
  domain: payload.system.domain,
  subdomain: payload.system.subdomain,
  oAuthUuid: payload.settings.oauth_client_uuid,
  xApiKey: payload.settings.x_api_key,
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
