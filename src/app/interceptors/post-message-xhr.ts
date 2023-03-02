import { Indexed } from './../types/common';
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface IPostMessageXhrState {
  withCredentials: boolean;
  subscriptions: {
    onReadyStateChange: boolean;
  };
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

export class PostMessageXhr implements XMLHttpRequest {
  readonly UNSENT: 0;
  readonly OPENED: 1;
  readonly HEADERS_RECEIVED: 2;
  readonly LOADING: 3;
  readonly DONE: 4;

  private _state: IPostMessageXhrState = {
    withCredentials: false,
    subscriptions: {
      onReadyStateChange: false,
    },
  };

  private _openContext: IOpenContext;

  private _onreadystatechange:
    | ((this: XMLHttpRequest, ev: Event) => any)
    | null = null;

  private _readyState: number;
  private _status: number;
  private _timeout: number;

  constructor() {
    this._readyState = this.UNSENT;
    this._status = 0;
    this._timeout = 0;
  }

  public set onreadystatechange(
    value: ((this: XMLHttpRequest, ev: Event) => any) | null
  ) {
    this._onreadystatechange = value;
    this._state.subscriptions.onReadyStateChange =
      value === null ? false : true;
  }

  public get onreadystatechange():
    | ((this: XMLHttpRequest, ev: Event) => any)
    | null {
    return this._onreadystatechange;
  }

  public get readyState(): number {
    return this._readyState;
  }

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
    throw new Error('Method not implemented.');
  }
  public get timeout(): number {
    throw new Error('Method not implemented.');
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
  ): void;
  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  public addEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown
  ): void {
    throw new Error('Method not implemented.');
  }

  public removeEventListener<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  public removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown
  ): void {
    throw new Error('Method not implemented.');
  }

  public set onabort(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onabort():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set onerror(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onerror():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set onload(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onload():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set onloadend(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onloadend():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set onloadstart(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onloadstart():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set onprogress(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get onprogress():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
  }

  public set ontimeout(
    value:
      | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
      | null
  ) {
    throw new Error('Method not implemented.');
  }
  public get ontimeout():
    | ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any)
    | null {
    throw new Error('Method not implemented.');
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
}
