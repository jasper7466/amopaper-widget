import { ISourceFilesState } from './files-source/index';
import { IAddresseeState } from './addressee';
import { IMiscState } from './misc';

export interface INewPacketData {
  addressee: IAddresseeState;
  files: ISourceFilesState['files'];
  title: IMiscState['packetTitle'];
}
