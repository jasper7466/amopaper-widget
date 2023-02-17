export const FILES_SOURCE_KEY = 'source-files';

export type FileRecord = {
  id: number;
  file: File;
  base64: string;
  isLoaded: boolean;
};

export interface ISourceFilesState {
  files: FileRecord[];
  totalCount: number;
  loadedCount: number;
  isComplete: boolean;
}

export const initialState: ISourceFilesState = {
  files: [],
  totalCount: 0,
  loadedCount: 0,
  isComplete: false,
};

export const initialFileRecord: Omit<FileRecord, 'file' | 'id'> = {
  base64: '',
  isLoaded: false,
};
