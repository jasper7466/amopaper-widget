import { IFileInfo } from './file-info.interface';
import { TFile } from './file.type';

export interface IPacketFile extends Pick<IFileInfo, 'id'> {
  file: TFile;
}
