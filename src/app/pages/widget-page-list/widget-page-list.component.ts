import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { StatusLabelStatus } from 'src/app/components/common/status-label/status-label.component';
import { NopaperApiService } from 'src/app/services/api/nopaper/nopaper-api.service';
import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';
import { CrmService } from 'src/app/services/crm.service';
import { NopaperService } from 'src/app/services/nopaper.service';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import {
  packetsIdsSelector,
  packetsListSelector,
} from 'src/app/store/packets-list/selectors';

@Component({
  selector: 'app-widget-page-list',
  templateUrl: './widget-page-list.component.html',
  styleUrls: ['./widget-page-list.component.css'],
})
export class WidgetPageListComponent implements OnInit, OnDestroy {
  public leadId$ = this.store.select(leadIdSelector);
  public packets$ = this.store.select(packetsListSelector);
  private packetsIds$ = this.store.select(packetsIdsSelector);

  constructor(
    private store: Store,
    private crmService: CrmService,
    private router: Router,
    private nopaperService: NopaperService
  ) {}

  public packetClick(): void {}

  ngOnInit(): void {
    this.crmService.startPacketsPolling();
    this.packetsIds$.subscribe((packets) => {
      this.nopaperService.stopPacketsStepPollingAll();
      for (const id of packets) {
        console.log('subscription packet polling ', id);
        this.nopaperService.startPacketStepPolling(id);
      }
    });

    this.packets$.subscribe(() => console.log('packets list EMITTED'));
  }

  ngOnDestroy(): void {
    this.crmService.stopPacketsPolling();
    this.nopaperService.stopPacketsStepPollingAll();
  }
}
