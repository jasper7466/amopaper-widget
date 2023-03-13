import { PostMessageTransportService } from './../../transport/post-message-transport.service';
import { PostMessageXhr } from './../../../classes/post-message-xhr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpXhrBackend,
} from '@angular/common/http';

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
      provide: HttpClient,
      useFactory: PostMessageHttpClientFactory,
      deps: [PostMessageTransportService],
    },
  ],
})
export class AmoApiModule {}
