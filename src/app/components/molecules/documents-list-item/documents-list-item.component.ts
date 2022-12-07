import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusLabelStatus } from '../../atoms/status-label/status-label.component';

@Component({
  selector: 'app-documents-list-item',
  templateUrl: './documents-list-item.component.html',
  styleUrls: ['./documents-list-item.component.css'],
})
export class DocumentsListItemComponent {
  @Input() fileId?: number;
  @Input() signStatus: StatusLabelStatus | null = null;
  @Input() fileName: string = 'unnamed';
  @Output() onShowSignInfo = new EventEmitter<number>();

  constructor() {}

  protected showSignInfo(): void {
    if (!this.fileId) {
      return;
    }

    this.onShowSignInfo.emit(this.fileId);
  }
}
