import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { StatusLabelStatus } from 'src/app/components/common/status-label/status-label.component';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent implements OnInit {
  statusLabelStatus: StatusLabelStatus = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(stepNameSelector).subscribe((stepName) => {
      let labelStatus: StatusLabelStatus;

      switch (stepName) {
        case null:
        case 'new':
        case 'nopaperPreview':
        case 'nopaperPreviewBeforeOferta':
        case 'nopaperOfertaSenderPreview':
          labelStatus = 'draft';
          break;
        default:
          labelStatus = '';
      }

      this.statusLabelStatus = labelStatus;
    });
  }
}
