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
  private packetId: number;
  protected isAwaiting: boolean = true;

  protected packet$: Observable<IPacketDetails>;
  protected filesIds$ = this.store.select(filesIdsOriginalsSelector);
  protected originalFiles$ = this.store.select(originalFilesSelector);

  constructor(
    private store: Store,
    private routingService: RoutingService,
    private commonLogicService: CommonLogicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);

    this.packet$ = this.store.select(packetSelector(this.packetId));
    this.commonLogicService.getPacketFiles(this.packetId).subscribe();

    this.originalFiles$
      .pipe(
        filter((files) => files.length > 0),
        take(1)
      )
      .subscribe(() => (this.isAwaiting = false));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSignaturesAction());
  }

  protected submitButtonHandler(): void {
    this.isAwaiting = true;
    this.commonLogicService
      .submitPreview(this.packetId)
      .pipe(take(1))
      .subscribe();
  }

  public cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  public revokeButtonHandler(): void {
    this.commonLogicService
      .revokePacket(this.packetId)
      .pipe(take(1))
      .subscribe();
    this.routingService.goPacketsListPage();
  }

  protected downloadFile(file: File) {
    // TODO: Open or download???
    // downloadFile(file);
    openFile(file);
  }
}
