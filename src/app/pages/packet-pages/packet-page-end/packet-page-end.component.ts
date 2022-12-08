import { NopaperService } from 'src/app/services/nopaper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSignInfoComponent } from 'src/app/components/organisms/modal-sign-info/modal-sign-info.component';

@Component({
  selector: 'app-packet-page-end',
  templateUrl: './packet-page-end.component.html',
  styleUrls: ['./packet-page-end.component.css'],
})
export class PacketPageEndComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;

  constructor(private nopaperService: NopaperService) {}

  ngOnInit(): void {
    this.nopaperService.getPacketFilesIds;
  }

  public showSignInfo(): void {
    this.signInfo.open();
  }
}
