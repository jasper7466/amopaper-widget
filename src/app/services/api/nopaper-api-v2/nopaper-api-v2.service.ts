import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';
import { ApiService } from './../api.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPacketEndpoint } from './endpoints/create-packet.endpoint';
import { getPacketDetailsEndpoint } from './endpoints/get-packet-details.endpoint';

const BASE_URL = environment.getNopaperBaseUrl('v2');

@Injectable()
export class NopaperApiV2Service extends ApiService {
  private xApiKey$ = this.store.select(xApiKeySelector);

  constructor(http: HttpClient, private store: Store) {
    super(http);
    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });
    this.xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });
  }

  public postPacket = createPacketEndpoint;
  public getPacketDetails = getPacketDetailsEndpoint;
}
