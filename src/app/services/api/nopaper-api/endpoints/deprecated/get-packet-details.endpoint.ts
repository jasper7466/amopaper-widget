import { Observable, map } from 'rxjs';
import { ApiService } from '../../../api.service';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

type TDocumentDataNames =
  | 'NOP_TAB_NOPAPER_DRAFT'
  | 'NOP_TAB_NOPAPER_DOWNLOAD_DOCUMENTS'
  | 'NOP_TAB_NOPAPER_SEND_SIGN_DOCUMENTS';

interface IGetPacketDetailsRequest {
    documentId: number;
    documentDataNames?: TDocumentDataNames[];
}

type TDocumentData = {
    name: string;
    data: { [key: string]: unknown };
};

interface IGetPacketDetailsResponse {
    documentData: TDocumentData[];
    isOwner: boolean;
    title: string;
    stepId: number;
    workflowId: number;
    dateCreate: string;
    availableStatuses: unknown[];
}

const responseAdapter = (
    packetId: number,
    response: IGetPacketDetailsResponse,
): Omit<IPacketDetails, 'status'> => ({
    id: packetId,
    title: response.title,
    createTimeUtc: response.dateCreate,
});

/** @deprecated */
export function getPacketDetailsEndpoint$(
    this: ApiService,
    packetId: number,
): Observable<Omit<IPacketDetails, 'status'>> {
    throw new Error('getPacketDetailsEndpoint v1 is deprecated.');

    return this.post$<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
        `/document/details`,
        { documentId: packetId },
    ).pipe(map((response) => responseAdapter(packetId, response)));
}
