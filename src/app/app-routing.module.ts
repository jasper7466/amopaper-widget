import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupPageComponent } from './pages/startup-page/startup-page.component';
import { WidgetPageComponent } from './pages/widget-page/widget-page.component';
import { WidgetPageListComponent } from './pages/widget-page-list/widget-page-list.component';
import { WidgetPageNewComponent } from './pages/widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './pages/widget-page-packet/widget-page-packet.component';
import { PacketPageDraftComponent } from './pages/packet-page-draft/packet-page-draft.component';

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
        children: [{ path: 'draft', component: PacketPageDraftComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
