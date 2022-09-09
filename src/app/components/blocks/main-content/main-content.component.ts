import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  stepName: StepName | null;
  isAwaiting: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(stepNameSelector).subscribe((stepName) => {
      switch (stepName) {
        case 'new':
        case 'nopaperPreview':
        case 'nopaperPreviewBeforeOferta':
        case 'nopaperOfertaSenderPreview':
          this.isAwaiting = true;
          break;
        default:
          this.isAwaiting = false;
      }

      this.stepName = stepName;
    });
  }
}
