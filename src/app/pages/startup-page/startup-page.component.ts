import { NopaperApiService } from '../../services/api/nopaper/nopaper-api.service';
import { CrmService } from '../../services/crm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css'],
})
export class StartupPageComponent implements OnInit {
  constructor(
    private crmService: CrmService,
    private nopaperApiService: NopaperApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.location === window.parent.location) {
      this.router.navigate(['landing']);
      return;
    }

    this.crmService
      .getCrmContext$()
      .pipe(
        switchMap(() => this.nopaperApiService.getAmoToken$()),
        switchMap(() => this.crmService.getPacketFieldId$())
        // switchMap(() => this.crmService.getPacketId$()),
        // switchMap(() => this.nopaperService.getStepName$())
      )
      .subscribe({
        next: () => this.router.navigate(['widget/list']),
        error: (err) => console.log(err),
      });
  }
}
