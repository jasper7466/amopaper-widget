import { processedFilesReducer } from './files-processed/reducers';
import { widgetContextReducer } from './addressee/reducers';
import { addresseeKey, IAddresseeState } from './addressee/index';
import { accessTokenReducer } from './access-token/reducers';
import { tokenKey, ITokenState } from './access-token/index';
import { ICrmContextState, crmContextKey } from './crm-context/index';
import { environment } from '../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { crmContextReducer } from './crm-context/reducers';
import { filesSourceKey, ISourceFilesState } from './files-source';
import { sourceFilesReducer } from './files-source/reducers';
import { ISignaturesState, signaturesKey } from './signatures';
import { signaturesReducer } from './signatures/reducers';
import { IPacketsState, packetsKey } from './packets';
import { packetsReducer } from './packets/reducers';
import { IMiscState, miscKey } from './misc';
import { miscReducer } from './misc/reducers';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { filesProcessedKey, IProcessedFilesState } from './files-processed';
import { AppContextEffects } from './app-context/effects';
import { CrmContextEffects } from './crm-context/effects';
import { appContextKey, IAppContextState } from './app-context';
import { crmLeadKey, ICrmLeadState } from './crm-lead-context';
import { appContextReducer } from './app-context/reducers';
import { crmLeadReducer } from './crm-lead-context/reducers';
import { CrmLeadContextEffects } from './crm-lead-context/effects';

export interface IState {
    [tokenKey]: ITokenState;
    [addresseeKey]: IAddresseeState;
    [appContextKey]: IAppContextState;
    [crmContextKey]: ICrmContextState;
    [crmLeadKey]: ICrmLeadState;
    [filesProcessedKey]: IProcessedFilesState;
    [filesSourceKey]: ISourceFilesState;
    [miscKey]: IMiscState;
    [packetsKey]: IPacketsState;
    [signaturesKey]: ISignaturesState;
}

export const reducers: ActionReducerMap<IState> = {
    [tokenKey]: accessTokenReducer,
    [addresseeKey]: widgetContextReducer,
    [appContextKey]: appContextReducer,
    [crmContextKey]: crmContextReducer,
    [crmLeadKey]: crmLeadReducer,
    [filesProcessedKey]: processedFilesReducer,
    [filesSourceKey]: sourceFilesReducer,
    [miscKey]: miscReducer,
    [packetsKey]: packetsReducer,
    [signaturesKey]: signaturesReducer,
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
