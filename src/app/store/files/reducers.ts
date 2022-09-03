import { initialFileRecord, initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import { addFilesAction, clearFilesListAction } from './actions';

export const widgetContextReducer = createReducer(
  initialState,
  on(addFilesAction, (state, payload) => {
    const newFiles = Array.from(payload.files).map((file) => ({
      ...initialFileRecord,
      file,
    }));

    return {
      ...state,
      files: [...state.files, ...newFiles],
    };
  }),
  on(clearFilesListAction, () => ({ ...initialState }))
);
