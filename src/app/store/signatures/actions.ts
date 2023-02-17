import { SIGNATURES_KEY, ISignaturesState } from './index';
import { createAction, props } from '@ngrx/store';

export interface IFileSignaturesProps {
  payload: ISignaturesState['signature'];
}

export const setSignaturesAction = createAction(
  `[${SIGNATURES_KEY}] set signatures list`,
  props<IFileSignaturesProps>()
);

export const clearSignaturesAction = createAction(
  `[${SIGNATURES_KEY}] clear signatures action`
);
