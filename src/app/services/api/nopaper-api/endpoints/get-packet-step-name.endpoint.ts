import { NopaperStepName } from '../nopaper-api-common.types';
import { IPacketStatusProps } from '../../../../store/packets/actions';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../api.service';

interface IGetStepNameResponse {
  stepName: NopaperStepName;
}

const responseAdapter = (
  packetId: number,
  response: IGetStepNameResponse
): IPacketStatusProps => ({ packetId, stepName: response.stepName });

export function getPacketStepNameEndpoint(
  this: ApiService,
  packetId: number
): Observable<IPacketStatusProps> {
  return this.get<IGetStepNameResponse>(`/document/status/${packetId}`).pipe(
    map((response) => responseAdapter(packetId, response))
  );
}
