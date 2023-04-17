import { NotificationService } from 'src/app/services/sub-services/notification.service';
import { Component } from '@angular/core';
import { RoutingService } from 'src/app/services/sub-services/routing.service';

@Component({
    selector: 'app-notify-page',
    templateUrl: './notification-page.component.html',
    styleUrls: ['./notification-page.component.css'],
})
export class NotificationPageComponent {
    protected context = this._notificationService.context;

    constructor(
        private _notificationService: NotificationService,
        private _routingService: RoutingService
    ) {}

    protected reset(): void {
        this._routingService.goStartupPage();
    }
}
