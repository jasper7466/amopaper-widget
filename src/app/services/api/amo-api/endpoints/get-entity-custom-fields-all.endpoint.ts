import { EMPTY, Observable, expand, map, reduce } from 'rxjs';
import { IGetCustomFieldsResponse } from '../amo-api-custom-fields.types';
import { ApiService } from '../../api.service';
import { ICrmCustomFieldInfo } from 'src/app/interfaces/crm-custom-field.interface-info';

type TEntity = 'leads' | 'companies';

const responseAdapter = (
  response: IGetCustomFieldsResponse
): ICrmCustomFieldInfo[] => {
  return response._embedded.custom_fields.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

export function getEntityCustomFieldsAllEndpoint(
  this: ApiService,
  entityType: TEntity
): Observable<ICrmCustomFieldInfo[]> {
  return this.get<IGetCustomFieldsResponse>(
    `/${entityType}/custom_fields`
  ).pipe(
    expand((response) =>
      response._links.next
        ? // TODO: для работы через прокси в режиме разработки
          // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
          this.get<IGetCustomFieldsResponse>(
            `/${entityType}/custom_fields?page=${++response._page}`
          )
        : EMPTY
    ),
    map(responseAdapter),
    reduce((acc, current) => acc.concat(current))
  );
}
