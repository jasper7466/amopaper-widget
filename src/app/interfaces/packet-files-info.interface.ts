import { IFileInfo } from './file-info.interface';

export interface IPacketFilesInfo {
  count: number;
  originals: IFileInfo[];
  stamped: IFileInfo[];
}
