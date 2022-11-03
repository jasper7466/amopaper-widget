import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/nopaper.service';
import { RoutingService } from 'src/app/services/routing.service';
import { packetStepNameSelector } from 'src/app/store/packets-list/selectors';

@Component({
  selector: 'app-widget-page-packet',
  templateUrl: './widget-page-packet.component.html',
  styleUrls: ['./widget-page-packet.component.css'],
})
export class WidgetPagePacketComponent implements OnInit, OnDestroy {
  public packetId: number;

  constructor(
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private nopaperService: NopaperService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.packetId = this.route.snapshot.params['id'];
    this.nopaperService.startPacketPolling(this.packetId);

    this.store
      .select(packetStepNameSelector(this.packetId))
      .subscribe((stepName) => {
        this.routingService.goMatchedStepPacketPage(stepName, this.packetId);
      });
  }
  ngOnDestroy(): void {
    this.nopaperService.stopPacketsStepPollingAll();
  }
}
