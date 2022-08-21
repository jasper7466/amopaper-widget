import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type notification = {
  type: 'error' | 'info';
  title: string;
  details: string;
  hint: string;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  context: notification;

  constructor(private router: Router) {
    this.context = {
      type: 'info',
      title: 'undefined',
      details: 'undefined',
      hint: 'undefined',
    };
  }

  navigate() {
    this.router.navigate(['notification']);
  }

  error(context: Omit<notification, 'type'>) {
    this.context = {
      type: 'error',
      ...context,
    };
    this.navigate();
  }

  info(context: Omit<notification, 'type'>) {
    this.context = {
      type: 'info',
      ...context,
    };
    this.navigate();
  }

  notify(context: notification) {
    this.context = context;
    this.navigate();
  }
}
