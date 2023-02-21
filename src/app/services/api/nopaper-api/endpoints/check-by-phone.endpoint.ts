import { Observable, catchError, of, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ADDRESSEE_ID_TYPE,
  IAddressee,
} from 'src/app/interfaces/addressee.interface';
import { IAddresseeExistence } from 'src/app/interfaces/addressee-existence.interface';

interface ICheckByPhoneRequest {
  phonenumber: string;
}

interface ICheckByPhoneResponse {
  userGuid: string;
}

const requestAdapter = (data: IAddressee): ICheckByPhoneRequest | never => {
  if (data.idType === ADDRESSEE_ID_TYPE.Phone) {
    return { phonenumber: data.idValue };
  }

  throw new Error('Invalid addressee ID type ("Phone" expected).');
};

const responseAdapter = (
  response: ICheckByPhoneResponse | HttpErrorResponse
): IAddresseeExistence | never => {
  if (!(response instanceof HttpErrorResponse)) {
    return { isExists: true };
  }

  if (response.status === 400) {
    return { isExists: false };
  }

  throw response;
};

export function checkByPhoneEndpoint(
  this: ApiService,
  data: IAddressee
): Observable<IAddresseeExistence> {
  return this.post<ICheckByPhoneRequest, ICheckByPhoneResponse>(
    `/profile/fl/check-by-phone-v2`,
    requestAdapter(data)
  ).pipe(
    map(responseAdapter),
    catchError((error) => of(responseAdapter(error)))
  );
}
