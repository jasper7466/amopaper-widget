import { NotificationService } from 'src/app/services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css'],
})
export class NotificationPageComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}
  context = this.notificationService.context;

  ngOnInit(): void {}
}
