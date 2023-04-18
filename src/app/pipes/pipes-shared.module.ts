import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclensionPipe } from './declension.pipe';
import { StepToLabelStatusPipe } from './step-label-status.pipe';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        DeclensionPipe,
        StepToLabelStatusPipe,
    ],
    imports: [
        CommonModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        DeclensionPipe,
        StepToLabelStatusPipe,
        NgxMaskModule,
    ],
})
export class PipesSharedModule {}
