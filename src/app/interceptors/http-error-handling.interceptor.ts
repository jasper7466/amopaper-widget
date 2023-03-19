import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { NotificationService } from '../services/sub-services/notification.service';

@Injectable()
export class HttpErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.error({
          title: error.name,
          details: `${error.message} / ${error.error.code || ''} / ${
            error.error.description || ''
          }`,
        });
        return throwError(() => error);
      })
    );
  }
}
