import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupPageComponent } from './pages/startup-page/startup-page.component';
import { WidgetPageComponent } from './pages/widget-page/widget-page.component';

const routes: Routes = [
  { path: '', component: StartupPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'widget', component: WidgetPageComponent },
  { path: 'notification', component: NotificationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
