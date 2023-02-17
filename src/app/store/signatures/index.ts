export const SIGNATURES_KEY = 'signatures';

type CompanyInfo = {
  name: string;
  vatId: string;
  auditId: number;
  auditIssueDateTimeUtc: string;
};

export type SignatureInfo = {
  userFullName: string;
  userGuid: string;
  confirmCode: string;
  signature: string;
  signingDateTime: string;
  isCompany: boolean;
  company: CompanyInfo;
};

export interface ISignaturesState {
  signature: [SignatureInfo, SignatureInfo];
}

export const initialState: ISignaturesState = {
  signature: [
    {
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
    },
    {
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
    },
  ],
};
