import { NotificationPageComponent } from './pages/main-pages/notification-page/notification-page.component';
import { LandingPageComponent } from './pages/main-pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { StartupPageComponent } from './pages/main-pages/startup-page/startup-page.component';
import { WidgetPageComponent } from './pages/main-pages/widget-page/widget-page.component';
import { WidgetPageListComponent } from './pages/widget-pages/widget-page-list/widget-page-list.component';
import { WidgetPageNewComponent } from './pages/widget-pages/widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './pages/widget-pages/widget-page-packet/widget-page-packet.component';
import { PacketPageDraftComponent } from './pages/packet-pages/packet-page-draft/packet-page-draft.component';
import { PacketPageEndComponent } from './pages/packet-pages/packet-page-end/packet-page-end.component';

const routes: Routes = [
  { path: '', component: StartupPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'notification', component: NotificationPageComponent },
  {
    path: 'widget',
    component: WidgetPageComponent,
    children: [
      { path: 'list', component: WidgetPageListComponent },
      { path: 'new', component: WidgetPageNewComponent },
      {
        path: 'packet/:id',
        component: WidgetPagePacketComponent,
        children: [
          { path: 'draft', component: PacketPageDraftComponent },
          { path: 'end', component: PacketPageEndComponent },
        ],
      },
    ],
  },
];

const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
