import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';

@Component({
  selector: 'app-packets-list-item',
  templateUrl: './packets-list-item.component.html',
  styleUrls: ['./packets-list-item.component.css'],
})
export class PacketsListItemComponent implements OnDestroy, OnChanges {
  @Input() packet: IPacketDetails;

  constructor(
    private routingService: RoutingService,
    private nopaperService: NopaperService
  ) {}

  ngOnChanges(): void {
    this.nopaperService.startPacketPolling(this.packet.id);
  }

  ngOnDestroy(): void {
    this.nopaperService.stopPacketPolling(this.packet.id);
  }

  protected navigatePacketPage(): void {
    this.routingService.goPacketPage(this.packet.id);
  }
}
