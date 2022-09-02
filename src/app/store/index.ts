import { widgetContextReducer } from './addressee/reducers';
import { WIDGET_CONTEXT_KEY, IAddresseeState } from './addressee/index';
import { accessTokenReducer } from './access-token/reducers';
import { TOKEN_KEY, ITokenState } from './access-token/index';
import { ICrmContextState, CONTEXT_KEY } from './crm-context/index';
import { environment } from '../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { crmContextReducer } from './crm-context/reducers';

export interface State {
  [CONTEXT_KEY]: ICrmContextState;
  [TOKEN_KEY]: ITokenState;
  [WIDGET_CONTEXT_KEY]: IAddresseeState;
}

export const reducers: ActionReducerMap<State> = {
  [CONTEXT_KEY]: crmContextReducer,
  [TOKEN_KEY]: accessTokenReducer,
  [WIDGET_CONTEXT_KEY]: widgetContextReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
