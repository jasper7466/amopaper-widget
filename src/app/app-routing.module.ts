import { TitleResolverService } from './services/sub-services/title-resolver.service';
import { PacketPageReceiverPreviewComponent } from './pages/packet-pages/packet-page-receiver-preview/packet-page-receiver-preview.component';
import { PacketPageSenderSignComponent } from './pages/packet-pages/packet-page-sender-sign/packet-page-sender-sign.component';
import { NotificationPageComponent } from './pages/main-pages/notification-page/notification-page.component';
import { LandingPageComponent } from './pages/main-pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { StartupPageComponent } from './pages/main-pages/startup-page/startup-page.component';
import { WidgetPageComponent } from './pages/main-pages/widget-page/widget-page.component';
import { WidgetPageListComponent } from './pages/widget-pages/widget-page-list/widget-page-list.component';
import { WidgetPageNewComponent } from './pages/widget-pages/widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './pages/widget-pages/widget-page-packet/widget-page-packet.component';
import { PacketPageDraftComponent } from './pages/packet-pages/packet-page-draft/packet-page-draft.component';
import { PacketPageEndComponent } from './pages/packet-pages/packet-page-end/packet-page-end.component';
import { PacketPagePreviewComponent } from './pages/packet-pages/packet-page-preview/packet-page-preview.component';
import { PacketPagePrepareComponent } from './pages/packet-pages/packet-page-prepare/packet-page-prepare.component';

export const routes: Routes = [
  {
    path: '',
    component: StartupPageComponent,
    title: 'Nopaper - Инициализация',
  },
  { path: 'landing', component: LandingPageComponent },
  { path: 'notification', component: NotificationPageComponent },
  {
    path: 'widget',
    component: WidgetPageComponent,
    title: 'Главная',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      { path: 'list', component: WidgetPageListComponent },
      {
        path: 'new',
        component: WidgetPageNewComponent,
        title: 'Добавление документа',
      },
      {
        path: 'packet/:id',
        component: WidgetPagePacketComponent,
        title: TitleResolverService,
        children: [
          { path: 'draft', component: PacketPageDraftComponent },
          { path: 'prepare', component: PacketPagePrepareComponent },
          { path: 'preview', component: PacketPagePreviewComponent },
          { path: 'end', component: PacketPageEndComponent },
          { path: 'sender-sign', component: PacketPageSenderSignComponent },
          {
            path: 'receiver-preview',
            component: PacketPageReceiverPreviewComponent,
          },
        ],
      },
    ],
  },
];

const routingConfiguration: ExtraOptions = {
  // onSameUrlNavigation: 'reload',
  // paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
