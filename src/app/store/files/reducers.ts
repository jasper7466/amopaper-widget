import { initialFileRecord, initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  clearFilesListAction,
  addFilesAction,
  loadFileCompleteAction,
} from './actions';

export const filesReducer = createReducer(
  initialState,
  on(addFilesAction, (state, { files }) => {
    return {
      ...state,
      files: [...state.files, ...files],
      totalCount: state.files.length + files.length,
    };
  }),
  on(loadFileCompleteAction, (state, { id, base64 }) => {
    const fileIndex = state.files.findIndex((file) => file.id === id);

    if (fileIndex === -1) {
      throw new Error(`File with id ${id} does not exist`);
    }

    const filesCopy = [...state.files];
    filesCopy[fileIndex] = { ...filesCopy[fileIndex], base64, isLoaded: true };

    return {
      ...state,
      files: [...filesCopy],
      loadedCount: state.loadedCount + 1,
    };
  }),
  on(clearFilesListAction, (state) => {
    // state.files.forEach((file) => file.onLoadSubscription?.unsubscribe());
    return { ...initialState };
  })
);
