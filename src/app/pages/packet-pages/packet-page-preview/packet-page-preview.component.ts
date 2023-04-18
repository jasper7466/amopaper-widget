import { ActivatedRoute } from '@angular/router';
import { CommonLogicService } from './../../../services/common-logic.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { Observable, take, filter } from 'rxjs';
import { packetSelector } from 'src/app/store/packets/selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { openFile } from 'src/app/utils/open-file.util';
import {
    filesIdsOriginalsSelector,
    originalFilesSelector,
} from 'src/app/store/files-processed/selectors';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { clearSignaturesAction } from 'src/app/store/signatures/actions';

@Component({
    selector: 'app-packet-page-preview',
    templateUrl: './packet-page-preview.component.html',
    styleUrls: ['./packet-page-preview.component.css'],
})
export class PacketPagePreviewComponent implements OnInit, OnDestroy {
    private _packetId: number;
    protected isAwaiting = true;

    protected packet$: Observable<IPacketDetails>;
    protected filesIds$ = this._store$.select(filesIdsOriginalsSelector);
    protected originalFiles$ = this._store$.select(originalFilesSelector);

    constructor(
        private _store$: Store,
        private _routingService: RoutingService,
        private _commonLogicService: CommonLogicService,
        private _route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        const id = this._route.parent?.snapshot.paramMap.get('id');

        if (!id) {
            throw new Error('Missing "id" parameter in parent path');
        }

        this._packetId = parseInt(id);

        this.packet$ = this._store$.select(packetSelector(this._packetId));
        this._commonLogicService.getPacketFiles$(this._packetId).subscribe();

        this.originalFiles$
            .pipe(
                filter((files) => files.length > 0),
                take(1),
            )
            .subscribe(() => (this.isAwaiting = false));
    }

    public ngOnDestroy(): void {
        this._store$.dispatch(clearSignaturesAction());
    }

    protected submitButtonHandler(): void {
        this.isAwaiting = true;
        this._commonLogicService
            .submitPreview$(this._packetId)
            .pipe(take(1))
            .subscribe();
    }

    public cancelButtonHandler(): void {
        this._routingService.goPacketsListPage();
    }

    public revokeButtonHandler(): void {
        this._commonLogicService
            .revokePacket$(this._packetId)
            .pipe(take(1))
            .subscribe();
        this._routingService.goPacketsListPage();
    }

    protected downloadFile(file: File): void {
    // TODO: Open or download???
    // downloadFile(file);
        openFile(file);
    }
}
