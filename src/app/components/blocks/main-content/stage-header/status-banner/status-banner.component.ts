import { Component, Input, OnInit } from '@angular/core';

type status = 'pending' | 'signed' | '';

@Component({
  selector: 'app-status-banner',
  templateUrl: './status-banner.component.html',
  styleUrls: ['./status-banner.component.css'],
})
export class StatusBannerComponent implements OnInit {
  @Input() status: status = '';
  constructor() {}

  ngOnInit(): void {}
}
