import { IFileInfo } from 'src/app/interfaces/file-info.interface';
import { FILES_SOURCE_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { IBase64File } from 'src/app/interfaces/file-base64.interface';

export const sourceFilesAddAction = createAction(
  `[${FILES_SOURCE_KEY}] new source files added`,
  props<{ payload: IFileInfo[] }>()
);

export const sourceFileCompleteAction = createAction(
  `[${FILES_SOURCE_KEY}] one of source file is loaded`,
  props<Pick<IBase64File, 'id' | 'base64'>>()
);

export const sourceFilesResetAction = createAction(
  `[${FILES_SOURCE_KEY}] source files list cleared`
);
