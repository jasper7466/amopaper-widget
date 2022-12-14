import { RoutingService } from 'src/app/services/routing.service';
import {
  decodedFilesSelector,
  filesIdentifiersSelector,
} from './../../../store/signatures/selectors';
import { Observable, tap, switchMap, take, takeWhile, filter } from 'rxjs';
import { packetSelector } from 'src/app/store/packets/selectors';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/nopaper.service';
import { ActivatedRoute } from '@angular/router';
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
    private nopaperService: NopaperService,
    private routingService: RoutingService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);
    this.packet$ = this.store.select(packetSelector(this.packetId));

    this.nopaperService.getPacketFiles(this.packetId).subscribe();

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

  protected submitPreviewButtonHandler(): void {
    this.isAwaiting = true;
    this.nopaperService.submitPreview(this.packetId).subscribe();
  }

  public cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  public removeButtonHandler(): void {
    this.nopaperService.removeDraft(this.packetId).subscribe();
    this.routingService.goPacketsListPage();
  }
}
