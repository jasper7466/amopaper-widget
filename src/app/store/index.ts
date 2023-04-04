import { processedFilesReducer } from './files-processed/reducers';
import { widgetContextReducer } from './addressee/reducers';
import { ADDRESSEE_KEY, IAddresseeState } from './addressee/index';
import { accessTokenReducer } from './access-token/reducers';
import { TOKEN_KEY, ITokenState } from './access-token/index';
import { ICrmContextState, CRM_CONTEXT_KEY } from './crm-context/index';
import { environment } from '../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { crmContextReducer } from './crm-context/reducers';
import { FILES_SOURCE_KEY, ISourceFilesState } from './files-source';
import { sourceFilesReducer } from './files-source/reducers';
import { ISignaturesState, SIGNATURES_KEY } from './signatures';
import { signaturesReducer } from './signatures/reducers';
import { IPacketsState, PACKETS_KEY } from './packets';
import { packetsReducer } from './packets/reducers';
import { IMiscState, MISC_KEY } from './misc';
import { miscReducer } from './misc/reducers';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { FILES_PROCESSED_KEY, IProcessedFilesState } from './files-processed';
import { AppContextEffects } from './app-context/effects';
import { CrmContextEffects } from './crm-context/effects';
import { APP_CONTEXT_KEY, IAppContextState } from './app-context';
import { CRM_LEAD_KEY, ICrmLeadState } from './crm-lead-context';
import { appContextReducer } from './app-context/reducers';
import { crmLeadReducer } from './crm-lead-context/reducers';
import { CrmLeadContextEffects } from './crm-lead-context/effects';

export interface IState {
  [TOKEN_KEY]: ITokenState;
  [ADDRESSEE_KEY]: IAddresseeState;
  [APP_CONTEXT_KEY]: IAppContextState;
  [CRM_CONTEXT_KEY]: ICrmContextState;
  [CRM_LEAD_KEY]: ICrmLeadState;
  [FILES_PROCESSED_KEY]: IProcessedFilesState;
  [FILES_SOURCE_KEY]: ISourceFilesState;
  [MISC_KEY]: IMiscState;
  [PACKETS_KEY]: IPacketsState;
  [SIGNATURES_KEY]: ISignaturesState;
}

export const reducers: ActionReducerMap<IState> = {
  [TOKEN_KEY]: accessTokenReducer,
  [ADDRESSEE_KEY]: widgetContextReducer,
  [APP_CONTEXT_KEY]: appContextReducer,
  [CRM_CONTEXT_KEY]: crmContextReducer,
  [CRM_LEAD_KEY]: crmLeadReducer,
  [FILES_PROCESSED_KEY]: processedFilesReducer,
  [FILES_SOURCE_KEY]: sourceFilesReducer,
  [MISC_KEY]: miscReducer,
  [PACKETS_KEY]: packetsReducer,
  [SIGNATURES_KEY]: signaturesReducer,
};

export const effects = [
  AppContextEffects,
  CrmContextEffects,
  CrmLeadContextEffects,
];

export const metaReducers: MetaReducer<IState>[] = !environment.production
  ? []
  : [];

@Injectable()
export class AppEffects {
  constructor(private _actions$: Actions) {}
}
