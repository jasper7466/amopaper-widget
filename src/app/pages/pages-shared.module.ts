import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesSharedModule } from './main-pages/main-pages-shared.module';
import { PacketPagesSharedModule } from './packet-pages/packet-pages-shared.module';
import { WidgetPagesSharedModule } from './widget-pages/widget-pages-shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainPagesSharedModule,
    PacketPagesSharedModule,
    WidgetPagesSharedModule,
  ],
  exports: [
    MainPagesSharedModule,
    PacketPagesSharedModule,
    WidgetPagesSharedModule,
  ],
})
export class PagesSharedModule {}
