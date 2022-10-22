import { createAction, props } from '@ngrx/store';
import {
  IGetFilesIdentifiersResponse,
  IGetFileSignatureResponse,
} from 'src/app/services/api/nopaper/nopaper-api.types';

export const setFilesIdentifiersAction = createAction(
  '[SIGNATURES] set signatures list',
  props<IGetFilesIdentifiersResponse>()
);

export const setFileSignatureAction = createAction(
  '[SIGNATURES] set signatures list',
  props<IGetFileSignatureResponse>()
);
