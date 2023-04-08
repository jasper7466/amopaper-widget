import { RoutingService } from './../../../services/sub-services/routing.service';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { CommonLogicService } from './../../../services/common-logic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSignInfoComponent } from 'src/app/components/organisms/modal-sign-info/modal-sign-info.component';
import {
  filesIdsOriginalsSelector,
  filesIdsStampedSelector,
} from 'src/app/store/files-processed/selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-packet-page-end',
  templateUrl: './packet-page-end.component.html',
  styleUrls: ['./packet-page-end.component.css'],
})
export class PacketPageEndComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) private _signInfo: ModalSignInfoComponent;

  private _packetId: number;

  protected signedOriginalDocuments$ = this._store$.select(
    filesIdsOriginalsSelector
  );
  protected signedStampDocuments$ = this._store$.select(filesIdsStampedSelector);

  constructor(
    private _store$: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _nopaperService: NopaperService,
    private _commonLogicService: CommonLogicService,
    private _routingService: RoutingService
  ) {}

  public ngOnInit(): void {
    console.log(this._router.url);
    const id = this._route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this._packetId = parseInt(id);

    this._commonLogicService
      .getPacketFiles$(this._packetId)
      .pipe(take(1))
      .subscribe();
  }

  protected showSignInfo(fileId: number): void {
    this._nopaperService
      .getFileSignature$({ id: fileId })
      .pipe(take(1))
      .subscribe(() => {
        this._signInfo.open();
      });
  }

  protected backButtonHandler(): void {
    this._routingService.goPacketsListPage();
  }
}
