import { TitleResolverService } from './title-resolver.service';
import { CrmService } from 'src/app/services/sub-services/crm.service';
import { ApiCoreModule } from '../api/api-core.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesService } from './files.service';
import { NopaperService } from './nopaper.service';
import { NotificationService } from './notification.service';
import { RoutingService } from './routing.service';
import { WindowService } from './window.service';
import { environment } from 'src/environments/environment';
import { WindowMockService } from './window-mock.service';

const WindowServiceFactory = () => {
  if (environment.isStandaloneFrame) {
    return new WindowMockService();
  }

  return new WindowService();
};
@NgModule({
  declarations: [],
  imports: [CommonModule, ApiCoreModule],
  providers: [
    CrmService,
    FilesService,
    NopaperService,
    NotificationService,
    RoutingService,
    TitleResolverService,
    {
      provide: WindowService,
      useFactory: WindowServiceFactory,
    },
  ],
})
export class SubServicesCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: SubServicesCoreModule) {
    if (parentModule) {
      throw new Error(
        'ServicesCoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
