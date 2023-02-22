import { Observable, map } from 'rxjs';
import { ApiService } from './../../api.service';
import {
  DOCUMENT_STATUS,
  ROUTE_TYPE,
  RecipientInfo,
} from '../nopaper-api-v2-common.types';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

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
): Omit<IPacketDetails, 'status'> => ({
  id: packetId,
  title: response.title,
  createTimeUtc: response.createTimeUtc,
});

export function getPacketDetailsEndpoint(
  this: ApiService,
  packetId: number
): Observable<Omit<IPacketDetails, 'status'>> {
  return this.post<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
    `/document/${packetId}`,
    { documentId: packetId }
  ).pipe(map((response) => responseAdapter(packetId, response)));
}
