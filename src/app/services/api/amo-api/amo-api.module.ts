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

export const POST_MESSAGE_HTTP_CLIENT_TOKEN = new InjectionToken<HttpClient>(
  'POST MESSAGE HTTP CLIENT TOKEN'
);

const PostMessageHttpClientFactory = (
  transport: PostMessageTransportService,
  injector: EnvironmentInjector
) => {
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
      provide: POST_MESSAGE_HTTP_CLIENT_TOKEN,
      useFactory: PostMessageHttpClientFactory,
      deps: [PostMessageTransportService, EnvironmentInjector],
    },
  ],
})
export class AmoApiModule {}
