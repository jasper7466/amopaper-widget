import { createAction, props } from '@ngrx/store';

export const addFilesAction = createAction(
  '[FILES] add new files',
  props<{ files: FileList }>()
);

export const clearFilesListAction = createAction('[FILES] clear files list');
