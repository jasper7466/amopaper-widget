import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { ModalSignInfoComponent } from 'src/app/components/organisms/modal-sign-info/modal-sign-info.component';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { CommonLogicService } from './../../../services/common-logic.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filesIdsOriginalsSelector } from 'src/app/store/files-processed/selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-packet-page-receiver-preview',
  templateUrl: './packet-page-receiver-preview.component.html',
  styleUrls: ['./packet-page-receiver-preview.component.css'],
})
export class PacketPageReceiverPreviewComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) private _signInfo: ModalSignInfoComponent;

  private _packetId: number;

  protected signedOriginalDocuments$ = this._store.select(
    filesIdsOriginalsSelector
  );

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _nopaperService: NopaperService,
    private _routingService: RoutingService,
    private _commonLogicService: CommonLogicService
  ) {}

  public ngOnInit(): void {
    const id = this._route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this._packetId = parseInt(id);

    this._commonLogicService
      .getPacketFiles(this._packetId)
      .pipe(take(1))
      .subscribe();
  }

  protected showSignInfo(fileId: number): void {
    this._nopaperService
      .getFileSignature({ id: fileId })
      .pipe(take(1))
      .subscribe(() => {
        this._signInfo.open();
      });
  }

  protected backButtonHandler(): void {
    this._routingService.goPacketsListPage();
  }

  protected revokeButtonHandler(): void {
    this._commonLogicService
      .revokePacket(this._packetId)
      .pipe(take(1))
      .subscribe(() => this._routingService.goPacketsListPage());
  }
}
