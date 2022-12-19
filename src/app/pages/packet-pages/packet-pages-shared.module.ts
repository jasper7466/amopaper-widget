import { PacketPageReceiverPreviewComponent } from './packet-page-receiver-preview/packet-page-receiver-preview.component';
import { ComponentsSharedModule } from '../../components/components-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacketPageDraftComponent } from './packet-page-draft/packet-page-draft.component';
import { PacketPageEndComponent } from './packet-page-end/packet-page-end.component';
import { PacketPagePrepareComponent } from './packet-page-prepare/packet-page-prepare.component';
import { PacketPagePreviewComponent } from './packet-page-preview/packet-page-preview.component';
import { PacketPageSenderSignComponent } from './packet-page-sender-sign/packet-page-sender-sign.component';
import { PipesSharedModule } from 'src/app/pipes/pipes-shared.module';
import { PdfPreviewWebModule } from 'local_modules/pdf-preview/src/public-api';

@NgModule({
  declarations: [
    PacketPageDraftComponent,
    PacketPageEndComponent,
    PacketPagePrepareComponent,
    PacketPagePreviewComponent,
    PacketPageSenderSignComponent,
    PacketPageReceiverPreviewComponent,
  ],
  imports: [
    CommonModule,
    ComponentsSharedModule,
    PipesSharedModule,
    PdfPreviewWebModule,
  ],
  exports: [
    PacketPageDraftComponent,
    PacketPageEndComponent,
    PacketPagePrepareComponent,
    PacketPagePreviewComponent,
    PacketPageSenderSignComponent,
    PacketPageReceiverPreviewComponent,
  ],
})
export class PacketPagesSharedModule {}
