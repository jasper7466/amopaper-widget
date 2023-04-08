import { Observable } from 'rxjs';
import { ApiService } from './../../api.service';

export function revokePacketEndpoint$(
  this: ApiService,
  packetId: number
): Observable<void> {
  return this.put$<Record<string, never>, void>(
    `/document/${packetId}/revoke`,
    {}
  );
}
