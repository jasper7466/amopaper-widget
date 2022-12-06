import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

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
export class StatusLabelComponent implements OnChanges {
  @Input() status: StatusLabelStatus = 'unknown';

  public caption: string = 'Undefined';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.caption = statusCaptions[this.status];
  }
}
