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

  private _sendFlag = false;
  private _listenersList: IEventListener[] = [];
  private _sessionGuid = '';

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

  constructor(private _transport: PostMessageTransportService) {}

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

    this.raiseError(
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get response(): any {
    if (
      this._config.responseType === 'text' ||
      this._config.responseType === 'json'
    ) {
      return JSON.parse(this._state.response);
    }
    return this.raiseError('Getter "response" not implemented.');
  }

  public get responseText(): string | never {
    return this.raiseError('Getter "responseText" not implemented.');
  }

  public get responseURL(): string {
    return this._state.responseUrl;
  }

  public get responseXML(): Document | null | never {
    return this.raiseError('Getter "responseXML" not implemented.');
  }

  public get status(): number {
    return this._state.status;
  }

  public get statusText(): string {
    return this._state.statusText;
  }

  public get upload(): XMLHttpRequestUpload {
    return this.raiseError('Getter "upload" not implemented.');
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
      this._transport.post<IAdditionalActions>({
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getResponseHeader(name: string): string | null | never {
    this.raiseError('Method "getResponseHeader()" not implemented.');
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
      this.raiseError(`Unsupported method "${method}"`);
    }

    if (!async) {
      this.raiseError(`Synchronous mode is not supported`);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public overrideMimeType(mime: string): void {
    this.raiseError('Method "overrideMimeType()" not implemented.');
  }

  public send(
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ): void {
    if (this._state.readyState !== this.OPENED || this._sendFlag) {
      this.raiseError(
        "Failed to execute 'send'. The object's state must be OPENED."
      );
    }

    this._sendFlag = true;
    this._config.bodyString = JSON.stringify(body);
    this._sessionGuid = guid();

    this._transport
      .subscribe$<IPostMessageXhrEvent>(this._sessionGuid)
      .pipe(takeUntil(this._disconnectEmitter))
      .subscribe((event) => {
        if (event.type === 'unexpected-error') {
          this._disconnectEmitter.emit();
          this.raiseError(`EXTERNAL ERROR: ${event.description}`);
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

    this._transport.post<IPostMessageXhrConfig>({
      action: postMessageRequestAction,
      backwardAction: this._sessionGuid,
      payload: { ...this._config },
    });
  }

  public setRequestHeader(name: string, value: string): void {
    if (this.readyState !== this.OPENED || this._sendFlag) {
      this.raiseError(
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: XMLHttpRequest, event: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    if (options !== undefined) {
      this.raiseError('Adding event listener with options not implemented.');
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: listener as any,
      addedBy: LISTENER_ADDING_METHOD.method,
    });

    this.updateEventsToTrack();
  }

  public removeEventListener<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: XMLHttpRequest, event: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    if (options !== undefined) {
      this.raiseError('Removing event listener with options not implemented.');
    }
    this._listenersList = this._listenersList.filter(
      (item) =>
        !(
          item.type === type &&
          item.callback === listener &&
          item.addedBy === LISTENER_ADDING_METHOD.method
        )
    );

    this.updateEventsToTrack();
  }

  // ================================================================================
  // ============================= Listeners properties =============================
  // ================================================================================

  public set onreadystatechange(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: ((this: XMLHttpRequest, event: Event) => any) | null
  ) {
    this.setListenerAsProperty('readystatechange', value);
  }

  public get onreadystatechange(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: Event) => any) | null {
    return this.getListenerAsProperty('readystatechange');
  }

  public set onabort(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('abort', value);
  }
  public get onabort(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('abort');
  }

  public set onerror(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('error', value);
  }
  public get onerror(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('error');
  }

  public set onload(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('load', value);
  }
  public get onload(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('load');
  }

  public set onloadend(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('loadend', value);
  }
  public get onloadend(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('loadend');
  }

  public set onloadstart(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('loadstart', value);
  }
  public get onloadstart(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('loadstart');
  }

  public set onprogress(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('progress', value);
  }
  public get onprogress(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('progress');
  }

  public set ontimeout(
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null
  ) {
    this.setListenerAsProperty('timeout', value);
  }
  public get ontimeout(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: XMLHttpRequest, event: ProgressEvent<EventTarget>) => any) | null {
    return this.getListenerAsProperty('timeout');
  }

  // ================================================================================
  // ================================ Not implemented ===============================
  // ================================================================================

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public dispatchEvent(event: Event): boolean {
    this.raiseError('Method "dispatchEvent()" not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public removeAllListeners?(eventName?: string | undefined): void {
    this.raiseError('Method "removeAllListeners()" not implemented.');
  }

  public eventListeners?(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventName?: string | undefined
  ): EventListenerOrEventListenerObject[] {
    this.raiseError('Method "eventListeners()" not implemented.');
  }

  // ================================================================================
  // =================================== Helpers ====================================
  // ================================================================================

  /** Вспомогательный метод для сеттеров обработчиков событий через свойства.
   * Реализует добавление/удаление слушателей с сохранением особенностей очерёдности их
   * вызова, как в оригинальном XHR.
   */
  private setListenerAsProperty<K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((this: XMLHttpRequest, event: XMLHttpRequestEventMap[K]) => any) | null
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      existingListener.callback = listener as any;
      return;
    }

    this._listenersList.push({
      type,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: listener as any,
      addedBy: LISTENER_ADDING_METHOD.property,
    });
  }

  /** Вспомогательный метод для геттеров обработчиков событий через свойства. */
  private getListenerAsProperty<K extends keyof XMLHttpRequestEventMap>(
    type: K
  ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((this: XMLHttpRequest, event: Event | ProgressEvent<EventTarget>) => any)
    | null {
    const existingListener = this._listenersList.find(
      (item) =>
        item.addedBy === LISTENER_ADDING_METHOD.property && item.type === type
    );
    return existingListener ? existingListener.callback : null;
  }

  /** Вспомогательный метод обновления списка событий для отслеживания. */
  private updateEventsToTrack(): void {
    const eventsToTrack = new Set<keyof XMLHttpRequestEventMap>(
      trackAlwaysEvents
    );

    for (const listener of this._listenersList) {
      eventsToTrack.add(listener.type);
    }

    this._config.eventsToTrack = Array.from(eventsToTrack);
  }

  /** Вспомогательный метод для выброса исключений. */
  private raiseError(description: string = 'Unexpected error.'): never {
    throw new Error(`${this.constructor.name}. ${description}`);
  }
}
