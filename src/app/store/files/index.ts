import { Nullable } from './../../../types/common';
export const FILES_KEY = 'files';

type FileRecord = {
  file: File;
  base64: string;
  progress: number;
  isLoaded: boolean;
};

export interface IFilesState {
  files: FileRecord[];
}

export const initialState: IFilesState = {
  files: [],
};

export const initialFileRecord: Omit<FileRecord, 'file'> = {
  base64: '',
  progress: 0,
  isLoaded: false,
};
