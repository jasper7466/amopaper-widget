import { NopaperApiService } from './../../services/nopaper-api.service';
import { CrmService } from '../../services/crm.service';
import {
  OutboxRequests,
  InboxResponses,
} from '../../../types/crm-messages.types';
import { PostMessageService } from '../../services/post-message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, flatMap, switchMap } from 'rxjs';

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
    if (this.crmService.isTopWindow()) {
      this.router.navigate(['landing']);
    } else {
      this.crmService.getCrmContext$
        .pipe(
          switchMap(() => this.nopaperApiService.getAmoToken$),
          delay(800)
        )
        .subscribe(() => this.router.navigate(['widget']));
    }
  }
}
