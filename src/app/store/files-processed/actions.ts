import {
  IProcessedFilesState,
  FILES_PROCESSED_KEY,
  IFilesIdentifiers,
} from './index';
import { createAction, props } from '@ngrx/store';

export interface IFilesIdentifiersProps extends IFilesIdentifiers {}
export interface IOriginalFilesProps {
  payload: File[];
}

export const setIdentifiersAction = createAction(
  `[${FILES_PROCESSED_KEY}] set processed files identifiers action`,
  props<IFilesIdentifiersProps>()
);

export const setOriginalsFilesAction = createAction(
  `[${FILES_PROCESSED_KEY}] set original processed files action`,
  props<IOriginalFilesProps>()
);
