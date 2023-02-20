import { IFileInfo } from './file-info.interface';

export interface IBase64File extends IFileInfo {
  base64: string;
}
