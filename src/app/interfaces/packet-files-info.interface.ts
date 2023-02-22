import { IFileInfo } from './file-info.interface';

export interface IPacketFilesInfo {
  originals: IFileInfo[];
  stamped: IFileInfo[];
}
