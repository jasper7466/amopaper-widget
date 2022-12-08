import { RoutingService } from 'src/app/services/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packet-page-prepare',
  templateUrl: './packet-page-prepare.component.html',
  styleUrls: ['./packet-page-prepare.component.css'],
})
export class PacketPagePrepareComponent implements OnInit {
  constructor(private routingService: RoutingService) {}

  ngOnInit(): void {}

  public backButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }
}
