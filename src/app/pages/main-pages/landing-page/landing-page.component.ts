import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/sub-services/routing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private _routingService: RoutingService) {}

  ngOnInit(): void {
    this._routingService.redirect('https://nopaper.ru');
  }
}
