import { PostMessageTransportService } from './../../transport/post-message-transport.service';
import { PostMessageXhr } from './../../../classes/post-message-xhr';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpXhrBackend,
} from '@angular/common/http';

export const POST_MESSAGE_HTTP_CLIENT_TOKEN = new InjectionToken<HttpClient>(
  'POST MESSAGE HTTP CLIENT TOKEN'
);

const PostMessageHttpClientFactory = (
  transport: PostMessageTransportService
) => {
  const handler = new HttpXhrBackend({
    build: () => new PostMessageXhr(transport),
  });

  return new HttpClient(handler);
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: POST_MESSAGE_HTTP_CLIENT_TOKEN,
      useFactory: PostMessageHttpClientFactory,
      deps: [PostMessageTransportService],
    },
  ],
})
export class AmoApiModule {}
