import { Indexed } from '../types/common';
/** Поддерживаемые методы запроса. */
export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/** Тип слушателя события по способу добавления. */
export enum LISTENER_ADDING_METHOD {
  /** Добавлен как свойство. */
  property = 0,
  /** Добавлен через метод `addEventListener()` */
  method = 1,
}

export interface IPostMessageXhrConfig {
  timeout: number;
  withCredentials: boolean;
  method: METHOD | undefined;
  url: string | undefined;
  user: string | null;
  password: string | null;
  headers: Indexed<string>;
  eventsToTrack: Array<keyof XMLHttpRequestEventMap>;
  responseType: XMLHttpRequestResponseType;
  bodyString: string;
}

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface IAdditionalActions {
  abort?: boolean;
}

export interface IXhrState {
  readyState: READY_STATE;
  progress: {
    lengthComputable: boolean;
    loaded: number;
    total: number;
  };
  status: number;
  statusText: string;
  responseUrl: string;
  headersString: string;
  response: string;
  responseText: string;
}

export interface IPostMessageXhrEvent {
  type: keyof XMLHttpRequestEventMap | 'unexpected-error';
  description?: string;
  state: Partial<IXhrState>;
}

export enum READY_STATE {
  Unsent = 0,
  Opened = 1,
  HeadersReceived = 2,
  Loading = 3,
  Done = 4,
}

export interface IEventListener {
  type: keyof XMLHttpRequestEventMap;
  addedBy: LISTENER_ADDING_METHOD;
  callback: (
    this: XMLHttpRequest,
    event: Partial<XMLHttpRequestEventMap[keyof XMLHttpRequestEventMap]>
  ) => void;
}
