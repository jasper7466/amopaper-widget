import {
  IGetFilesIdentifiersResponse,
  IGetFileSignatureResponse,
} from 'src/app/services/api/nopaper/nopaper-api.types';

export const SIGNATURES_KEY = 'signatures';

export interface ISignaturesState {
  identifiers: IGetFilesIdentifiersResponse;
  signature: IGetFileSignatureResponse;
}

export const initialState: ISignaturesState = {
  identifiers: {
    signDocumentList: [],
    stampDocumentList: [],
    ofertaOriginal: [],
    ofertaWithStamp: [],
    procuratoryOriginalList: [],
    procuratoryWithStampList: [],
  },
  signature: [
    {
      certificateId: -1,
      certificateOwner: '',
      confirmCode: '',
      cryptoProviderUserIdentifer: '',
      documentFileId: -1,
      signature: '',
      signingDateTime: '',
      userGuid: '',
      signatureInfoFileTxt: '',
      isUl: false,
      snapshot: {
        companyInn: '',
        companyName: '',
        companyNameOpf: '',
        signerIsHead: false,
        headPosition: '',
        employeePosition: '',
        procuratoryId: -1,
        procuratoryIssueDateTimeUtc: '',
        procuratoryRevokeDateTimeUtc: '',
      },
    },
    {
      certificateId: -1,
      certificateOwner: '',
      confirmCode: '',
      cryptoProviderUserIdentifer: '',
      documentFileId: -1,
      signature: '',
      signingDateTime: '',
      userGuid: '',
      signatureInfoFileTxt: '',
      isUl: false,
      snapshot: {
        companyInn: '',
        companyName: '',
        companyNameOpf: '',
        signerIsHead: false,
        headPosition: '',
        employeePosition: '',
        procuratoryId: -1,
        procuratoryIssueDateTimeUtc: '',
        procuratoryRevokeDateTimeUtc: '',
      },
    },
  ],
};
