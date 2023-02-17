import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { PacketStatus } from 'src/app/store/packets';

interface IPostStepNameRequest {
  documentId: number;
  stepSystemName: string;
}

const requestAdapter = (
  packetId: number,
  status: PacketStatus
): IPostStepNameRequest => ({ documentId: packetId, stepSystemName: status });

export function setPacketStepNameEndpoint(
  this: ApiService,
  packetId: number,
  status: PacketStatus
): Observable<void> {
  return this.post<IPostStepNameRequest, void>(
    '/document/changestep',
    requestAdapter(packetId, status)
  );
}
