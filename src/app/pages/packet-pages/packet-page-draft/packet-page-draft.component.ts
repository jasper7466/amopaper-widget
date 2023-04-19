import { ActivatedRoute } from '@angular/router';
import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-packet-page-draft',
    templateUrl: './packet-page-draft.component.html',
    styleUrls: ['./packet-page-draft.component.css'],
})
export class PacketPageDraftComponent implements OnInit {
    private _packetId: number;
    protected isControlsEnabled = true;

    constructor(
        private _route: ActivatedRoute,
        private _commonLogicService: CommonLogicService,
        private _routingService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._route.parent?.paramMap.pipe(take(1)).subscribe(parameters => {
            const id = parameters.get('id');

            if (!id) {
                throw new Error('Missing "id" parameter in parent path');
            }

            this._packetId = parseInt(id);
        });
    }

    protected backButtonHandler(): void {
        this._routingService.goPacketsListPage();
    }

    protected removeButtonHandler(): void {
        this._commonLogicService.deletePacket$(this._packetId).pipe(take(1)).subscribe();
        this._routingService.goPacketsListPage();
    }

    protected submitDraftButtonHandler(): void {
        this.isControlsEnabled = false;
        this._commonLogicService
            .submitPacketDraft$(this._packetId)
            .pipe(take(1))
            .subscribe();
    }
}
