import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CrmService } from 'src/app/services/sub-services/crm.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import {
  packetsIsTouchedSelector,
  packetsSelector,
} from 'src/app/store/packets/selectors';

@Component({
  selector: 'app-widget-page-list',
  templateUrl: './widget-page-list.component.html',
  styleUrls: ['./widget-page-list.component.css'],
})
export class WidgetPageListComponent implements OnInit, OnDestroy {
  protected leadId$ = this.store.select(leadIdSelector);
  protected packets$ = this.store.select(packetsSelector);
  protected isPacketsIdsTouched$ = this.store.select(packetsIsTouchedSelector);

  constructor(
    private store: Store,
    private crmService: CrmService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.crmService.startJsonStoragePolling();
  }

  ngOnDestroy(): void {
    this.crmService.stopJsonStoragePolling();
  }

  protected clickCreateNewButtonHandler(): void {
    this.routingService.goCreatePage();
  }
}
