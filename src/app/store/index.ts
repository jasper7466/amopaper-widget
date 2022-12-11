import { widgetContextReducer } from './addressee/reducers';
import { WIDGET_CONTEXT_KEY, IAddresseeState } from './addressee/index';
import { accessTokenReducer } from './access-token/reducers';
import { TOKEN_KEY, ITokenState } from './access-token/index';
import { ICrmContextState, CONTEXT_KEY } from './crm-context/index';
import { environment } from '../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { crmContextReducer } from './crm-context/reducers';
import { FILES_KEY, IFilesState } from './files';
import { filesReducer } from './files/reducers';
import { ISignaturesState, SIGNATURES_KEY } from './signatures';
import { signaturesReducer } from './signatures/reducers';
import { IPacketsState, PACKETS_KEY } from './packets';
import { packetsReducer } from './packets/reducers';
import { IMiscState, MISC_KEY } from './misc';
import { miscReducer } from './misc/reducers';

export interface State {
  [CONTEXT_KEY]: ICrmContextState;
  [TOKEN_KEY]: ITokenState;
  [WIDGET_CONTEXT_KEY]: IAddresseeState;
  [FILES_KEY]: IFilesState;
  [SIGNATURES_KEY]: ISignaturesState;
  [PACKETS_KEY]: IPacketsState;
  [MISC_KEY]: IMiscState;
}

export const reducers: ActionReducerMap<State> = {
  [CONTEXT_KEY]: crmContextReducer,
  [TOKEN_KEY]: accessTokenReducer,
  [WIDGET_CONTEXT_KEY]: widgetContextReducer,
  [FILES_KEY]: filesReducer,
  [SIGNATURES_KEY]: signaturesReducer,
  [PACKETS_KEY]: packetsReducer,
  [MISC_KEY]: miscReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
