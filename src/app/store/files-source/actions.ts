import { IFileInfo } from 'src/app/interfaces/file-info.interface';
import { filesSourceKey } from './index';
import { createAction, props } from '@ngrx/store';
import { IBase64File } from 'src/app/interfaces/file-base64.interface';

export const sourceFilesAddAction = createAction(
    `[${filesSourceKey}] new source files added`,
    props<{ payload: IFileInfo[] }>()
);

export const sourceFileCompleteAction = createAction(
    `[${filesSourceKey}] one of source file is loaded`,
    props<Pick<IBase64File, 'id' | 'base64'>>()
);

export const sourceFilesResetAction = createAction(
    `[${filesSourceKey}] source files list cleared`
);
