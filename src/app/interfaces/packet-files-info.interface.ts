import { IFileInfo } from './file-info.interface';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface IPacketFilesInfo {
    originals: IFileInfo[];
    stamped: IFileInfo[];
}
