import { Indexed } from 'src/app/types/common';
enum METHOD {
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
  method: METHOD;
  url: string;
  async: boolean;
  user: string | null;
  password: string | null;
}

interface IPayload {
  event: 'open';
  // payload:
}

enum READY_STATE {
  Unsent = 0,
  Opened = 1,
  HeadersReceived = 2,
  Loading = 3,
  Done = 4,
}

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
  private _listenersList: IEventListener[] = [];
  private _headersList: Indexed<string> = {};
  private __readyState: READY_STATE = this.UNSENT;

  private set _readyState(value: READY_STATE) {
    this.__readyState = value;
  }
  public get readyState(): READY_STATE {
    return this.__readyState;
  }

  private _status: number = 0;
  private _timeout: number = 0;
  private _withCredentials: boolean = false;
  private _method: METHOD;
  private _url: string;
  private _async: boolean;
  private _user: string | null;
  private _password: string | null;

  constructor() {}

  // ================================================================================
  // ============================= Read-write properties ============================
  // ================================================================================

  public set responseType(type: XMLHttpRequestResponseType) {
    this._raiseError('Method not implemented.');
  }
  public get responseType(): XMLHttpRequestResponseType {
    return this._raiseError('Method not implemented.');
  }

  public set timeout(ms: number) {
    this._timeout = ms;
  }
  public get timeout(): number {
    return this._timeout;
  }

  public set withCredentials(value: boolean) {
    if (
      this.readyState === this.UNSENT ||
      (this.readyState === this.OPENED && !this._sendFlag)
    ) {
      this._withCredentials = value;
      return;
    }

    this._raiseError(
      "The value may only be set if the object's state is UNSENT or OPENED."
    );
  }
  public get withCredentials(): boolean {
    return this._withCredentials;
  }

  // ================================================================================
  // ============================= Read-only properties =============================
  // ================================================================================

  public get response(): any {
    return this._raiseError('Method not implemented.');
  }

  public get responseText(): string | never {
    return this._raiseError('Method not implemented.');
  }

  public get responseURL(): string {
    return this._raiseError('Method not implemented.');
  }

  public get responseXML(): Document | null | never {
    return this._raiseError('Method not implemented.');
  }

  public get status(): number {
    return this._status;
  }

  public get statusText(): string {
    return this._raiseError('Method not implemented.');
  }

  public get upload(): XMLHttpRequestUpload {
    return this._raiseError('Method not implemented.');
  }

  // ================================================================================
  // =================================== Methods ====================================
  // ================================================================================

  public abort(): void {
    if (this.readyState !== this.UNSENT && this.readyState !== this.OPENED) {
      // sending postMessage to abort request
    }
    this._readyState = this.UNSENT;
    this._status = 0;
    this._sendFlag = false;
    // this._raiseError('Method not implemented.');
  }

  public getAllResponseHeaders(): string {
    this._raiseError('Method not implemented.');
  }

  public getResponseHeader(name: string): string | null | never {
    this._raiseError('Method not implemented.');
  }

  public open(
    method: string,
    url: string | URL,
    async: boolean = true,
    username?: string | null,
    password?: string | null
  ): void {
    this.abort();

    if (!(method in METHOD)) {
      this._raiseError(`Unsupported method "${method}"`);
    }

    this._method = method as METHOD;
    this._async = async;

    if (typeof url === 'string') {
      this._url = url;
    } else {
      this._url = url.toString();
      this._user = url.username;
      this._password = url.password;
    }

    if (username) {
      this._user = username;
    }

    if (password) {
      this._password = password;
    }

    this._readyState = this.OPENED;
  }

  public overrideMimeType(mime: string): void {
    this._raiseError('Method not implemented.');
  }

  public send(
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ): void {
    this._sendFlag = true;

    // this._raiseError('Method not implemented.');
  }

  public setRequestHeader(name: string, value: string): void {
    if (this.readyState !== this.OPENED || this._sendFlag) {
      this._raiseError(
        'Failed to execute "setRequestHeader". The object\'s state must be OPENED.'
      );
    }

    if (name in this._headersList) {
      this._headersList[name] = `${this._headersList[name]}, ${value}`;
    } else {
      this._headersList[name] = value;
    }
  }

  public addEventListener<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    if (options !== undefined) {
      this._raiseError('Adding event listener with options not implemented.');
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
      this._raiseError('Removing event listener with options not implemented.');
    }
    this._listenersList = this._listenersList.filter(
      (item) =>
        !(
          item.type === type &&
          item.listener === listener &&
          item.addedBy === LISTENER_ADDING_METHOD.method
        )
    );
  }

  // ================================================================================
  // ============================= Listeners properties =============================
  // ================================================================================

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

  // ================================================================================
  // ================================ Not implemented ===============================
  // ================================================================================

  public dispatchEvent(event: Event): boolean {
    this._raiseError('Method not implemented.');
  }
  public removeAllListeners?(eventName?: string | undefined): void {
    this._raiseError('Method not implemented.');
  }
  public eventListeners?(
    eventName?: string | undefined
  ): EventListenerOrEventListenerObject[] {
    this._raiseError('Method not implemented.');
  }

  // ================================================================================
  // =================================== Helpers ====================================
  // ================================================================================

  /** Вспомогательный метод для сеттеров обработчиков событий через свойства.
   * Реализует добавление/удаление слушателей с сохранением особенностей очерёдности их
   * вызова, как в оригинальном XHR.
   */
  private _setListenerAsProperty<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener:
      | ((this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any)
      | null
  ): void {
    if (listener === null) {
      this._listenersList = this._listenersList.filter(
        (item) =>
          !(
            item.addedBy === LISTENER_ADDING_METHOD.property &&
            item.type === type
          )
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

  /** Вспомогательный метод для геттеров обработчиков событий через свойства. */
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

  /** Вспомогательный метод для выброса исключений. */
  private _raiseError(description: string = 'Unexpected error.'): never {
    throw new Error(`${this.constructor.name}: ${description}`);
  }
}

// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// const handler1 = function () {
//   console.log('Handler 1 invoked');
// };

// const handler2 = function () {
//   console.log('Handler 2 invoked');
// };

// const handler3 = function () {
//   console.log('Handler 3 invoked');
// };

// // xhr.onload = handler1
// xhr.addEventListener('load', handler1);
// xhr.addEventListener('load', handler1);
// // xhr.onload = null
// // xhr.onload = handler3

// xhr.send();