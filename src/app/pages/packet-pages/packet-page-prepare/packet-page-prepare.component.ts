import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-packet-page-prepare',
    templateUrl: './packet-page-prepare.component.html',
    styleUrls: ['./packet-page-prepare.component.css'],
})
export class PacketPagePrepareComponent {
    constructor(private _routingService: RoutingService) {}

    public backButtonHandler(): void {
        this._routingService.goPacketsListPage();
    }
}
