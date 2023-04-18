import { Injectable } from '@angular/core';
import { defer, timeout, Observable, fromEvent } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Indexed } from 'src/app/types/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IPostMessage<T extends Indexed<any>> {
    action: string;
    backwardAction?: string;
    payload: T;
}

@Injectable()
export class PostMessageTransportService {
    private _inbox$ = fromEvent<MessageEvent<unknown>>(window, 'message');

    /** Отправка сообщения без подписки на ответ. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public post<T extends Indexed<any>>({
        action,
        payload,
        backwardAction,
    }: IPostMessage<T>): void {
        window.parent.postMessage({ action, backwardAction, payload }, '*');
    }

    /** Подписка на сообщения без отправки запроса. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public subscribe$<T extends Indexed<any>>(action: string): Observable<T> {
        return (this._inbox$ as Observable<MessageEvent<IPostMessage<T>>>).pipe(
            filter((event) => event.data.action === action),
            map((event) => event.data.payload),
        );
    }

    /** Отправка запроса и подписка на ответ. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public request$<Request extends Indexed<any>, Response extends Indexed<any>>(
        request: Required<IPostMessage<Request>>,
    ): Observable<Response> {
        return defer(() => {
            const observable$ = this.subscribe$<Response>(
                request.backwardAction,
            ).pipe(take(1));
            this.post<Request>(request);
            return observable$;
        });
    }

    /** Отправка запроса и подписка на ответ с заданным таймаутом.
   * Если по истечение таймаута ответ не будет получен - выбросится исключение. */
    public requestWithTimeout$<
        Request extends Indexed<unknown>,
        Response extends Indexed<unknown>
    >(
        request: Required<IPostMessage<Request>>,
        msTimeout: number,
    ): Observable<Response> {
        return this.request$<Request, Response>(request).pipe(timeout(msTimeout));
    }
}
