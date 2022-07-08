import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-sign-info',
  templateUrl: './modal-sign-info.component.html',
  styleUrls: ['./modal-sign-info.component.css'],
})
export class ModalSignInfoComponent implements OnInit {
  // isOpened: boolean = true;
  @HostBinding('class.opened') isOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onClose(): void {
    this.isOpened = false;
  }
}
