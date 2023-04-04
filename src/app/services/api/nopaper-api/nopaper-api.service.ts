import { ApiService } from '../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';
import { getPacketDetailsEndpoint } from './endpoints/deprecated/get-packet-details.endpoint';
import { getPacketStepNameEndpoint } from './endpoints/get-packet-step-name.endpoint';
import { createPacketEndpoint } from './endpoints/create-packet.endpoint';
import { checkByPhoneEndpoint } from './endpoints/check-by-phone.endpoint';
import { setPacketStepNameEndpoint } from './endpoints/set-packet-step-name.endpoint';
import { getPacketFilesIdsEndpoint } from './endpoints/get-packet-files-ids.endpoint';
import { getFilesByIdsEndpoint } from './endpoints/get-files-by-ids.endpoint';
import { getFileSignaturesEndpoint } from './endpoints/get-files-signatures.endpoint';
import { getShareLinkEndpoint } from './endpoints/get-share-link.endpoint';

const BASE_URL = environment.getNopaperBaseUrl('v1');

@Injectable()
export class NopaperApiService extends ApiService {
  private _xApiKey$ = this._store.select(xApiKeySelector);

  constructor(http: HttpClient, private _store: Store) {
    super(http);
    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });
    this._xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });
  }

  public postPacket = createPacketEndpoint;
  public checkUserByPhone = checkByPhoneEndpoint;
  public getPacketStepName = getPacketStepNameEndpoint;
  public getPacketFilesIds = getPacketFilesIdsEndpoint;
  public getFilesByIds = getFilesByIdsEndpoint;
  public getFileSignatures = getFileSignaturesEndpoint;
  public getShareLink = getShareLinkEndpoint;
  public setPacketStepName = setPacketStepNameEndpoint;

  /** @deprecated */
  public getPacketDetails = getPacketDetailsEndpoint;
}
