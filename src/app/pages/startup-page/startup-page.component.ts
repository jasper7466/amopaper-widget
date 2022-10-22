import { updateAccessTokenAction } from './../../store/access-token/actions';
import { updateCrmContextAction } from './../../store/crm-context/actions';
import { AmoApiService } from './../../services/api/amo/amo-api.service';
import { NopaperApiService } from '../../services/api/nopaper/nopaper-api.service';
import { CrmService } from '../../services/crm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import { NopaperService } from 'src/app/services/nopaper.service';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css'],
})
export class StartupPageComponent implements OnInit {
  constructor(
    private crmService: CrmService,
    private nopaperApiService: NopaperApiService,
    private nopaperService: NopaperService,
    private router: Router,
    private store: Store
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
        switchMap(() => this.crmService.getPacketFieldId$()),
        switchMap(() => this.crmService.getPacketId$()),
        switchMap(() => this.nopaperService.getStepName$())
      )
      .subscribe({
        next: () => this.router.navigate(['widget']),
        error: (err) => console.log(err),
      });
  }
}
