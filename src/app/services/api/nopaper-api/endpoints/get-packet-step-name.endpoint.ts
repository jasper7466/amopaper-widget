import { TNopaperStepName } from '../nopaper-api-common.types';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

interface IGetStepNameResponse {
  stepName: TNopaperStepName;
}

type TResponse = Pick<IPacketDetails, 'id' | 'status'>;

const responseAdapter = (
  packetId: number,
  response: IGetStepNameResponse
): Pick<IPacketDetails, 'id' | 'status'> => ({
  id: packetId,
  status: response.stepName,
});

export function getPacketStepNameEndpoint(
  this: ApiService,
  packetId: number
): Observable<TResponse> {
  return this.get<IGetStepNameResponse>(`/document/status/${packetId}`).pipe(
    map((response) => responseAdapter(packetId, response))
  );
}
