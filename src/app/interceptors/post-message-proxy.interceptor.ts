import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// @Injectable()
// export class PostMessageProxyInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const { headers } = request;

//     let plainHeaders = undefined;
//     const headersKeys = headers.keys();

//     if (headersKeys.length > 0) {
//       plainHeaders = headers.keys().reduce((result, key) => {
//         return { ...result, [key]: headers.get(key) };
//       }, {});
//     }

//     return next.handle(request).pipe(tap());
//   }
// }

// public handle({
//   method,
//   body,
//   headers,
//   url,
// }: HttpRequest<any>): Observable<Partial<HttpEvent<any>>> {
//   let plainHeaders = undefined;
//   const headersKeys = headers.keys();

//   if (headersKeys.length > 0) {
//     plainHeaders = headers.keys().reduce((result, key) => {
//       return { ...result, [key]: headers.get(key) };
//     }, {});
//   }

//   console.log(url, method, headers, body);

//   return this.postMessageTransport
//     .request<IPayload, Partial<HttpEvent<any>>>({
//       action: 'httpProxyRequest',
//       backwardAction: guid(),
//       payload: {
//         url,
//         requestOptions: {
//           method,
//           body: JSON.stringify(body),
//           headers: plainHeaders,
//         },
//       },
//     })
//     .pipe(
//       map((response) => response),
//       tap(() => console.log('response')),
//       tap(console.log)
//     );
// }
