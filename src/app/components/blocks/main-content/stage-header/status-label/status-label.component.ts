import { Component, Input, OnInit } from '@angular/core';

type status = 'draft' | 'pending' | 'signed' | 'signed-single';

const statusCaptions: { [key in status]: string } = {
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
  @Input() status: status = 'draft';

  public caption: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.caption = statusCaptions[this.status];
  }
}
