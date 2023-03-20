import { take } from 'rxjs';
import { NopaperApiService } from './../../../services/api/nopaper-api/nopaper-api.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TStatusLabelStatus } from '../../atoms/status-label/status-label.component';
import { downloadFile } from 'src/app/utils/download-file.util';

@Component({
  selector: 'app-documents-list-item',
  templateUrl: './documents-list-item.component.html',
  styleUrls: ['./documents-list-item.component.css'],
})
export class DocumentsListItemComponent {
  @Input() fileId?: number;
  @Input() file?: File;
  @Input() signStatus: TStatusLabelStatus | null = null;
  @Input() fileName?: string;
  @Output() showSignInfoEmitter = new EventEmitter<number>();

  private _file: File;

  constructor(private nopaperApiService: NopaperApiService) {}

  protected showSignInfo(): void {
    if (!this.fileId) {
      return;
    }

    this.showSignInfoEmitter.emit(this.fileId);
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
        .getFilesByIds([this.fileId])
        .pipe(take(1))
        .subscribe((files) => {
          this.file = files[0].file;
          downloadFile(this.file);
        });
    }
  }
}
