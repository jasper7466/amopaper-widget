import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { TPacketStatus } from 'src/app/interfaces/packet-status.type';

interface IPostStepNameRequest {
  documentId: number;
  stepSystemName: string;
}

const requestAdapter = (
  packetId: number,
  status: TPacketStatus
): IPostStepNameRequest => ({ documentId: packetId, stepSystemName: status });

export function setPacketStepNameEndpoint(
  this: ApiService,
  packetId: number,
  status: TPacketStatus
): Observable<void> {
  return this.post<IPostStepNameRequest, void>(
    '/document/changestep',
    requestAdapter(packetId, status)
  );
}
