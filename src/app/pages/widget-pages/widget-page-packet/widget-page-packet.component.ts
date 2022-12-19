import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private routingService: RoutingService,
    private nopaperService: NopaperService
  ) {
    router.events.forEach((event) => {
      if (
        event instanceof NavigationStart &&
        event.navigationTrigger === 'popstate'
      ) {
        this.routingService.goPacketsListPage();
      }
    });
  }

  ngOnInit(): void {
    this.packetId = this.route.snapshot.params['id'];
    this.nopaperService.startPacketPolling(this.packetId);

    this.nopaperService.getPacketStepName(this.packetId).subscribe(() => {
      this.storedStepNameSubscription = this.store
        .select(packetStepNameSelector(this.packetId))
        .subscribe((stepName) => {
          this.routingService.goMatchedStepPacketPage(stepName, this.packetId);
        });
    });
  }
  ngOnDestroy(): void {
    this.nopaperService.stopPacketsStepPollingAll();
    this.storedStepNameSubscription.unsubscribe();
  }
}
