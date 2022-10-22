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
import { INopaperState, NOPAPER_KEY } from './nopaper';
import { nopaperReducer } from './nopaper/reducers';
import { ISignaturesState, SIGNATURES_KEY } from './signatures';
import { signaturesReducer } from './signatures/reducers';

export interface State {
  [CONTEXT_KEY]: ICrmContextState;
  [TOKEN_KEY]: ITokenState;
  [WIDGET_CONTEXT_KEY]: IAddresseeState;
  [FILES_KEY]: IFilesState;
  [NOPAPER_KEY]: INopaperState;
  [SIGNATURES_KEY]: ISignaturesState;
}

export const reducers: ActionReducerMap<State> = {
  [CONTEXT_KEY]: crmContextReducer,
  [TOKEN_KEY]: accessTokenReducer,
  [WIDGET_CONTEXT_KEY]: widgetContextReducer,
  [FILES_KEY]: filesReducer,
  [NOPAPER_KEY]: nopaperReducer,
  [SIGNATURES_KEY]: signaturesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
