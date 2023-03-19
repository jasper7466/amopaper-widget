import { ActivatedRoute } from '@angular/router';
import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-packet-page-draft',
  templateUrl: './packet-page-draft.component.html',
  styleUrls: ['./packet-page-draft.component.css'],
})
export class PacketPageDraftComponent implements OnInit {
  private packetId: number;
  protected isControlsEnabled = true;

  constructor(
    private route: ActivatedRoute,
    private commonLogicService: CommonLogicService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.packetId = parseInt(id);
  }

  protected backButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  protected removeButtonHandler(): void {
    this.commonLogicService
      .deletePacket(this.packetId)
      .pipe(take(1))
      .subscribe();
    this.routingService.goPacketsListPage();
  }

  protected submitDraftButtonHandler(): void {
    this.isControlsEnabled = false;
    this.commonLogicService
      .submitPacketDraft(this.packetId)
      .pipe(take(1))
      .subscribe();
  }
}
