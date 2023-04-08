import { EMPTY, Observable, expand } from 'rxjs';
import { ApiService } from '../../api.service';
import { IGetLeadAttachmentsResponse, TNoteType } from '../amo-api-notes.types';

const noteType: TNoteType = 'attachment';

export function getLeadAttachmentsEndpoint$(
  this: ApiService,
  leadId: number
): Observable<IGetLeadAttachmentsResponse> {
  return this.get$<IGetLeadAttachmentsResponse>(
    `/leads/${leadId}/notes?filter[note_type][0]=${noteType}`
  ).pipe(
    expand((response) =>
      response._links.next
        ? // TODO: для работы через прокси в режиме разработки
          // ? this.get$<GetCustomFieldsResponse>(response._links.next.href)
          this.get$<IGetLeadAttachmentsResponse>(
            `/companies/custom_fields?page=${++response._page}`
          )
        : EMPTY
    )
  );
}
