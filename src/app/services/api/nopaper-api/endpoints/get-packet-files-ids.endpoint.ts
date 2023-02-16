import { IFilesIdentifiersProps } from '../../../../store/signatures/actions';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';

interface IGetPacketFilesIdsRequest {
  documentId: number;
}

type DocumentListItem = {
  documentFileId: number;
  sourceDocumentFileId: number;
  fileName: string;
  size: number;
};

type DocumentListItemShortened = Omit<DocumentListItem, 'sourceDocumentFileId'>;

interface IGetPacketFilesIdsResponse {
  signDocumentList: DocumentListItem[];
  stampDocumentList: DocumentListItem[];
  ofertaOriginal: DocumentListItemShortened;
  ofertaWithStamp: DocumentListItemShortened;
  procuratoryOriginalList: DocumentListItemShortened[];
  procuratoryWithStampList: DocumentListItemShortened[];
}

const requestAdapter = (packetId: number): IGetPacketFilesIdsRequest => ({
  documentId: packetId,
});

const responseAdapter = (
  response: IGetPacketFilesIdsResponse
): IFilesIdentifiersProps => {
  const {
    signDocumentList,
    stampDocumentList,
    ofertaOriginal,
    ofertaWithStamp,
  } = response;

  const fileInfoMapper = (
    data: DocumentListItemShortened[]
  ): IFilesIdentifiersProps['originals'] =>
    data.map((item) => ({
      id: item.documentFileId,
      name: item.fileName,
      size: item.size,
    }));

  const originalFilesIds = fileInfoMapper(signDocumentList);
  const originalOfferId = fileInfoMapper([ofertaOriginal]);
  const stampedFilesIds = fileInfoMapper(stampDocumentList);
  const stampedOfferId = fileInfoMapper([ofertaWithStamp]);

  const originals = [...originalOfferId, ...originalFilesIds];
  const stamped = [...stampedOfferId, ...stampedFilesIds];

  return {
    count: originals.length,
    originals,
    stamped,
  };
};

export function getPacketFilesIdsEndpoint(
  this: ApiService,
  packetId: number
): Observable<IFilesIdentifiersProps> {
  return this.post<IGetPacketFilesIdsRequest, IGetPacketFilesIdsResponse>(
    '/document/file-description-v2',
    requestAdapter(packetId)
  ).pipe(map(responseAdapter));
}
