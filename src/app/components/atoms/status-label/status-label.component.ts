import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type TStatusLabelStatus =
  | 'unknown'
  | 'draft'
  | 'sign'
  | 'sign-offer'
  | 'pending'
  | 'signed'
  | 'signed-single';

const statusCaptions: { [key in TStatusLabelStatus]: string } = {
  unknown: 'Статус неизвестен',
  draft: 'Черновик',
  sign: 'Подпишите',
  'sign-offer': 'Оферта на подпись',
  pending: 'Ожидают подписи',
  signed: 'Подписаны',
  'signed-single': 'Подписано',
};

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.css'],
})
export class StatusLabelComponent implements OnChanges {
  @Input() status: TStatusLabelStatus = 'unknown';

  public caption: string = 'Undefined';

  ngOnChanges(changes: SimpleChanges): void {
    this.caption = statusCaptions[this.status];
  }
}
