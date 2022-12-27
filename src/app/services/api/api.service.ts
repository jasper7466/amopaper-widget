import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable()
export class ApiService {
  private _baseUrl: string;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  protected set baseUrl(url: string) {
    this._baseUrl = url;
  }

  protected resetHeaders(headers: { [key: string]: string | string[] }) {
    this.headers = new HttpHeaders();
    this.setHeaders(headers);
  }

  protected setHeaders(headers: { [key: string]: string | string[] }) {
    for (const [header, value] of Object.entries(headers)) {
      this.headers = this.headers.set(header, value);
    }
  }

  protected httpErrorHandler(error: HttpErrorResponse): never {
    throw error;
  }

  protected get<Res>(path: string): Observable<Res> {
    return this.http
      .get<Res>(`${this._baseUrl}${path}`, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.httpErrorHandler(error)));
  }

  protected post<Req, Res>(path: string, body: Req): Observable<Res> {
    return this.http
      .post<Res>(`${this._baseUrl}${path}`, body, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.httpErrorHandler(error)));
  }

  protected patch<Req, Res>(path: string, body: Req): Observable<Res> {
    return this.http
      .patch<Res>(`${this._baseUrl}${path}`, body, {
        headers: this.headers,
      })
      .pipe(catchError((error) => this.httpErrorHandler(error)));
  }
}
