import { NopaperApiService } from './api/nopaper/nopaper-api.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmoApiService } from './api/amo/amo-api.service';
import { CrmService } from './crm.service';
import { FilesService } from './files.service';
import { NopaperService } from './nopaper.service';
import { NotificationService } from './notification.service';
import { PostMessageService } from './post-message.service';
import { RoutingService } from './routing.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AmoApiService,
    NopaperApiService,
    CrmService,
    FilesService,
    NopaperService,
    NotificationService,
    PostMessageService,
    RoutingService,
  ],
})
export class ServicesCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: ServicesCoreModule) {
    if (parentModule) {
      throw new Error(
        'ServicesCoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
