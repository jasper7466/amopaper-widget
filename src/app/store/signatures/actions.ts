import { createAction, props } from '@ngrx/store';
import {
  IGetFilesByIdsResponse,
  IGetFilesIdentifiersResponse,
  IGetFileSignatureResponse,
} from './../../services/api/nopaper/nopaper-api.types';

export const setFilesIdentifiersAction = createAction(
  '[SIGNATURES] set files identifiers action',
  props<IGetFilesIdentifiersResponse>()
);

export const setFilesAction = createAction(
  '[SIGNATURES] set files action',
  props<{ payload: IGetFilesByIdsResponse }>()
);

export const setFileSignatureAction = createAction(
  '[SIGNATURES] set signatures list',
  props<IGetFileSignatureResponse>()
);
