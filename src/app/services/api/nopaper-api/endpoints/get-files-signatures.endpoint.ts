import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { IFileInfo } from 'src/app/interfaces/file-info.interface';
import { IFileSignatures } from 'src/app/interfaces/file-signatures.interface';

interface IGetFileSignatureRequest {
  documentFileId: number;
}

type TSnapshot = {
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

type TSignatureInfo = {
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
  snapshot: TSnapshot;
};

type TGetFileSignatureResponse = [TSignatureInfo, TSignatureInfo];

const requestAdapter = (data: IFileInfo): IGetFileSignatureRequest => ({
  documentFileId: data.id,
});

const responseAdapter = (
  response: TGetFileSignatureResponse
): IFileSignatures | never => {
  if (response.length < 2) {
    throw new Error('Expected 2 items but got fewer');
  }

  const signatures = response.map((signature) => ({
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
  }));

  return { sender: signatures[0], recipient: signatures[1] };
};

export function getFileSignaturesEndpoint(
  this: ApiService,
  fileIds: IFileInfo
): Observable<IFileSignatures> {
  return this.post<IGetFileSignatureRequest, TGetFileSignatureResponse>(
    '/file/signatures',
    requestAdapter(fileIds)
  ).pipe(map(responseAdapter));
}
