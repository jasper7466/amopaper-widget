import { IAddresseeExistenceProps } from '../../../../store/addressee/actions';
import { Observable, catchError, of, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';

interface ICheckByPhoneRequest {
  phonenumber: string;
}

interface ICheckByPhoneResponse {
  userGuid: string;
}

const requestAdapter = (data: string): ICheckByPhoneRequest => ({
  phonenumber: data,
});

const responseAdapter = (
  response: ICheckByPhoneResponse | HttpErrorResponse
): IAddresseeExistenceProps | never => {
  if (!(response instanceof HttpErrorResponse)) {
    return { isExists: false };
  }

  if (response.status === 400) {
    return { isExists: false };
  }

  throw response;
};

export function checkByPhoneEndpoint(
  this: ApiService,
  data: string
): Observable<IAddresseeExistenceProps> {
  return this.post<ICheckByPhoneRequest, ICheckByPhoneResponse>(
    `/profile/fl/check-by-phone-v2`,
    requestAdapter(data)
  ).pipe(
    map(responseAdapter),
    catchError((error) => of(responseAdapter(error)))
  );
}
