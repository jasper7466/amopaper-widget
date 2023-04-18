import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { ButtonComponent } from './button/button.component';
import { DocumentCountLabelComponent } from './document-count-label/document-count-label.component';
import { InputComponent } from './input/input.component';
import { NopaperLogoComponent } from './nopaper-logo/nopaper-logo.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { StatusBannerComponent } from './status-banner/status-banner.component';
import { StatusLabelComponent } from './status-label/status-label.component';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TemplatesSharedModule } from '../templates/templates-shared.module';
import { PipesSharedModule } from 'src/app/pipes/pipes-shared.module';
import { IconDownloadComponent } from './icon-download/icon-download.component';
import { IconDocumentComponent } from './icon-document/icon-document.component';

@NgModule({
    declarations: [
        ArrowComponent,
        ButtonComponent,
        BackButtonComponent,
        DocumentCountLabelComponent,
        InputComponent,
        NopaperLogoComponent,
        PreloaderComponent,
        StatusBannerComponent,
        StatusLabelComponent,
        SubtitleComponent,
        TooltipComponent,
        IconDownloadComponent,
        IconDocumentComponent,
    ],
    imports: [
        CommonModule,
        TemplatesSharedModule,
        PipesSharedModule,
    ],
    exports: [
        ArrowComponent,
        ButtonComponent,
        BackButtonComponent,
        DocumentCountLabelComponent,
        InputComponent,
        NopaperLogoComponent,
        PreloaderComponent,
        StatusBannerComponent,
        StatusLabelComponent,
        SubtitleComponent,
        TooltipComponent,
        IconDownloadComponent,
        IconDocumentComponent,
    ],
})
export class AtomsSharedModule {}
