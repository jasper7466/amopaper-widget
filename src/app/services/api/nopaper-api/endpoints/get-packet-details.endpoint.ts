import { IPacketDetailsProps } from '../../../../store/packets/actions';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';

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
): IPacketDetailsProps => ({
  packetId,
  title: response.title,
  creationDate: response.dateCreate,
});

export function getPacketDetailsEndpoint(
  this: ApiService,
  packetId: number
): Observable<IPacketDetailsProps> {
  return this.post<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
    `/document/details`,
    { documentId: packetId }
  ).pipe(map((response) => responseAdapter(packetId, response)));
}
