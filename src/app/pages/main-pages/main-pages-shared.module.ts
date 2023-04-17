import { RouterModule } from '@angular/router';
import { ComponentsSharedModule } from '../../components/components-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { StartupPageComponent } from './startup-page/startup-page.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';

@NgModule({
    declarations: [
        LandingPageComponent,
        NotificationPageComponent,
        StartupPageComponent,
        WidgetPageComponent,
    ],
    imports: [CommonModule, ComponentsSharedModule, RouterModule],
    exports: [
        LandingPageComponent,
        NotificationPageComponent,
        StartupPageComponent,
        WidgetPageComponent,
    ],
})
export class MainPagesSharedModule {}
