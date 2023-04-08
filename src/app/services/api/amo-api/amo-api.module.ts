import { PostMessageTransportService } from './../../transport/post-message-transport.service';
import { PostMessageXhr } from './../../../classes/post-message-xhr';
import { NgModule, InjectionToken, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpXhrBackend,
  ɵHttpInterceptorHandler,
} from '@angular/common/http';
import { HttpErrorHandlingInterceptor } from 'src/app/interceptors/http-error-handling.interceptor';
import { environment } from 'src/environments/environment';

export const postMessageHttpClientToken = new InjectionToken<HttpClient>(
  'POST MESSAGE HTTP CLIENT TOKEN'
);

const postMessageHttpClientFactory = (
  transport: PostMessageTransportService,
  injector: EnvironmentInjector,
  regularHttpClient: HttpClient
): HttpClient => {
  if (environment.isAmoDevProxy) {
    return regularHttpClient;
  }

  const backend = new HttpXhrBackend({
    build: () => new PostMessageXhr(transport),
  });

  const handler = new ɵHttpInterceptorHandler(backend, injector);

  return new HttpClient(handler);
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlingInterceptor,
      multi: true,
    },
    {
      provide: postMessageHttpClientToken,
      useFactory: postMessageHttpClientFactory,
      deps: [PostMessageTransportService, EnvironmentInjector, HttpClient],
    },
  ],
})
export class AmoApiModule {}
