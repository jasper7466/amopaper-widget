import { Component, Input, OnInit } from '@angular/core';

export type StatusBannerStatus = 'pending' | 'signed' | '';

@Component({
  selector: 'app-status-banner',
  templateUrl: './status-banner.component.html',
  styleUrls: ['./status-banner.component.css'],
})
export class StatusBannerComponent implements OnInit {
  @Input() status: StatusBannerStatus | null = null;
  constructor() {}

  ngOnInit(): void {}
}
