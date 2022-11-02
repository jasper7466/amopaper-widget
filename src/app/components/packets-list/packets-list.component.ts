import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrls: ['./packets-list.component.css'],
})
export class PacketsListComponent implements OnInit {
  @Input() packetsIds: number[];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
