import { IBase64File } from 'src/app/interfaces/file-base64.interface';

export const filesSourceKey = 'source-files';

export interface IFileRecord extends IBase64File {
    isLoaded: boolean;
}

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface ISourceFilesState {
    files: IFileRecord[];
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

export const initialFileRecord: Pick<IFileRecord, 'base64' | 'isLoaded'> = {
    base64: '',
    isLoaded: false,
};
