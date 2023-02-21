import { IPacketCreateData } from 'src/app/interfaces/packet-create-data.interface';
import { INewPacketIdProps } from '../../../../store/misc/actions';
import { ApiService } from '../../api.service';
import { Observable, map } from 'rxjs';
import { ADDRESSEE_ID_TYPE } from 'src/app/interfaces/addressee.interface';

type FileItem = {
  fileName: string;
  filebase64: string;
};

interface IPostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: FileItem[];
}

interface IPostDraftResponse {
  documentId: string;
}

const requestAdapter = (data: IPacketCreateData): IPostDraftRequest | never => {
  const { addressee, files, title } = data;

  let body: IPostDraftRequest = {
    clientFlPhoneNumber: undefined,
    clientUlInn: undefined,
    files: [],
    title: undefined,
  };

  switch (data.addressee.idType) {
    case ADDRESSEE_ID_TYPE.Phone: {
      body.clientFlPhoneNumber = addressee.idValue;
      break;
    }
    case ADDRESSEE_ID_TYPE.VatId: {
      body.clientUlInn = addressee.idValue;
      break;
    }
    default:
      throw new Error('Unexpected addressee id type.');
  }

  body.files = files.map((file) => ({
    fileName: file.name,
    filebase64: file.base64,
  }));

  if (title.length > 0) {
    body.title = title;
  }

  return body;
};

const responseAdapter = (response: IPostDraftResponse): INewPacketIdProps => ({
  packetId: parseInt(response.documentId),
});

export function createPacketEndpoint(
  this: ApiService,
  data: IPacketCreateData
): Observable<INewPacketIdProps> {
  return this.post<IPostDraftRequest, IPostDraftResponse>(
    '/document/create-for-client',
    requestAdapter(data)
  ).pipe(map(responseAdapter));
}
