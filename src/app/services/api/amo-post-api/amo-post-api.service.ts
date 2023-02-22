import { Injectable } from '@angular/core';
import { PostMessageTransportService } from '../../transport/post-message-transport.service';
import { getCrmContextEndpoint } from './endpoints/get-crm-context.endpoint';

@Injectable({
  providedIn: 'root',
})
export class AmoPostApiService {
  constructor(
    protected postMessageTransportService: PostMessageTransportService
  ) {}

  public getCrmContext = getCrmContextEndpoint;
}
