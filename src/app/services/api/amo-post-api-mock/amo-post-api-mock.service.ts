import { Injectable } from '@angular/core';
import { IAmoPostApiService } from '../amo-post-api/amo-post-api.service';
import { delay, of } from 'rxjs';
import { ICrmContext } from 'src/app/interfaces/crm-context.interface';
import secrets from '../../../../../auth-dev-server/secrets.json';

@Injectable()
export class AmoPostApiMockService implements IAmoPostApiService {
  constructor() {}

  getCrmContext() {
    return of<ICrmContext>({
      isCard: true,
      cardId: 1,
      domain: secrets.accountDomain,
      subdomain: secrets.subdomain,
      oAuthUuid: secrets.integration.client_id,
      xApiKey: secrets.x_api_key,
    }).pipe(delay(2000));
  }
}
