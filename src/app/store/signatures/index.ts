import { DocumentListItemShortened } from './../../services/api/nopaper-api/nopaper-api.types';
import { IGetFilesByIdsResponse } from '../../services/api/nopaper-api/nopaper-api.types';
import {
  IGetFilesIdsResponse,
  IGetFileSignatureResponse,
} from 'src/app/services/api/nopaper-api/nopaper-api.types';

export const SIGNATURES_KEY = 'signatures';

export interface ISignaturesState {
  identifiers: IGetFilesIdsResponse;
  rawFiles: IGetFilesByIdsResponse;
  decodedFiles: File[];
  signature: IGetFileSignatureResponse;
}

export const initialState: ISignaturesState = {
  identifiers: {
    signDocumentList: [],
    stampDocumentList: [],
    ofertaOriginal: {} as DocumentListItemShortened,
    ofertaWithStamp: {} as DocumentListItemShortened,
    procuratoryOriginalList: [],
    procuratoryWithStampList: [],
  },
  rawFiles: [],
  decodedFiles: [],
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
