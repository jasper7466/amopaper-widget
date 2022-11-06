import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NopaperService } from 'src/app/services/nopaper.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-packet-page-draft',
  templateUrl: './packet-page-draft.component.html',
  styleUrls: ['./packet-page-draft.component.css'],
})
export class PacketPageDraftComponent implements OnInit {
  public id: number;

  constructor(
    private nopaperService: NopaperService,
    private routingService: RoutingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('Missing "id" parameter in parent path');
    }

    this.id = +id;
    this.nopaperService.getPacketFilesIds(this.id).subscribe();
  }

  public clickBackButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  public clickRemoveButton(): void {
    this.nopaperService.removeDraft(this.id).subscribe();
  }
}
