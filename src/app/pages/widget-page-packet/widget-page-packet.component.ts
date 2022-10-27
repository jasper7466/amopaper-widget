import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-page-packet',
  templateUrl: './widget-page-packet.component.html',
  styleUrls: ['./widget-page-packet.component.css'],
})
export class WidgetPagePacketComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public id: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public clickBackButtonHandler(): void {
    this.router.navigate(['widget/list']);
  }
}
