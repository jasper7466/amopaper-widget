import { IFileSignaturesProps } from '../../../../store/signatures/actions';
import { IFileInfo } from '../../../../store/signatures/index';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';

interface IGetFileSignatureRequest {
  documentFileId: number;
}

type Snapshot = {
  companyInn: string;
  companyName: string;
  companyNameOpf: string;
  signerIsHead: boolean;
  headPosition: string;
  employeePosition: string;
  procuratoryId: number;
  procuratoryIssueDateTimeUtc: string;
  procuratoryRevokeDateTimeUtc: string;
};

type SignatureInfo = {
  certificateId: number;
  certificateOwner: string;
  confirmCode: string;
  cryptoProviderUserIdentifer: string;
  documentFileId: number;
  signature: string;
  signingDateTime: string;
  userGuid: string;
  signatureInfoFileTxt: string;
  isUl: boolean;
  snapshot: Snapshot;
};

type TGetFileSignatureResponse = [SignatureInfo, SignatureInfo];

const requestAdapter = (data: IFileInfo): IGetFileSignatureRequest => ({
  documentFileId: data.id,
});

const responseAdapter = (
  response: TGetFileSignatureResponse
): IFileSignaturesProps => {
  if (response.length < 2) {
    throw new Error('Expected 2 items but got fewer');
  }

  const payload = response.map((signature) => ({
    userFullName: signature.certificateOwner,
    userGuid: signature.userGuid,
    signature: signature.signature,
    confirmCode: signature.confirmCode,
    signingDateTime: signature.signingDateTime,
    isCompany: signature.isUl,
    company: {
      name: signature.snapshot.companyName,
      vatId: signature.snapshot.companyInn,
      auditId: signature.snapshot.procuratoryId,
      auditIssueDateTimeUtc: signature.snapshot.procuratoryIssueDateTimeUtc,
    },
  })) as IFileSignaturesProps['payload'];

  return {
    payload,
  };
};

export function getFileSignaturesEndpoint(
  this: ApiService,
  fileIds: IFileInfo
): Observable<IFileSignaturesProps> {
  return this.post<IGetFileSignatureRequest, TGetFileSignatureResponse>(
    '/file/signatures',
    requestAdapter(fileIds)
  ).pipe(map(responseAdapter));
}
