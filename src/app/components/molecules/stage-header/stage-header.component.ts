import { Component, Input } from '@angular/core';
import { TStatusLabelStatus } from 'src/app/components/atoms/status-label/status-label.component';
import { TStatusBannerStatus } from '../../atoms/status-banner/status-banner.component';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent {
  @Input() public statusLabelStatus: TStatusLabelStatus | null = null;
  @Input() public statusBannerStatus: TStatusBannerStatus | null = null;
  @Input() public documentsCount: number | null = null;
}
