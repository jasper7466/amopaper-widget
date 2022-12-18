import { ActivatedRoute } from '@angular/router';
import { CommonLogicService } from './../../../services/common-logic.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import {
  decodedFilesSelector,
  filesIdentifiersSelector,
} from './../../../store/signatures/selectors';
import { Observable, take, filter } from 'rxjs';
import { packetSelector } from 'src/app/store/packets/selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPacket } from 'src/app/store/packets';
import { clearFilesAction } from 'src/app/store/signatures/actions';

@Component({
  selector: 'app-packet-page-preview',
  templateUrl: './packet-page-preview.component.html',
  styleUrls: ['./packet-page-preview.component.css'],
})
export class PacketPagePreviewComponent implements OnInit, OnDestroy {
  private packetId: number;
  protected isAwaiting: boolean = true;

  protected packet$: Observable<IPacket>;
  protected filesIds$ = this.store.select(filesIdentifiersSelector);
  protected decodedFiles$ = this.store.select(decodedFilesSelector);

  constructor(
    private store: Store,
    private routingService: RoutingService,
    private commonLogicService: CommonLogicService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);

    this.packet$ = this.store.select(packetSelector(this.packetId));
    this.commonLogicService.getPacketFiles(this.packetId).subscribe();

    this.decodedFiles$
      .pipe(
        filter((files) => files.length > 0),
        take(1)
      )
      .subscribe(() => (this.isAwaiting = false));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(clearFilesAction());
  }

  protected submitButtonHandler(): void {
    this.isAwaiting = true;
    this.commonLogicService.submitPreview(this.packetId).subscribe();
  }

  public cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  public removeButtonHandler(): void {
    this.commonLogicService.deletePacket(this.packetId).subscribe();
    this.routingService.goPacketsListPage();
  }
}
