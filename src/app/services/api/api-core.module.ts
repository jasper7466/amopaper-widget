import { ServicesCoreModule } from './../services-core.module';
import { NopaperApiService } from './nopaper-api/nopaper-api.service';
import { AmoApiService } from './amo-api/amo-api.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenApiService } from './access-token-api/access-token-api.service';
import { AccessTokenLocalApiService } from './accesse-token-local-api/access-token-local-api.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AmoApiService,
    NopaperApiService,
    { provide: AccessTokenApiService, useClass: AccessTokenLocalApiService },
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
