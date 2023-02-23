import {
  IPatchLeadRequest,
  IPatchLeadResponse,
} from '../amo-api-custom-fields.types';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { ICrmCustomFieldPatch } from 'src/app/interfaces/crm-custom-field-patch.interface';
import { patchLeadEndpoint } from './patch-lead.endpoint';

const requestAdapter = (
  request: ICrmCustomFieldPatch
): Pick<IPatchLeadRequest, 'custom_fields_values'> => ({
  custom_fields_values: [
    {
      field_id: request.id,
      values: [request.data],
    },
  ],
});

export function patchLeadCustomFieldValueCustomEndpoint(
  this: ApiService,
  leadId: number,
  data: ICrmCustomFieldPatch
): Observable<IPatchLeadResponse> {
  return patchLeadEndpoint.call(this, leadId, requestAdapter(data));
}
