import { PostMessageTransportService } from './../../transport/post-message-transport.service';
import { PostMessageXhr } from './../../../classes/post-message-xhr';
import { NgModule } from '@angular/core';
import { CommonModule, XhrFactory } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const PostMessageProxyXhrFactory = (transport: PostMessageTransportService) => {
  return {
    build: () => new PostMessageXhr(transport),
  };
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: XhrFactory,
      useFactory: PostMessageProxyXhrFactory,
      deps: [PostMessageTransportService],
    },
  ],
})
export class AmoApiModule {}
