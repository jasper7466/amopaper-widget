import { AmoApiModule } from './amo-api/amo-api.module';
import { NopaperApiV2Service } from './nopaper-api-v2/nopaper-api-v2.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesCoreModule } from './../services-core.module';
import { NopaperApiService } from './nopaper-api/nopaper-api.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenApiService } from './access-token-api/access-token-api.service';
import { AccessTokenLocalApiService } from './access-token-local-api/access-token-local-api.service';
import { AmoPostApiMockService } from './amo-post-api-mock/amo-post-api-mock.service';
import { AmoPostApiService } from './amo-post-api/amo-post-api.service';
import { PostMessageTransportService } from '../transport/post-message-transport.service';

const accessTokenApiFactory = (
    http: HttpClient,
    store$: Store
): AccessTokenApiService | AccessTokenLocalApiService => {
    if (environment.isLocalTokenServer) {
        return new AccessTokenLocalApiService(http, store$);
    }

    return new AccessTokenApiService(http, store$);
};

const amoPostApiFactory = (
    postMessageTransport: PostMessageTransportService
): AmoPostApiService | AmoPostApiMockService => {
    if (environment.isStandaloneFrame) {
        return new AmoPostApiMockService();
    }

    return new AmoPostApiService(postMessageTransport);
};

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, AmoApiModule],
    providers: [
        NopaperApiService,
        NopaperApiV2Service,
        PostMessageTransportService,
        {
            provide: AccessTokenApiService,
            useFactory: accessTokenApiFactory,
            deps: [HttpClient, Store],
        },
        {
            provide: AmoPostApiService,
            useFactory: amoPostApiFactory,
            deps: [PostMessageTransportService],
        },
    ],
})
export class ApiCoreModule {
    constructor(@Optional() @SkipSelf() parentModule: ServicesCoreModule) {
        if (parentModule) {
            throw new Error(
                'ServicesCoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}
