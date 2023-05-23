import { IAddressee } from './addressee.interface';
import { IBase64File } from './file-base64.interface';

export interface IPacketCreateData {
    addressee$: IAddressee;
    files$: IBase64File[];
    title$: string;
}
