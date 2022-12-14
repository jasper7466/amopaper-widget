import { SIGNATURES_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import {
  IGetFilesByIdsResponse,
  IGetFilesIdentifiersResponse,
  IGetFileSignatureResponse,
} from './../../services/api/nopaper/nopaper-api.types';

export const setFilesIdentifiersAction = createAction(
  `[${SIGNATURES_KEY}] set files identifiers action`,
  props<IGetFilesIdentifiersResponse>()
);

export const setRawFilesAction = createAction(
  `[${SIGNATURES_KEY}] set raw files action`,
  props<{ payload: IGetFilesByIdsResponse }>()
);

export const setDecodedFilesAction = createAction(
  `[${SIGNATURES_KEY}] set decoded files action`,
  props<{ payload: File[] }>()
);

export const clearFilesAction = createAction(
  `[${SIGNATURES_KEY}] clear files action`
);

export const setFileSignatureAction = createAction(
  `[${SIGNATURES_KEY}] set signatures list`,
  props<IGetFileSignatureResponse>()
);
