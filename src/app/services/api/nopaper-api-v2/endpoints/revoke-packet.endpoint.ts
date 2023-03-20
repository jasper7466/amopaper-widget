import { Observable, map } from 'rxjs';
import { ApiService } from './../../api.service';

/** Тело запроса на отзыв пакета документов. */
interface IRevokePacketRequest {}

export function revokePacketEndpoint(
  this: ApiService,
  packetId: number
): Observable<void> {
  return this.put<IRevokePacketRequest, void>(
    `/document/${packetId}/revoke`,
    {}
  );
}
