import {
  CheckByPhoneResponse,
  CheckByPhoneRequest,
  IPostDraftRequest,
  PostDraftResponse,
  IGetStepNameResponse,
  StepName,
  IPostStepNameRequest,
  GetFilesIdentifiersRequest,
  IGetFilesIdentifiersResponse,
  GetFileSignatureRequest,
  IGetFileSignatureResponse,
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

  private post$<Req, Res>(path: string, body: Req): Observable<Res> {
    return this.http.post<Res>(`${BASE_URL}${path}`, body, {
      headers: this.headers,
    });
  }

  private get$<T>(path: string): Observable<T> {
    return this.http.get<T>(`${BASE_URL}${path}`, {
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

  postDraft$(body: IPostDraftRequest) {
    return this.post$<IPostDraftRequest, PostDraftResponse>(
      '/document/create-for-client',
      body
    );
  }

  checkByPhone$(phone: string) {
    return this.post$<CheckByPhoneRequest, CheckByPhoneResponse>(
      `/profile/fl/check-by-phone-v2`,
      {
        phonenumber: phone,
      }
    );
  }

  getStepName(packetId: number) {
    return this.get$<IGetStepNameResponse>(`/document/status/${packetId}`);
  }

  public setStepName(packetId: number, stepName: StepName) {
    return this.post$<IPostStepNameRequest, any>('/document/changestep', {
      documentId: packetId,
      stepSystemName: stepName,
    });
  }

  getFilesIdentifiers(packetId: number) {
    return this.post$<GetFilesIdentifiersRequest, IGetFilesIdentifiersResponse>(
      '/document/file-description-v2',
      { documentId: packetId }
    );
  }

  getFileSignatures(fileId: number) {
    return this.post$<GetFileSignatureRequest, IGetFileSignatureResponse>(
      '/file/signatures',
      { documentFileId: fileId }
    );
  }
}
