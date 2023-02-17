import { filesIdsOriginalsSelector } from './../../../store/signatures/selectors';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { ModalSignInfoComponent } from 'src/app/components/organisms/modal-sign-info/modal-sign-info.component';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { CommonLogicService } from './../../../services/common-logic.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-packet-page-receiver-preview',
  templateUrl: './packet-page-receiver-preview.component.html',
  styleUrls: ['./packet-page-receiver-preview.component.css'],
})
export class PacketPageReceiverPreviewComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;

  private packetId: number;

  protected signedOriginalDocuments$ = this.store.select(
    filesIdsOriginalsSelector
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private nopaperService: NopaperService,
    private routingService: RoutingService,
    private commonLogicService: CommonLogicService
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
    this.nopaperService.getFileSignature(fileId).subscribe(() => {
      this.signInfo.open();
    });
  }

  protected backButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  protected revokeButtonHandler(): void {
    this.commonLogicService
      .revokePacket(this.packetId)
      .subscribe(() => this.routingService.goPacketsListPage());
  }
}
