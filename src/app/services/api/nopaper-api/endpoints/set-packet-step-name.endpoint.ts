import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { PacketStatus } from 'src/app/store/packets';

interface IPostStepNameRequest {
  documentId: number;
  stepSystemName: string;
}

interface IPostStepNameResponse {}

const requestAdapter = (
  packetId: number,
  status: PacketStatus
): IPostStepNameRequest => ({ documentId: packetId, stepSystemName: status });

export function setPacketStepNameEndpoint(
  this: ApiService,
  packetId: number,
  status: PacketStatus
): Observable<IPostStepNameResponse> {
  return this.post<IPostStepNameRequest, IPostStepNameResponse>(
    '/document/changestep',
    requestAdapter(packetId, status)
  );
}
