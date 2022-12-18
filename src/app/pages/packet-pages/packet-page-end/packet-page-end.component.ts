import { RoutingService } from './../../../services/sub-services/routing.service';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import {
  filesIdsSignedOriginal,
  filesIdsSignedStamp,
} from './../../../store/signatures/selectors';
import { CommonLogicService } from './../../../services/common-logic.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSignInfoComponent } from 'src/app/components/organisms/modal-sign-info/modal-sign-info.component';

@Component({
  selector: 'app-packet-page-end',
  templateUrl: './packet-page-end.component.html',
  styleUrls: ['./packet-page-end.component.css'],
})
export class PacketPageEndComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;

  private packetId: number;
  protected isSignatureLoading: boolean = true;

  protected signedOriginalDocuments$ = this.store.select(
    filesIdsSignedOriginal
  );
  protected signedStampDocuments$ = this.store.select(filesIdsSignedStamp);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private nopaperService: NopaperService,
    private commonLogicService: CommonLogicService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);

    this.commonLogicService.getPacketFiles(this.packetId).subscribe();
  }

  protected showSignInfo(fileId: number): void {
    this.isSignatureLoading = true;
    this.nopaperService.getFileSignature(fileId).subscribe(() => {
      this.isSignatureLoading = false;
      this.signInfo.open();
    });
  }

  protected backButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }
}
