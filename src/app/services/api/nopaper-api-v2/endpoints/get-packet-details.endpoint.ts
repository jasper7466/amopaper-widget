import { IPacketDetailsProps } from './../../../../store/packets/actions';
import { Observable, map } from 'rxjs';
import { ApiService } from './../../api.service';
import {
  DOCUMENT_STATUS,
  ROUTE_TYPE,
  RecipientInfo,
} from '../nopaper-api-v2-common.types';

interface IGetPacketDetailsRequest {
  documentId: number;
}

interface IGetPacketDetailsResponse {
  recipientInfoList: RecipientInfo;
  title: string;
  documentStatus: DOCUMENT_STATUS;
  senderGuid: string;
  isEnableEdit: boolean;
  documentRouteType: ROUTE_TYPE;
  createTimeUtc: string;
}

const responseAdapter = (
  packetId: number,
  response: IGetPacketDetailsResponse
): IPacketDetailsProps => ({
  packetId,
  title: response.title,
  creationDate: response.createTimeUtc,
});

export function getPacketDetailsEndpoint(
  this: ApiService,
  packetId: number
): Observable<IPacketDetailsProps> {
  return this.post<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
    `/document/${packetId}`,
    { documentId: packetId }
  ).pipe(map((response) => responseAdapter(packetId, response)));
}
