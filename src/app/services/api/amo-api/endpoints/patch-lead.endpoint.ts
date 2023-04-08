import {
  IPatchLeadRequest,
  IPatchLeadResponse,
} from '../amo-api-custom-fields.types';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';

export function patchLeadEndpoint$(
  this: ApiService,
  id: number,
  data: Partial<IPatchLeadRequest>
): Observable<IPatchLeadResponse> {
  return this.patch$<Partial<IPatchLeadRequest>, IPatchLeadResponse>(
    `/leads/${id}`,
    data
  );
}
