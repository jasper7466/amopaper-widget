import { ISourceFilesState, FILES_SOURCE_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { FileRecord } from '.';

interface IAddSourceFilesProps extends Pick<ISourceFilesState, 'files'> {}
interface ICompleteSourceFileProps extends Pick<FileRecord, 'id' | 'base64'> {}

export const sourceFilesAddAction = createAction(
  `[${FILES_SOURCE_KEY}] new source files added`,
  props<IAddSourceFilesProps>()
);

export const sourceFileCompleteAction = createAction(
  `[${FILES_SOURCE_KEY}] one of source file is loaded`,
  props<ICompleteSourceFileProps>()
);

export const sourceFilesResetAction = createAction(
  `[${FILES_SOURCE_KEY}] source files list cleared`
);
