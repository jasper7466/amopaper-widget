import { Component, Input } from '@angular/core';

export type TStatusBannerStatus = 'pending' | 'signed' | '';

@Component({
    selector: 'app-status-banner',
    templateUrl: './status-banner.component.html',
    styleUrls: ['./status-banner.component.css'],
})
export class StatusBannerComponent {
    @Input()
    public status: TStatusBannerStatus | null = null;
}
