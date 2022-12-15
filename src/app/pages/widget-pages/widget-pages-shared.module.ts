import { RouterModule } from '@angular/router';
import { ComponentsSharedModule } from '../../components/components-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetPageListComponent } from './widget-page-list/widget-page-list.component';
import { WidgetPageNewComponent } from './widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './widget-page-packet/widget-page-packet.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    WidgetPageListComponent,
    WidgetPageNewComponent,
    WidgetPagePacketComponent,
  ],
  imports: [CommonModule, ComponentsSharedModule, AppRoutingModule],
  exports: [
    WidgetPageListComponent,
    WidgetPageNewComponent,
    WidgetPagePacketComponent,
  ],
})
export class WidgetPagesSharedModule {}
