import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/sub-services/notification.service';

@Injectable()
export class HttpErrorHandlingInterceptor implements HttpInterceptor {
    constructor(private _notificationService: NotificationService) {}

    public intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: HttpRequest<any>,
        next: HttpHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this._notificationService.error({
                    title: error.name,
                    details: `${error.message} / ${error.error.code || ''} / ${
                        error.error.description || ''
                    }`,
                });
                return throwError(() => error);
            }),
        );
    }
}
