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

  postMessage<K extends keyof Requests>(action: K, payload: Requests[K]): void {
    window.parent.postMessage({ action, payload }, '*');
  }

  request$<Req extends keyof Requests, Res extends keyof Responses>(
    requestAction: Req,
    responseAction: Res,
    payload: Requests[Req]
  ): Observable<Responses[Res]> {
    return defer(() => {
      this.postMessage(requestAction, payload);
      return this.subscribe$(responseAction).pipe(first());
    });
  }

  requestWithTimeout$<Req extends keyof Requests, Res extends keyof Responses>(
    requestAction: Req,
    responseAction: Res,
    payload: Requests[Req],
    msTimeout: number
  ): Observable<Responses[Res]> {
    return defer(() => {
      return this.request$(requestAction, responseAction, payload).pipe(
        first(),
        timeout(msTimeout)
      );
    });
  }

  subscribe$<Res extends keyof Responses>(
    action: Res
  ): Observable<Responses[Res]> {
    return this.inbox$.pipe(
      filter((event) => event.data.action === action),
      map((event) => event.data.payload)
    );
  }
}
