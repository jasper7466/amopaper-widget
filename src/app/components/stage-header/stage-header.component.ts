import { Component, Input } from '@angular/core';
import { StatusLabelStatus } from 'src/app/components/common/status-label/status-label.component';
import { StatusBannerStatus } from '../status-banner/status-banner.component';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent {
  @Input() statusLabelStatus: StatusLabelStatus | null = null;
  @Input() statusBannerStatus: StatusBannerStatus | null = null;
  @Input() documentsCount: number | null = null;

  constructor() {}
}
