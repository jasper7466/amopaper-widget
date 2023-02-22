import { TFile } from 'src/app/interfaces/file.type';
import { IPacketFile } from 'src/app/interfaces/packet-file.interface';
import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';

export const FILES_PROCESSED_KEY = 'processed-files';

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
