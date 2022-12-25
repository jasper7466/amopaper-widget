import { initialState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
  resetFilesListAction,
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
      isComplete: false,
    };
  }),
  on(loadFileCompleteAction, (state, { id, base64 }) => {
    const fileIndex = state.files.findIndex((file) => file.id === id);

    if (fileIndex === -1) {
      throw new Error(`File with id ${id} does not exist`);
    }

    const filesCopy = [...state.files];
    let isComplete = false;

    filesCopy[fileIndex] = { ...filesCopy[fileIndex], base64, isLoaded: true };

    if (state.loadedCount + 1 === state.totalCount) {
      isComplete = true;
    }

    return {
      ...state,
      files: [...filesCopy],
      loadedCount: state.loadedCount + 1,
      isComplete,
    };
  }),
  on(resetFilesListAction, (state) => {
    // state.files.forEach((file) => file.onLoadSubscription?.unsubscribe());
    return { ...initialState };
  })
);
