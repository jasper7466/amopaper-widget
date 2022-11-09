import { clientUuidSelector } from './../../../store/crm-context/selectors';
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
  IGetAmoAccessTokenResponse,
} from './nopaper-api.types';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  subdomainSelector,
  xApiKeySelector,
} from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.nopaperBaseUrl;
const BASE_URL_TOKEN = environment.nopaperBaseTokenUrl;

@Injectable({
  providedIn: 'root',
})
export class NopaperApiService {
  private headers: HttpHeaders;

  xApiKey$ = this.store.select(xApiKeySelector);
  clientUuid$ = this.store.select(clientUuidSelector);
  subdomain$ = this.store.select(subdomainSelector);

  private xApiKey?: string;
  private clientUuid?: string;
  private subdomain?: string;

  constructor(private http: HttpClient, private store: Store) {
    this.xApiKey$.subscribe((key) => {
      this.xApiKey = key;
      this.updateHeaders();
    });

    this.clientUuid$.subscribe((uuid) => {
      this.clientUuid = uuid;
    });

    this.subdomain$.subscribe((subdomain) => {
      this.subdomain = subdomain;
      this.updateHeaders();
    });
  }

  private updateHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': `${this.xApiKey}`,
    });
  }

  private post<Req, Res>(path: string, body: Req): Observable<Res> {
    return this.http.post<Res>(`${BASE_URL}${path}`, body, {
      headers: this.headers,
    });
  }

  private get<Res>(path: string, baseUrl = BASE_URL): Observable<Res> {
    return this.http.get<Res>(`${baseUrl}${path}`, {
      headers: this.headers,
    });
  }

  // Для для отладки с локальным сервером авторизации
  public getAmoAccessTokenLocally() {
    return this.http.post<{ access_token: string }>(
      'http://localhost:5200/access_token',
      {
        x_api_key: this.xApiKey,
        subdomain: this.subdomain,
      }
    );
  }

  public getAmoAccessToken() {
    return this.get<IGetAmoAccessTokenResponse>(
      `/amo-crm/authorization/access-token/${this.clientUuid}`,
      BASE_URL_TOKEN
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
