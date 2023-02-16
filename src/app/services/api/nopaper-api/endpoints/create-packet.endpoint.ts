import { INewPacketData } from '../../../../store/interfaces';
import { INewPacketIdProps } from '../../../../store/misc/actions';
import { ApiService } from '../../api.service';
import { Observable, map } from 'rxjs';

type PostDraftFileItem = {
  fileName: string;
  filebase64: string;
};

interface IPostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: PostDraftFileItem[];
}

interface IPostDraftResponse {
  documentId: string;
}

const requestAdapter = (data: INewPacketData): IPostDraftRequest | never => {
  const { addressee, files, title } = data;

  let body: IPostDraftRequest = {
    clientFlPhoneNumber: undefined,
    clientUlInn: undefined,
    files: [],
    title: undefined,
  };

  switch (data.addressee.type) {
    case 'phone': {
      if (addressee.phone) {
        body.clientFlPhoneNumber = addressee.phone;
      } else {
        throw new Error('Phone is not defined');
      }
      break;
    }
    case 'vatId':
      {
        if (addressee.vatId) {
          body.clientUlInn = addressee.vatId;
        } else {
          throw new Error('VatId is not defined');
        }
      }
      break;
    default:
      throw new Error('Addressee is not defined');
  }

  body.files = files.map((file) => ({
    fileName: file.file.name,
    filebase64: file.base64,
  }));

  body.title = title;

  return body;
};

const responseAdapter = (response: IPostDraftResponse): INewPacketIdProps => ({
  packetId: parseInt(response.documentId),
});

export function createPacketEndpoint(
  this: ApiService,
  data: INewPacketData
): Observable<INewPacketIdProps> {
  return this.post<IPostDraftRequest, IPostDraftResponse>(
    '/document/create-for-client',
    requestAdapter(data)
  ).pipe(map(responseAdapter));
}
