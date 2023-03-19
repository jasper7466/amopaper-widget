import { Component, Input } from '@angular/core';
import { TStatusLabelStatus } from 'src/app/components/atoms/status-label/status-label.component';
import { TStatusBannerStatus } from '../../atoms/status-banner/status-banner.component';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent {
  @Input() statusLabelStatus: TStatusLabelStatus | null = null;
  @Input() statusBannerStatus: TStatusBannerStatus | null = null;
  @Input() documentsCount: number | null = null;
}
