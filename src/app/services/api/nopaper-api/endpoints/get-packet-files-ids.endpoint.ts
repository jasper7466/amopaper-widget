import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';
import { IFileInfo } from 'src/app/interfaces/file-info.interface';

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
interface IGetPacketFilesIdsRequest {
    documentId: number;
}

type TDocumentListItem = {
    documentFileId: number;
    sourceDocumentFileId: number;
    fileName: string;
    size: number;
};

type TDocumentListItemShortened = Omit<
TDocumentListItem,
'sourceDocumentFileId'
>;

// Употребляется во множественном числе
// eslint-disable-next-line prefer-singular-interfaces
interface IGetPacketFilesIdsResponse {
    signDocumentList: TDocumentListItem[];
    stampDocumentList: TDocumentListItem[];
    ofertaOriginal: TDocumentListItemShortened;
    ofertaWithStamp?: TDocumentListItemShortened;
    procuratoryOriginalList: TDocumentListItemShortened[];
    procuratoryWithStampList: TDocumentListItemShortened[];
}

const requestAdapter = (packetId: number): IGetPacketFilesIdsRequest => ({
    documentId: packetId,
});

const responseAdapter = (
    response: IGetPacketFilesIdsResponse,
): IPacketFilesInfo => {
    const {
        signDocumentList,
        stampDocumentList,
        ofertaOriginal,
        ofertaWithStamp,
    } = response;

    const fileInfoMapper = (data: TDocumentListItemShortened[]): IFileInfo[] =>
        data.map((item) => ({
            id: item.documentFileId,
            name: item.fileName,
            size: item.size,
        }));

    const originalFilesIds = fileInfoMapper(signDocumentList);
    const originalOfferId = fileInfoMapper([ofertaOriginal]);
    const stampedFilesIds = fileInfoMapper(stampDocumentList);
    const stampedOfferId = ofertaWithStamp
        ? fileInfoMapper([ofertaWithStamp])
        : [];

    const originals = [
        ...originalOfferId,
        ...originalFilesIds,
    ];
    const stamped = [
        ...stampedOfferId,
        ...stampedFilesIds,
    ];

    return {
        originals,
        stamped,
    };
};

export function getPacketFilesIdsEndpoint$(
    this: ApiService,
    packetId: number,
): Observable<IPacketFilesInfo> {
    return this.post$<IGetPacketFilesIdsRequest, IGetPacketFilesIdsResponse>(
        '/document/file-description-v2',
        requestAdapter(packetId),
    ).pipe(map(responseAdapter));
}
