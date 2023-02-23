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
import { SignaturesEffects } from './signatures/effects';
import { FILES_PROCESSED_KEY, IProcessedFilesState } from './files-processed';
import { AppContextEffects } from './app-context/effects';

export interface State {
  [CRM_CONTEXT_KEY]: ICrmContextState;
  [TOKEN_KEY]: ITokenState;
  [ADDRESSEE_KEY]: IAddresseeState;
  [FILES_SOURCE_KEY]: ISourceFilesState;
  [FILES_PROCESSED_KEY]: IProcessedFilesState;
  [SIGNATURES_KEY]: ISignaturesState;
  [PACKETS_KEY]: IPacketsState;
  [MISC_KEY]: IMiscState;
}

export const reducers: ActionReducerMap<State> = {
  [CRM_CONTEXT_KEY]: crmContextReducer,
  [TOKEN_KEY]: accessTokenReducer,
  [ADDRESSEE_KEY]: widgetContextReducer,
  [FILES_SOURCE_KEY]: sourceFilesReducer,
  [FILES_PROCESSED_KEY]: processedFilesReducer,
  [SIGNATURES_KEY]: signaturesReducer,
  [PACKETS_KEY]: packetsReducer,
  [MISC_KEY]: miscReducer,
};

export const effects = [SignaturesEffects, AppContextEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}
}
