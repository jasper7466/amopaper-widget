import { Component, Input, OnInit } from '@angular/core';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

@Component({
  selector: 'app-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrls: ['./packets-list.component.css'],
})
export class PacketsListComponent implements OnInit {
  @Input() packets: IPacketDetails[];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
