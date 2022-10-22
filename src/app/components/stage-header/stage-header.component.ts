import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { StatusLabelStatus } from 'src/app/components/common/status-label/status-label.component';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';
import { StatusBannerStatus } from '../status-banner/status-banner.component';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent implements OnInit, OnDestroy {
  statusLabelStatus: StatusLabelStatus = '';
  statusBannerStatus: StatusBannerStatus = '';

  private subscription: Subscription;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(stepNameSelector)
      .subscribe((stepName) => {
        switch (stepName) {
          case null:
          case 'new':
          case 'nopaperPreview':
          case 'nopaperPreviewBeforeOferta':
          case 'nopaperOfertaSenderPreview':
            this.statusLabelStatus = 'draft';
            break;
          case 'nopaperReceiverPreview':
          case 'nopaperReceiverPreviewBeforeOferta':
          case 'nopaperReceiverSigning':
            this.statusLabelStatus = 'pending';
            this.statusBannerStatus = 'pending';
            break;
          case 'nopaperEnd':
            this.statusLabelStatus = 'signed';
            this.statusBannerStatus = 'signed';
            break;
          default:
            this.statusLabelStatus = '';
            this.statusLabelStatus = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
