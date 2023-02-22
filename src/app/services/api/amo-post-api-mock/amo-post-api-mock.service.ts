import { Injectable } from '@angular/core';
import { IAmoPostApiService } from '../amo-post-api/amo-post-api.service';
import { delay, of } from 'rxjs';
import { ICrmContext } from 'src/app/interfaces/crm-context.interface';

@Injectable()
export class AmoPostApiMockService implements IAmoPostApiService {
  constructor() {}

  getCrmContext() {
    return of<ICrmContext>({
      isCard: true,
      cardId: 1,
      domain: '',
      subdomain: '',
      oAuthUuid: '',
      xApiKey: '05cb53c0-46a7-4450-b93e-ca7b67b04853',
    }).pipe(delay(2000));
  }
}
