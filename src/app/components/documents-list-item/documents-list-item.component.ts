import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NopaperService } from 'src/app/services/nopaper.service';
import { StatusLabelStatus } from '../common/status-label/status-label.component';

@Component({
  selector: 'app-documents-list-item',
  templateUrl: './documents-list-item.component.html',
  styleUrls: ['./documents-list-item.component.css'],
})
export class DocumentsListItemComponent implements OnInit {
  @Input() fileId?: number = 0;
  @Input() signStatus: StatusLabelStatus | null = null;
  @Input() fileName: string = 'unnamed';
  @Output() onShowSignInfo = new EventEmitter<void>();

  constructor(private nopaperService: NopaperService) {}

  showSignInfo(): void {
    if (!this.fileId) {
      return;
    }

    this.nopaperService.getFileSignature(this.fileId).subscribe(() => {
      this.onShowSignInfo.emit();
    });
  }

  ngOnInit(): void {}
}
