import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

type DocumentDataNames =
  | 'NOP_TAB_NOPAPER_DRAFT'
  | 'NOP_TAB_NOPAPER_DOWNLOAD_DOCUMENTS'
  | 'NOP_TAB_NOPAPER_SEND_SIGN_DOCUMENTS';

interface IGetPacketDetailsRequest {
  documentId: number;
  documentDataNames?: DocumentDataNames[];
}

type DocumentData = {
  name: string;
  data: { [key: string]: any };
};

interface IGetPacketDetailsResponse {
  documentData: DocumentData[];
  isOwner: boolean;
  title: string;
  stepId: number;
  workflowId: number;
  dateCreate: string;
  availableStatuses: any[];
}

const responseAdapter = (
  packetId: number,
  response: IGetPacketDetailsResponse
): Omit<IPacketDetails, 'status'> => ({
  id: packetId,
  title: response.title,
  createTimeUtc: response.dateCreate,
});

export function getPacketDetailsEndpoint(
  this: ApiService,
  packetId: number
): Observable<Omit<IPacketDetails, 'status'>> {
  return this.post<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
    `/document/details`,
    { documentId: packetId }
  ).pipe(map((response) => responseAdapter(packetId, response)));
}
