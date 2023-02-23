import { ApiService } from '../../api.service';
import { Observable, map } from 'rxjs';
import { getLeadEndpoint } from './get-lead.endpoint';
import { IGetLeadByIdResponse } from '../amo-api-custom-fields.types';

const responseAdapter = <T>(
  customFieldId: number,
  response: IGetLeadByIdResponse
): T | null | never => {
  if (response.custom_fields_values === null) {
    return null;
  }

  const customFieldValues = response.custom_fields_values.filter(
    (item) => item.field_id === customFieldId
  );

  if (customFieldValues.length === 0) {
    return null;
  }

  if (customFieldValues.length > 1) {
    throw new Error('More than one custom field with the same id');
  }

  return customFieldValues[0].values[0].value;
};

export function getLeadCustomFieldValueCustomEndpoint<T>(
  this: ApiService,
  leadId: number,
  customFieldId: number
): Observable<T | null> | never {
  return getLeadEndpoint
    .call(this, leadId)
    .pipe(map((response) => responseAdapter(customFieldId, response)));
}
