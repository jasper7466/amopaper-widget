import {
  ICheckByPhoneResponse,
  ICheckByPhoneRequest,
  IPostDraftRequest,
  IPostDraftResponse,
  IGetStepNameResponse,
  StepName,
  IPostStepNameRequest,
  IGetFilesIdsRequest,
  IGetFilesIdentifiersResponse,
  IGetFileSignatureRequest,
  IGetFileSignatureResponse,
  IGetPacketInfoResponse,
} from './nopaper-api.types';
import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  subdomainSelector,
  xApiKeySelector,
} from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';
import { updateAccessTokenAction } from 'src/app/store/access-token/actions';

const BASE_URL = environment.nopaperBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class NopaperApiService {
  private headers: HttpHeaders;

  // TODO: только для отладки с локальным сервером авторизации
  private xApiKey?: string;
  private subdomain?: string;
  //

  constructor(private http: HttpClient, private store: Store) {
    this.store.select(xApiKeySelector).subscribe((xApiKey) => {
      this.xApiKey = xApiKey;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': `${xApiKey}`,
      });
    });
    this.store
      .select(subdomainSelector)
      .subscribe((subdomain) => (this.subdomain = subdomain));
  }

  private post<Req, Res>(path: string, body: Req): Observable<Res> {
    return this.http.post<Res>(`${BASE_URL}${path}`, body, {
      headers: this.headers,
    });
  }

  private get<Res>(path: string): Observable<Res> {
    return this.http.get<Res>(`${BASE_URL}${path}`, {
      headers: this.headers,
    });
  }

  // TODO: только для отладки с локальным сервером авторизации
  public getAmoToken(): Observable<string> {
    return this.http
      .post<{ access_token: string }>('http://localhost:5200/access_token', {
        x_api_key: this.xApiKey,
        subdomain: this.subdomain,
      })
      .pipe(
        map((response) => response.access_token),
        tap((accessToken) =>
          this.store.dispatch(updateAccessTokenAction({ token: accessToken }))
        )
      );
  }

  public postPacket(body: IPostDraftRequest) {
    return this.post<IPostDraftRequest, IPostDraftResponse>(
      '/document/create-for-client',
      body
    );
  }

  public checkUserByPhone$(phone: string) {
    return this.post<ICheckByPhoneRequest, ICheckByPhoneResponse>(
      `/profile/fl/check-by-phone-v2`,
      {
        phonenumber: phone,
      }
    );
  }

  public getPacketStepName(packetId: number) {
    return this.get<IGetStepNameResponse>(`/document/status/${packetId}`);
  }

  public setPacketStepName(packetId: number, stepName: StepName) {
    return this.post<IPostStepNameRequest, any>('/document/changestep', {
      documentId: packetId,
      stepSystemName: stepName,
    });
  }

  public getFilesIdentifiers(packetId: number) {
    return this.post<IGetFilesIdsRequest, IGetFilesIdentifiersResponse>(
      '/document/file-description-v2',
      { documentId: packetId }
    );
  }

  public getFileSignatures(fileId: number) {
    return this.post<IGetFileSignatureRequest, IGetFileSignatureResponse>(
      '/file/signatures',
      { documentFileId: fileId }
    );
  }

  public getPacketInfo(packetId: number) {
    return this.get<IGetPacketInfoResponse>(`/document/details/${packetId}`);
  }
}
