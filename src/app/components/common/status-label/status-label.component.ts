import { Component, Input, OnInit } from '@angular/core';

export type StatusLabelStatus =
  | 'unknown'
  | 'draft'
  | 'pending'
  | 'signed'
  | 'signed-single';

const statusCaptions: { [key in StatusLabelStatus]: string } = {
  unknown: 'Статус неизвестен',
  draft: 'Черновик',
  pending: 'Ожидают подписи',
  signed: 'Подписаны',
  'signed-single': 'Подписано',
};

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.css'],
})
export class StatusLabelComponent implements OnInit {
  @Input() status: StatusLabelStatus = 'unknown';

  public caption: string = 'Undefined';

  constructor() {}

  ngOnInit(): void {
    this.caption = statusCaptions[this.status];
  }
}
