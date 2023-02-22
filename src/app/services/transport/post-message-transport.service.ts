import { Injectable } from '@angular/core';
import { defer, timeout, Observable, fromEvent } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export interface IPostMessage {
  action: string;
  backwardAction?: string;
  payload: { [key in string]: any };
}

@Injectable()
export class PostMessageTransportService {
  private inbox$ = fromEvent<MessageEvent>(window, 'message');

  /** Отправка сообщения без подписки на ответ. */
  public post({ action, payload }: IPostMessage): void {
    window.parent.postMessage({ action, payload }, '*');
  }

  /** Подписка на сообщения без отправки запроса. */
  public subscribe<Response extends IPostMessage>(
    action: IPostMessage['action']
  ): Observable<Response> {
    return this.inbox$.pipe(
      filter((event) => event.data.action === action),
      map((event) => event.data.payload)
    );
  }

  /** Отправка запроса и подписка на ответ. */
  public request<
    Request extends Required<IPostMessage>,
    Response extends IPostMessage
  >(request: Request): Observable<Response> {
    return defer(() => {
      const observable$ = this.subscribe<Response>(request.backwardAction).pipe(
        take(1)
      );
      this.post(request);
      return observable$;
    });
  }

  /** Отправка запроса и подписка на ответ с заданным таймаутом.
   * Если по истечение таймаута ответ не будет получен - выбросится исключение. */
  public requestWithTimeout<
    Request extends Required<IPostMessage>,
    Response extends IPostMessage
  >(request: Request, msTimeout: number): Observable<Response> {
    return this.request<Request, Response>(request).pipe(timeout(100));
  }
}
