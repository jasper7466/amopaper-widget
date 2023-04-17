import { TSignatureInfo } from './signature-info.type';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface IFileSignatures {
    sender: TSignatureInfo;
    recipient: TSignatureInfo;
}
