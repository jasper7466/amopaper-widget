import { NopaperApiV2Service } from './nopaper-api-v2/nopaper-api-v2.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ServicesCoreModule } from './../services-core.module';
import { NopaperApiService } from './nopaper-api/nopaper-api.service';
import { AmoApiService } from './amo-api/amo-api.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenApiService } from './access-token-api/access-token-api.service';
import { AccessTokenLocalApiService } from './access-token-local-api/access-token-local-api.service';
import { AmoPostApiMockService } from './amo-post-api-mock/amo-post-api-mock.service';
import { AmoPostApiService } from './amo-post-api/amo-post-api.service';
import { PostMessageTransportService } from '../transport/post-message-transport.service';
import { PostMessageProxyInterceptor } from 'src/app/interceptors/post-message-proxy.interceptor';

const AccessTokenApiFactory = (http: HttpClient, store: Store) => {
  if (environment.isLocalTokenServer) {
    return new AccessTokenLocalApiService(http, store);
  }

  return new AccessTokenApiService(http, store);
};

const AmoPostApiFactory = (
  postMessageTransport: PostMessageTransportService
) => {
  if (environment.isStandaloneFrame) {
    return new AmoPostApiMockService();
  }

  return new AmoPostApiService(postMessageTransport);
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    NopaperApiService,
    NopaperApiV2Service,
    PostMessageTransportService,
    AmoApiService,
    {
      provide: AccessTokenApiService,
      useFactory: AccessTokenApiFactory,
      deps: [HttpClient, Store],
    },
    {
      provide: AmoPostApiService,
      useFactory: AmoPostApiFactory,
      deps: [PostMessageTransportService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostMessageProxyInterceptor,
      multi: true,
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
// {
//   provide: HttpHandler,
//   useClass: PostMessageProxyHttpHandler,
// },
