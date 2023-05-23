import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export class ApiService {
    private _baseUrl: string;
    private _headers = new HttpHeaders();

    constructor(private _http: HttpClient) {}

    protected set baseUrl(url: string) {
        this._baseUrl = url;
    }

    protected resetHeaders(headers: { [key: string]: string | string[] }): void {
        this._headers = new HttpHeaders();
        this.setHeaders(headers);
    }

    protected setHeaders(headers: { [key: string]: string | string[] }): void {
        for (const [
            header,
            value,
        ] of Object.entries(headers)) {
            this._headers = this._headers.set(header, value);
        }
    }

    protected httpErrorHandler(error: HttpErrorResponse): never {
        throw error;
    }

    protected get$<Response>(path: string): Observable<Response> {
        return this._http
            .get<Response>(`${this._baseUrl}${path}`, {
                headers: this._headers,
            })
            .pipe(
                catchError((error: unknown) => {
                    if (error instanceof HttpErrorResponse) {
                        return this.httpErrorHandler(error);
                    } else {
                        throw error;
                    }
                }),
            );
    }

    protected post$<Request, Response>(
        path: string,
        body: Request,
    ): Observable<Response> {
        return this._http
            .post<Response>(`${this._baseUrl}${path}`, body, {
                headers: this._headers,
            })
            .pipe(
                catchError((error: unknown) => {
                    if (error instanceof HttpErrorResponse) {
                        this.httpErrorHandler(error);
                    }

                    throw error;
                }),
            );
    }

    protected patch$<Request, Response>(
        path: string,
        body: Request,
    ): Observable<Response> {
        return this._http
            .patch<Response>(`${this._baseUrl}${path}`, body, {
                headers: this._headers,
            })
            .pipe(
                catchError((error: unknown) => {
                    if (error instanceof HttpErrorResponse) {
                        this.httpErrorHandler(error);
                    }

                    throw error;
                }),
            );
    }

    protected put$<Request, Response>(path: string, body: Request): Observable<Response> {
        return this._http
            .put<Response>(`${this._baseUrl}${path}`, body, {
                headers: this._headers,
            })
            .pipe(
                catchError((error: unknown) => {
                    if (error instanceof HttpErrorResponse) {
                        this.httpErrorHandler(error);
                    }

                    throw error;
                }),
            );
    }
}
