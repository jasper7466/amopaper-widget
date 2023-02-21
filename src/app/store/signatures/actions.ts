import { IFileSignatures } from 'src/app/interfaces/file-signatures.interface';
import { SIGNATURES_KEY } from './index';
import { createAction, props } from '@ngrx/store';

export const setSignaturesAction = createAction(
  `[${SIGNATURES_KEY}] set signatures list`,
  props<IFileSignatures>()
);

export const clearSignaturesAction = createAction(
  `[${SIGNATURES_KEY}] clear signatures action`
);
