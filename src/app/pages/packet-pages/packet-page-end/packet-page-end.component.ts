import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSignInfoComponent } from 'src/app/components/modal-sign-info/modal-sign-info.component';

@Component({
  selector: 'app-packet-page-end',
  templateUrl: './packet-page-end.component.html',
  styleUrls: ['./packet-page-end.component.css'],
})
export class PacketPageEndComponent implements OnInit {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;

  constructor() {}

  ngOnInit(): void {}

  public showSignInfo(): void {
    this.signInfo.open();
  }
}
