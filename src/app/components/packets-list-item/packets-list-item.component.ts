import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NopaperService } from 'src/app/services/nopaper.service';
import { StatusLabelStatus } from '../common/status-label/status-label.component';

@Component({
  selector: 'app-packets-list-item',
  templateUrl: './packets-list-item.component.html',
  styleUrls: ['./packets-list-item.component.css'],
})
export class PacketsListItemComponent implements OnInit {
  @Input() packetId: number;
  @Input() status: StatusLabelStatus = 'unknown';

  constructor(private router: Router, private nopaperService: NopaperService) {}

  ngOnInit(): void {}

  public navigatePacketPage(): void {
    this.router.navigate(['widget/packet', this.packetId]);
  }
}
