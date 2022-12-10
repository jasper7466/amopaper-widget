import { NopaperService } from 'src/app/services/nopaper.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packet-page-preview',
  templateUrl: './packet-page-preview.component.html',
  styleUrls: ['./packet-page-preview.component.css'],
})
export class PacketPagePreviewComponent implements OnInit {
  private id: number;

  constructor(
    private nopaperService: NopaperService,
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
}
