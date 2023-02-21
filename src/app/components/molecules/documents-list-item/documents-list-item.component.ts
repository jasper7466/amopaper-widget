import { take, switchMap } from 'rxjs';
import { NopaperApiService } from './../../../services/api/nopaper-api/nopaper-api.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusLabelStatus } from '../../atoms/status-label/status-label.component';
import { downloadFile } from 'src/app/utils/download-file.util';
import { base64ToFile } from 'src/app/utils/base64-to-file.util';

@Component({
  selector: 'app-documents-list-item',
  templateUrl: './documents-list-item.component.html',
  styleUrls: ['./documents-list-item.component.css'],
})
export class DocumentsListItemComponent {
  @Input() fileId?: number;
  @Input() file?: File;
  @Input() signStatus: StatusLabelStatus | null = null;
  @Input() fileName?: string;
  @Output() onShowSignInfo = new EventEmitter<number>();

  private _file: File;

  constructor(private nopaperApiService: NopaperApiService) {}

  protected showSignInfo(): void {
    if (!this.fileId) {
      return;
    }

    this.onShowSignInfo.emit(this.fileId);
  }

  protected plateClick(): void {
    if (this.file) {
      downloadFile(this.file);
      return;
    }

    if (this._file) {
      downloadFile(this._file);
      return;
    }

    if (this.fileId) {
      this.nopaperApiService
        .getFilesByIds([{ id: this.fileId }])
        .pipe(take(1))
        .subscribe((file) => {
          this.file = file;
          downloadFile(file);
        });
    }
  }
}
