import { SubServicesCoreModule } from './sub-services/sub-services-core.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLogicService } from './common-logic.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SubServicesCoreModule,
    ],
    providers: [CommonLogicService],
})
export class ServicesCoreModule {
    constructor(@Optional() @SkipSelf() parentModule: ServicesCoreModule) {
        if (parentModule) {
            throw new Error(
                'ServicesCoreModule is already loaded. Import it in the AppModule only',
            );
        }
    }
}
