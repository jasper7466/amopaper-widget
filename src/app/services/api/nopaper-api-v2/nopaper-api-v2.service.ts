import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';
import { ApiService } from './../api.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPacketEndpoint$ } from './endpoints/create-packet.endpoint';
import { getPacketDetailsEndpoint$ } from './endpoints/get-packet-details.endpoint';
import { revokePacketEndpoint$ } from './endpoints/revoke-packet.endpoint';

const baseUrl = environment.getNopaperBaseUrl('v2');

@Injectable()
export class NopaperApiV2Service extends ApiService {
  private _xApiKey$ = this._store$.select(xApiKeySelector);

  constructor(http: HttpClient, private _store$: Store) {
    super(http);
    this.baseUrl = baseUrl;
    this.setHeaders({ 'Content-Type': 'application/json' });
    this._xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });
  }

  public postPacket = createPacketEndpoint$;
  public getPacketDetails = getPacketDetailsEndpoint$;
  public revokePacket = revokePacketEndpoint$;
}
