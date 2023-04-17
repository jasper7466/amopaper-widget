import { Observable } from 'rxjs';
import { IGetLeadByIdResponse } from '../amo-api-custom-fields.types';
import { ApiService } from '../../api.service';

export function getLeadEndpoint$(
    this: ApiService,
    id: number
): Observable<IGetLeadByIdResponse> {
    return this.get$(`/leads/${id}`);
}
