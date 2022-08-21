import { notification, NotificationService } from './notification.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { AmoApiService } from './amo-api.service';
import { CrmService } from './crm.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notifications } from '../constants/notifications';

@Injectable({
  providedIn: 'root',
})
export class NopaperApiService {
  private x_api_key: string | null = null;

  constructor(
    private http: HttpClient,
    private crmService: CrmService,
    private amoApiService: AmoApiService,
    private notificationService: NotificationService
  ) {}

  get getAmoToken$() {
    const subdomain = this.crmService.context?.system.subdomain;
    const x_api_key = this.crmService.context?.settings.x_api_key;
    return this.http
      .post<{ access_token: string }>('http://localhost:5200/access_token', {
        x_api_key,
        subdomain,
      })
      .pipe(
        tap(
          (response) => (this.amoApiService.accessToken = response.access_token)
        ),
        catchError(() => {
          this.notificationService.notify(
            notifications['nopaperApiRequestFailed']
          );
          return EMPTY;
        })
      );
  }
}
