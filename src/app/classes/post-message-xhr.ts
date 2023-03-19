import { config } from './../constants/config';
import { EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs';
import { guid } from '../utils/guid-generator.util';
import { PostMessageTransportService } from './../services/transport/post-message-transport.service';
import {
  IEventListener,
  READY_STATE,
  IPostMessageXhrConfig,
  METHOD,
  IPostMessageXhrEvent,
  LISTENER_ADDING_METHOD,
  IXhrState,
  IAdditionalActions,
} from './post-message.interfaces';

const postMessageRequestAction = config.postMessageXhrProxyRequestAction;
const trackAlwaysEvents: Array<keyof XMLHttpRequestEventMap> = [
  'readystatechange',
  'loadend',
];

export class PostMessageXhr implements XMLHttpRequest {
  readonly UNSENT: 0 = 0; // eslint-disable-line
  readonly OPENED: 1 = 1; // eslint-disable-line
  readonly HEADERS_RECEIVED: 2 = 2; // eslint-disable-line
  readonly LOADING: 3 = 3; // eslint-disable-line
  readonly DONE: 4 = 4; // eslint-disable-line

  private _sendFlag: boolean = false;
  private _listenersList: IEventListener[] = [];
  private _sessionGuid: string = '';

  private _config: IPostMessageXhrConfig = {
    eventsToTrack: [],
    headers: {},
    method: undefined,
    password: null,
    user: null,
    timeout: 0,
    url: undefined,
    withCredentials: false,
    responseType: '',
    bodyString: '',
  };

  private _state: IXhrState = {
    readyState: this.UNSENT,
    progress: {
      lengthComputable: false,
      loaded: 0,
      total: 0,
    },
    status: 0,
    statusText: '',
    responseUrl: '',
    headersString: '',
    response: '',
    responseText: '',
  };

  private _disconnectEmitter = new EventEmitter<void>();

  constructor(private transport: PostMessageTransportService) {}

  // ================================================================================
  // ============================= Read-write properties ============================
  // ================================================================================

  public set responseType(value: XMLHttpRequestResponseType) {
    this._config.responseType = value;
  }
  public get responseType(): XMLHttpRequestResponseType {
    return this._config.responseType;
  }

  public set timeout(ms: number) {
    this._config.timeout = ms;
  }
  public get timeout(): number {
    return this._config.timeout;
  }

  public set withCredentials(value: boolean) {
    if (
      this.readyState === this.UNSENT ||
      (this.readyState === this.OPENED && !this._sendFlag)
    ) {
      this._config.withCredentials = value;
      return;
    }

    this._raiseError(
      "The value may only be set if the object's state is UNSENT or OPENED."
    );
  }
  public get withCredentials(): boolean {
    return this._config.withCredentials;
  }

  // ================================================================================
  // ============================= Read-only properties =============================
  // ================================================================================

  public get readyState(): READY_STATE {
    return this._state.readyState;
  }

  public get response(): any {
    if (
      this._config.responseType === 'text' ||
      this._config.responseType === 'json'
    ) {
      return JSON.parse(this._state.response);
    }
    return this._raiseError('Getter "response" not implemented.');
  }

  public get responseText(): string | never {
    return this._raiseError('Getter "responseText" not implemented.');
  }

  public get responseURL(): string {
    return this._state.responseUrl;
  }

  public get responseXML(): Document | null | never {
    return this._raiseError('Getter "responseXML" not implemented.');
  }

  public get status(): number {
    return this._state.status;
  }

  public get statusText(): string {
    return this._state.statusText;
  }

  public get upload(): XMLHttpRequestUpload {
    return this._raiseError('Getter "upload" not implemented.');
  }

  // ================================================================================
  // =================================== Methods ====================================
  // ================================================================================

  public abort(): void {
    if (
      this.readyState !== this.UNSENT &&
      this.readyState !== this.OPENED &&
      this._sendFlag
    ) {
      this.transport.post<IAdditionalActions>({
        action: postMessageRequestAction,
        backwardAction: this._sessionGuid,
        payload: { abort: true },
      });
    }
    this._state.readyState = this.UNSENT;
    this._state.status = 0;
    this._sendFlag = false;
  }

  public getAllResponseHeaders(): string {
    return this._state.headersString;
  }

  public getResponseHeader(name: string): string | null | never {
    this._raiseError('Method "getResponseHeader()" not implemented.');
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

    if (!async) {
      this._raiseError(`Synchronous mode is not supported`);
    }

    this._config.method = method as METHOD;

    if (typeof url === 'string') {
      this._config.url = url;
    } else {
      this._config.url = url.toString();
      this._config.user = url.username;
      this._config.password = url.password;
    }

    if (username) {
      this._config.user = username;
    }

    if (password) {
      this._config.password = password;
    }

    this._state.readyState = this.OPENED;
  }

  public overrideMimeType(mime: string): void {
    this._raiseError('Method "overrideMimeType()" not implemented.');
  }

  public send(
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ): void {
    if (this._state.readyState !== this.OPENED || this._sendFlag) {
      this._raiseError(
        "Failed to execute 'send'. The object's state must be OPENED."
      );
    }

    this._sendFlag = true;
    this._config.bodyString = JSON.stringify(body);
    this._sessionGuid = guid();

    this.transport
      .subscribe<IPostMessageXhrEvent>(this._sessionGuid)
      .pipe(takeUntil(this._disconnectEmitter))
      .subscribe((event) => {
        if (event.type === 'unexpected-error') {
          this._disconnectEmitter.emit();
          this._raiseError(`EXTERNAL ERROR: ${event.description}`);
        }

        this._state = {
          ...this._state,
          ...event.state,
        };

        for (const listener of this._listenersList) {
          if (listener.type === event.type) {
            listener.callback.call(this, {
              type: event.type,
              ...this._state.progress,
            });
          }
        }

        if (event.type === 'loadend') {
          this._disconnectEmitter.emit();
        }
      });

    this.transport.post<IPostMessageXhrConfig>({
      action: postMessageRequestAction,
      backwardAction: this._sessionGuid,
      payload: { ...this._config },
    });
  }

  public setRequestHeader(name: string, value: string): void {
    if (this.readyState !== this.OPENED || this._sendFlag) {
      this._raiseError(
        'Failed to execute "setRequestHeader". The object\'s state must be OPENED.'
      );
    }

    if (name in this._config.headers) {
      this._config.headers[name] = `${this._config.headers[name]}, ${value}`;
    } else {
      this._config.headers[name] = value;
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
        item.callback === listener &&
        item.addedBy === LISTENER_ADDING_METHOD.method
    );

    if (existingListener) {
      return;
    }

    this._listenersList.push({
      type,
      callback: listener as any,
      addedBy: LISTENER_ADDING_METHOD.method,
    });

    this._updateEventsToTrack();
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
          item.callback === listener &&
          item.addedBy === LISTENER_ADDING_METHOD.method
        )
    );

    this._updateEventsToTrack();
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
    this._raiseError('Method "dispatchEvent()" not implemented.');
  }
  public removeAllListeners?(eventName?: string | undefined): void {
    this._raiseError('Method "removeAllListeners()" not implemented.');
  }
  public eventListeners?(
    eventName?: string | undefined
  ): EventListenerOrEventListenerObject[] {
    this._raiseError('Method "eventListeners()" not implemented.');
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
      existingListener.callback = listener as any;
      return;
    }

    this._listenersList.push({
      type,
      callback: listener as any,
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
    return existingListener ? existingListener.callback : null;
  }

  /** Вспомогательный метод обновления списка событий для отслеживания. */
  private _updateEventsToTrack() {
    const eventsToTrack = new Set<keyof XMLHttpRequestEventMap>(
      trackAlwaysEvents
    );

    for (const listener of this._listenersList) {
      eventsToTrack.add(listener.type);
    }

    this._config.eventsToTrack = Array.from(eventsToTrack);
  }

  /** Вспомогательный метод для выброса исключений. */
  private _raiseError(description: string = 'Unexpected error.'): never {
    throw new Error(`${this.constructor.name}. ${description}`);
  }
}
