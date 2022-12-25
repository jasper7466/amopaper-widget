import { createAction, props } from '@ngrx/store';
import { FileRecord } from '.';

export const addFilesAction = createAction(
  '[FILES] add new files',
  props<{ files: FileRecord[] }>()
);

export const loadFileCompleteAction = createAction(
  '[FILES] file loaded',
  props<{ id: number; base64: string }>()
);

export const resetFilesListAction = createAction('[FILES] clear files list');
