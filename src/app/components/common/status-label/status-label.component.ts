import { Component, Input, OnInit } from '@angular/core';

export type StatusLabelStatus =
  | 'draft'
  | 'pending'
  | 'signed'
  | 'signed-single'
  | '';

const statusCaptions: { [key in StatusLabelStatus]: string } = {
  draft: 'Черновик',
  pending: 'Ожидают подписи',
  signed: 'Подписаны',
  'signed-single': 'Подписано',
  '': 'Undefined',
};

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.css'],
})
export class StatusLabelComponent implements OnInit {
  @Input() status: StatusLabelStatus = '';

  public caption: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.caption = statusCaptions[this.status];
  }
}
