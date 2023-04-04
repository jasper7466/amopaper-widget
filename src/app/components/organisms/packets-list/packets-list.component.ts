import { Component, Input } from '@angular/core';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

@Component({
  selector: 'app-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrls: ['./packets-list.component.css'],
})
export class PacketsListComponent {
  @Input() public packets: IPacketDetails[];
}
