import { Observable, Subscription } from 'rxjs';

export const FILES_KEY = 'files';

export type FileRecord = {
  id: number;
  file: File;
  base64: string;
  onLoadSubscription: Subscription | null;
  isLoaded: boolean;
};

export interface IFilesState {
  files: FileRecord[];
  totalCount: number;
  loadedCount: number;
  isComplete: boolean;
}

export const initialState: IFilesState = {
  files: [],
  totalCount: 0,
  loadedCount: 0,
  isComplete: false,
};

export const initialFileRecord: Omit<FileRecord, 'file' | 'id'> = {
  base64: '',
  onLoadSubscription: null,
  isLoaded: false,
};
