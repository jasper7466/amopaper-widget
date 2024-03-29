import { Observable, catchError, of, map } from 'rxjs';
import { ApiService } from '../../api.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ADDRESSEE_ID_TYPE, IAddressee } from 'src/app/interfaces/addressee.interface';
import { IAddresseeExistence } from 'src/app/interfaces/addressee-existence.interface';

interface ICheckByPhoneRequest {
    /* eslint-disable @cspell/spellchecker */
    // Именование задано внешним контрактом
    phonenumber: string;
    /* eslint-enable @cspell/spellchecker */
}

interface ICheckByPhoneResponse {
    userGuid: string;
}

const requestAdapter = (data: IAddressee): ICheckByPhoneRequest | never => {
    if (data.idType === ADDRESSEE_ID_TYPE.Phone) {
        // Именование задано внешним контрактом
        // eslint-disable-next-line @cspell/spellchecker
        return { phonenumber: data.idValue };
    }

    throw new Error('Invalid addressee ID type ("Phone" expected).');
};

const responseAdapter = (
    response: ICheckByPhoneResponse | HttpErrorResponse,
): IAddresseeExistence | never => {
    if (!(response instanceof HttpErrorResponse)) {
        return { isExists: true };
    }

    if (response.status === 400) {
        return { isExists: false };
    }

    throw response;
};

export function checkByPhoneEndpoint$(
    this: ApiService,
    data: IAddressee,
): Observable<IAddresseeExistence> {
    return this.post$<ICheckByPhoneRequest, ICheckByPhoneResponse>(
        `/profile/fl/check-by-phone-v2`,
        requestAdapter(data),
    ).pipe(
        map(responseAdapter),
        catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse) {
                return of(responseAdapter(error));
            }

            throw error;
        }),
    );
}
