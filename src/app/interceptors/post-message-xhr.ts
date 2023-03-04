import { BehaviorSubject, takeUntil, filter } from 'rxjs';
import { Indexed } from './../types/common';
import { EventEmitter } from '@angular/core';
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
/** Тип слушателя события по способу добавления. */
enum LISTENER_ADDING_METHOD {
  /** Добавлен как свойство. */
  property = 0,
  /** Добавлен через метод `addEventListener()` */
  method = 1,
}

interface IPostMessageXhrState {
  withCredentials: boolean;
  subscriptions: {
    onReadyStateChange: boolean;
  };
  // openContext: IOpenContext;
}

interface IOpenContext {
  method: METHODS;
  url: string;
  async: boolean;
  user: string | null;
  password: string | null;
}

interface IPayload {
  event: 'open';
  // payload:
}

type TReadyState = 0 | 1 | 2 | 3 | 4;

interface IEventListener {
  type: keyof XMLHttpRequestEventMap;
  addedBy: LISTENER_ADDING_METHOD;
  listener:
    | ((
        this: XMLHttpRequest,
        ev: XMLHttpRequestEventMap[keyof XMLHttpRequestEventMap]
      ) => any)
    | null;
}

export class PostMessageXhr implements XMLHttpRequest {
  readonly UNSENT: 0 = 0;
  readonly OPENED: 1 = 1;
  readonly HEADERS_RECEIVED: 2 = 2;
  readonly LOADING: 3 = 3;
  readonly DONE: 4 = 4;

  private _sendFlag: boolean = false;

  private _state: IPostMessageXhrState = {
    withCredentials: false,
    subscriptions: {
      onReadyStateChange: false,
    },
  };

  private _listenersList: IEventListener[];

  private _openContext: IOpenContext;

  private __readyState: TReadyState = this.UNSENT;

  private set _readyState(value: TReadyState) {
    this.__readyState = value;
  }
  public get readyState(): TReadyState {
    return this.__readyState;
  }

  private _status: number = 0;
  private _timeout: number = 0;

  constructor() {}

  public get response(): any {
    throw new Error('Method not implemented.');
  }

  public get responseText(): string | never {
    throw new Error('Method not implemented.');
  }

  public set responseType(type: XMLHttpRequestResponseType) {
    throw new Error('Method not implemented.');
  }
  public get responseType(): XMLHttpRequestResponseType {
    throw new Error('Method not implemented.');
  }

  public get responseURL(): string {
    throw new Error('Method not implemented.');
  }

  public get responseXML(): Document | null | never {
    throw new Error('Method not implemented.');
  }

  public get status(): number {
    return this._status;
  }

  public get statusText(): string {
    throw new Error('Method not implemented.');
  }

  public set timeout(ms: number) {
    this._timeout = ms;
  }
  public get timeout(): number {
    return this._timeout;
  }

  public get upload(): XMLHttpRequestUpload {
    throw new Error('Method not implemented.');
  }

  public set withCredentials(value: boolean) {
    throw new Error('Method not implemented.');
  }
  public get withCredentials(): boolean {
    throw new Error('Method not implemented.');
  }

  public abort(): void {
    if (this._readyState !== this.UNSENT && this._readyState !== this.OPENED) {
      // sending postMessage to abort request
    }
    this._readyState = this.UNSENT;
    this._status = 0;
    throw new Error('Method not implemented.');
  }

  public getAllResponseHeaders(): string {
    throw new Error('Method not implemented.');
  }

  public getResponseHeader(name: string): string | null | never {
    throw new Error('Method not implemented.');
  }

  public open(
    method: METHODS,
    url: string | URL,
    async: boolean = true,
    username?: string | null,
    password?: string | null
  ): void {
    this.abort();

    if (!(method in METHODS)) {
      throw new Error(
        `${this.constructor.name}: Unsupported method "${method}"`
      );
    }

    this._openContext.method = method;
    this._openContext.async = async;

    if (typeof url === 'string') {
      this._openContext.url = url;
    } else {
      this._openContext.url = url.toString();
      this._openContext.user = url.username;
      this._openContext.password = url.password;
    }

    if (username) {
      this._openContext.user = username;
    }

    if (password) {
      this._openContext.password = password;
    }

    this._readyState = this.OPENED;
  }

