import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { packetStepNameSelector } from 'src/app/store/packets/selectors';

@Component({
  selector: 'app-widget-page-packet',
  templateUrl: './widget-page-packet.component.html',
  styleUrls: ['./widget-page-packet.component.css'],
})
export class WidgetPagePacketComponent implements OnInit, OnDestroy {
  protected packetId: number;
  private storedStepNameSubscription: Subscription;

  constructor(
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private nopaperService: NopaperService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.packetId = this.route.snapshot.params['id'];
    this.nopaperService.startPacketPolling(this.packetId);

    this.storedStepNameSubscription = this.store
      .select(packetStepNameSelector(this.packetId))
      .subscribe((stepName) => {
        this.routingService.goMatchedStepPacketPage(stepName, this.packetId);
      });
  }
  ngOnDestroy(): void {
    this.nopaperService.stopPacketsStepPollingAll();
    this.storedStepNameSubscription.unsubscribe();
  }
}
