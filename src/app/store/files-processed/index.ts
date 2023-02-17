export const FILES_PROCESSED_KEY = 'processed-files';

export interface IFileInfo {
  id: number;
  name: string;
  size: number;
}

export interface IFilesIdentifiers {
  count: number;
  originals: IFileInfo[];
  stamped: IFileInfo[];
}

export interface IProcessedFilesState {
  identifiers: IFilesIdentifiers;
  originalFiles: File[];
}

export const initialState: IProcessedFilesState = {
  identifiers: {
    count: 0,
    originals: [],
    stamped: [],
  },
  originalFiles: [],
};
