import { NopaperService } from 'src/app/services/nopaper.service';
import { CrmService } from '../../../services/crm.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css'],
})
export class StartupPageComponent implements OnInit {
  constructor(
    private crmService: CrmService,
    private nopaperService: NopaperService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    if (window.location === window.parent.location) {
      this.routingService.goLandingPage();
      return;
    }

    this.crmService
      .getCrmContext$()
      .pipe(
        switchMap(() => this.nopaperService.getAmoAccessToken()),
        switchMap(() => this.crmService.getPacketsFieldId())
      )
      .subscribe({
        next: () => this.routingService.goPacketsListPage(),
        error: (err) => console.log(err),
      });
  }
}
