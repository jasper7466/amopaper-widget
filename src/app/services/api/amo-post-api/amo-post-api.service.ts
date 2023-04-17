import { Injectable } from '@angular/core';
import { PostMessageTransportService } from '../../transport/post-message-transport.service';
import { getCrmContextEndpoint$ } from './endpoints/get-crm-context.endpoint';
import { Observable } from 'rxjs';
import { ICrmContext } from 'src/app/interfaces/crm-context.interface';

export interface IAmoPostApiService {
    getCrmContext$: () => Observable<ICrmContext>;
}
@Injectable({
    providedIn: 'root',
})
export class AmoPostApiService implements IAmoPostApiService {
    constructor(
        protected postMessageTransportService: PostMessageTransportService
    ) {}

    public getCrmContext$ = (): Observable<ICrmContext> => {
        return getCrmContextEndpoint$.call(this);
    };
}
