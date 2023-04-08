import { IFileSignatures } from 'src/app/interfaces/file-signatures.interface';
import { TSignatureInfo } from 'src/app/interfaces/signature-info.type';

export const signaturesKey = 'signatures';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
export interface ISignaturesState {
  signatures: IFileSignatures;
}

const initialSignature: TSignatureInfo = {
  userFullName: '',
  userGuid: '',
  confirmCode: '',
  signature: '',
  signingDateTime: '',
  isCompany: false,
  company: {
    name: '',
    vatId: '',
    auditId: -1,
    auditIssueDateTimeUtc: '',
  },
};

export const initialState: ISignaturesState = {
  signatures: {
    sender: initialSignature,
    recipient: initialSignature,
  },
};
