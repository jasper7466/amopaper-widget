import { shareLinkSelector } from './../../../store/misc/selectors';
import { packetSelector } from 'src/app/store/packets/selectors';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { Component, OnInit } from '@angular/core';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

@Component({
  selector: 'app-packet-page-sender-sign',
  templateUrl: './packet-page-sender-sign.component.html',
  styleUrls: ['./packet-page-sender-sign.component.css'],
})
export class PacketPageSenderSignComponent implements OnInit {
  protected packetId: number;
  protected packet$: Observable<IPacketDetails>;

  constructor(
    private store: Store,
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
  }

  protected backButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }
}
