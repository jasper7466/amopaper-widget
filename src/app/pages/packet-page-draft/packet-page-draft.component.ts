import { Component } from '@angular/core';
import { NopaperService } from 'src/app/services/nopaper.service';

@Component({
  selector: 'app-packet-page-draft',
  templateUrl: './packet-page-draft.component.html',
  styleUrls: ['./packet-page-draft.component.css'],
})
export class PacketPageDraftComponent {
  constructor(private nopaperService: NopaperService) {}

  public removeDraft(): void {
    // this.nopaperService.removeDraft();
  }
}
