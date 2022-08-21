import { Injectable } from '@angular/core';
import { defer, timeout, Observable, flatMap, fromEvent } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostMessageService<Requests, Responses> {
  private inbox$: Observable<MessageEvent>;

  constructor() {
    this.inbox$ = fromEvent<MessageEvent>(window, 'message');
  }

  messageHandler(event: MessageEvent) {
    console.log(event);
  }

  postMessage<K extends keyof Requests>(
    subject: K,
    payload: Requests[K]
  ): void {
    window.parent.postMessage({ subject, payload }, '*');
  }

  requestWithTimeout$<Req extends keyof Requests, Res extends keyof Responses>(
    requestSubject: Req,
    responseSubject: Res,
    payload: Requests[Req],
    t: number
  ): Observable<Responses[Res]> {
    return defer(() => {
      this.postMessage(requestSubject, payload);
      return this.subscribe$(responseSubject).pipe(first(), timeout(t));
    });
  }

  subscribe$<Res extends keyof Responses>(
    subject: Res
  ): Observable<Responses[Res]> {
    return this.inbox$.pipe(
      filter((event) => event.data.subject === subject),
      map((event) => event.data.payload)
    );
  }
}