  public overrideMimeType(mime: string): void {
    throw new Error('Method not implemented.');
  }

  public send(
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ): void {
    throw new Error('Method not implemented.');
  }

  public setRequestHeader(name: string, value: string): void {
    throw new Error('Method not implemented.');
  }

  public addEventListener<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    if (options !== undefined) {
      throw new Error(
        `${this.constructor.name}: adding event listener with options not implemented.`
      );
    }

    const existingListener = this._listenersList.find(
      (item) =>
        item.type === type &&
        item.listener === listener &&
        item.addedBy === LISTENER_ADDING_METHOD.method
    );

    if (existingListener) {
      return;
    }

    this._listenersList.push({
      type,
      listener: listener as any,
      addedBy: LISTENER_ADDING_METHOD.method,
    });
  }

  public removeEventListener<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    if (options !== undefined) {
      throw new Error(
        `${this.constructor.name}: removing event listener with options not implemented.`
      );
    }
    this._listenersList = this._listenersList.filter(
      (item) =>
        item.type !== type &&
        item.listener !== listener &&
        item.addedBy === LISTENER_ADDING_METHOD.method
    );
  }

  public set onreadystatechange(
    value: ((this: XMLHttpRequest, ev: Event) => any) | null
  ) {
    this._setListenerAsProperty('readystatechange', value);
  }

  public get onreadystatechange():
    | ((this: XMLHttpRequest, ev: Event) => any)
    | null {
    return this._getListenerAsProperty('readystatechange');
  }

  public set onabort(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('abort', value);
  }
  public get onabort():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('abort');
  }

  public set onerror(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('error', value);
  }
  public get onerror():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('error');
  }

  public set onload(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('load', value);
  }
  public get onload():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('load');
  }

  public set onloadend(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('loadend', value);
  }
  public get onloadend():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('loadend');
  }

  public set onloadstart(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('loadstart', value);
  }
  public get onloadstart():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('loadstart');
  }

  public set onprogress(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('progress', value);
  }
  public get onprogress():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('progress');
  }

  public set ontimeout(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    this._setListenerAsProperty('timeout', value);
  }
  public get ontimeout():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    return this._getListenerAsProperty('timeout');
  }

  public dispatchEvent(event: Event): boolean {
    throw new Error('Method not implemented.');
  }
  public removeAllListeners?(eventName?: string | undefined): void {
    throw new Error('Method not implemented.');
  }
  public eventListeners?(
    eventName?: string | undefined
  ): EventListenerOrEventListenerObject[] {
    throw new Error('Method not implemented.');
  }

  private _setListenerAsProperty<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener:
      | ((this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any)
      | null
  ): void {
    if (listener === null) {
      this._listenersList = this._listenersList.filter(
        (item) =>
          item.addedBy === LISTENER_ADDING_METHOD.property && item.type !== type
      );
      return;
    }

    const existingListener = this._listenersList.find(
      (item) =>
        item.addedBy === LISTENER_ADDING_METHOD.property && item.type === type
    );

    if (existingListener) {
      existingListener.listener = listener as any;
      return;
    }

    this._listenersList.push({
      type,
      listener: listener as any,
      addedBy: LISTENER_ADDING_METHOD.property,
    });
  }

  private _getListenerAsProperty<K extends keyof XMLHttpRequestEventMap>(
    type: K
  ):
    | ((this: XMLHttpRequest, ev: Event | ProgressEvent<EventTarget>) => any)
    | null {
    const existingListener = this._listenersList.find(
      (item) =>
        item.addedBy === LISTENER_ADDING_METHOD.property && item.type === type
    );
    return existingListener ? existingListener.listener : null;
  }
}

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

const handler1 = function () {
  console.log('Handler 1 invoked');
};

const handler2 = function () {
  console.log('Handler 2 invoked');
};

const handler3 = function () {
  console.log('Handler 3 invoked');
};

// xhr.onload = handler1
xhr.addEventListener('load', handler1);
xhr.addEventListener('load', handler1);
// xhr.onload = null
// xhr.onload = handler3

xhr.send();
