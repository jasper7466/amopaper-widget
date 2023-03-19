import { NotificationService } from 'src/app/services/sub-services/notification.service';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/sub-services/routing.service';

@Component({
  selector: 'app-notify-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css'],
})
export class NotificationPageComponent {
  protected context = this.notificationService.context;

  constructor(
    private notificationService: NotificationService,
    private routingService: RoutingService
  ) {}

  protected reset() {
    this.routingService.goStartupPage();
  }
}
