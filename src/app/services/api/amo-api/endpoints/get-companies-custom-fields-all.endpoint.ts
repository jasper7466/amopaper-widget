import { EMPTY, Observable, expand, map, reduce } from 'rxjs';
import { IGetCustomFieldsResponse } from '../amo-api-custom-fields.types';
import { ApiService } from '../../api.service';
import { ICrmCustomField } from 'src/app/interfaces/crm-custom-field.interface';

const responseAdapter = (
  response: IGetCustomFieldsResponse
): ICrmCustomField[] => {
  return response._embedded.custom_fields.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

export function getCompaniesCustomFieldsAllEndpoint(
  this: ApiService
): Observable<ICrmCustomField[]> {
  return this.get<IGetCustomFieldsResponse>('/companies/custom_fields').pipe(
    expand((response) =>
      response._links.next
        ? // TODO: для работы через прокси в режиме разработки
          // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
          this.get<IGetCustomFieldsResponse>(
            `/companies/custom_fields?page=${++response._page}`
          )
        : EMPTY
    ),
    map(responseAdapter),
    reduce((acc, current) => acc.concat(current))
  );
}
