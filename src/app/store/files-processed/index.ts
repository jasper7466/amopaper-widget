import { IPacketFile } from 'src/app/interfaces/packet-file.interface';
import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';

export const filesProcessedKey = 'processed-files';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface IProcessedFilesState {
  identifiers: IPacketFilesInfo;
  originalFiles: IPacketFile[];
}

export const initialState: IProcessedFilesState = {
  identifiers: {
    originals: [],
    stamped: [],
  },
  originalFiles: [],
};
