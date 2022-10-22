import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @HostBinding('class.opened') isOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.isOpened = false;
  }

  open(): void {
    this.isOpened = true;
  }
}
