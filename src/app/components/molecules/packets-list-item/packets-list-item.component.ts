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
    @Input()
    public packet: IPacketDetails;

    constructor(
        private _routingService: RoutingService,
        private _nopaperService: NopaperService
    ) {}

    public ngOnChanges(): void {
        this._nopaperService.startPacketPolling(this.packet.id);
    }

    public ngOnDestroy(): void {
        this._nopaperService.stopPacketPolling(this.packet.id);
    }

    protected navigatePacketPage(): void {
        this._routingService.goPacketPage(this.packet.id);
    }
}
