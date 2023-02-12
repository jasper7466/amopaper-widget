import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ServicesCoreModule } from './../services-core.module';
import { NopaperApiService } from './nopaper-api/nopaper-api.service';
import { AmoApiService } from './amo-api/amo-api.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenApiService } from './access-token-api/access-token-api.service';
import { AccessTokenLocalApiService } from './access-token-local-api/access-token-local-api.service';

const AccessTokenApiFactory = (http: HttpClient, store: Store) => {
  if (environment.isLocalTokenServer) {
    return new AccessTokenLocalApiService(http, store);
  }

  return new AccessTokenApiService(http, store);
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AmoApiService,
    NopaperApiService,
    {
      provide: AccessTokenApiService,
      useFactory: AccessTokenApiFactory,
      deps: [HttpClient, Store],
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
