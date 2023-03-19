import { Injectable } from '@angular/core';
import { defer, timeout, Observable, fromEvent } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Indexed } from 'src/app/types/common';

interface IPostMessage<T extends Indexed<any>> {
  action: string;
  backwardAction?: string;
  payload: T;
}

@Injectable()
export class PostMessageTransportService {
  private inbox$ = fromEvent<MessageEvent<unknown>>(window, 'message');

  /** Отправка сообщения без подписки на ответ. */
  public post<T extends Indexed<any>>({
    action,
    payload,
    backwardAction,
  }: IPostMessage<T>): void {
    window.parent.postMessage({ action, backwardAction, payload }, '*');
  }

  /** Подписка на сообщения без отправки запроса. */
  public subscribe<T extends Indexed<any>>(action: string): Observable<T> {
    return (this.inbox$ as Observable<MessageEvent<IPostMessage<T>>>).pipe(
      filter((event) => event.data.action === action),
      map((event) => event.data.payload)
    );
  }

  /** Отправка запроса и подписка на ответ. */
  public request<Req extends Indexed<any>, Res extends Indexed<any>>(
    request: Required<IPostMessage<Req>>
  ): Observable<Res> {
    return defer(() => {
      const observable$ = this.subscribe<Res>(request.backwardAction).pipe(
        take(1)
      );
      this.post<Req>(request);
      return observable$;
    });
  }

  /** Отправка запроса и подписка на ответ с заданным таймаутом.
   * Если по истечение таймаута ответ не будет получен - выбросится исключение. */
  public requestWithTimeout<Req extends Indexed<any>, Res extends Indexed<any>>(
    request: Required<IPostMessage<Req>>,
    msTimeout: number
  ): Observable<Res> {
    return this.request<Req, Res>(request).pipe(timeout(msTimeout));
  }
}
