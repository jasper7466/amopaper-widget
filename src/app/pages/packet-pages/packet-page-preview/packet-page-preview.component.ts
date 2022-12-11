import {
  filesIdentifiersSelector,
  filesSelector,
} from './../../../store/signatures/selectors';
import { first, Observable, take, tap, switchMap } from 'rxjs';
import { packetSelector } from 'src/app/store/packets/selectors';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/nopaper.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IPacket } from 'src/app/store/packets';

@Component({
  selector: 'app-packet-page-preview',
  templateUrl: './packet-page-preview.component.html',
  styleUrls: ['./packet-page-preview.component.css'],
})
export class PacketPagePreviewComponent implements OnInit {
  private packetId: number;

  protected packet$: Observable<IPacket>;
  protected filesIds$ = this.store.select(filesIdentifiersSelector);
  protected files$ = this.store.select(filesSelector);

  constructor(
    private store: Store,
    private nopaperService: NopaperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);

    this.packet$ = this.store.select(packetSelector(this.packetId));
    this.nopaperService.getPacketFiles(this.packetId).subscribe();
  }
}
