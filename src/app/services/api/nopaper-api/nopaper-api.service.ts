import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import {
  ICheckByPhoneResponse,
  ICheckByPhoneRequest,
  IPostDraftRequest,
  IPostDraftResponse,
  IGetStepNameResponse,
  StepName,
  IPostStepNameRequest,
  IGetFilesIdsRequest,
  IGetFilesIdsResponse,
  IGetFileSignatureRequest,
  IGetFileSignatureResponse,
  IGetPacketDetailsResponse,
  IGetPacketDetailsRequest,
  IPostStepNameResponse,
  IGetFilesByIdsRequest,
  IGetFilesByIdsResponse,
  IGetShareLinkRequest,
  IGetShareLinkResponse,
} from './nopaper-api.types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { xApiKeySelector } from 'src/app/store/crm-context/selectors';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.nopaperBaseUrl;

@Injectable()
export class NopaperApiService extends ApiService {
  private xApiKey$ = this.store.select(xApiKeySelector);

  constructor(http: HttpClient, private store: Store) {
    super(http);

    this.baseUrl = BASE_URL;
    this.setHeaders({ 'Content-Type': 'application/json' });

    this.xApiKey$.subscribe((key) => {
      this.setHeaders({ 'X-API-Key': `${key}` });
    });
  }

  public postPacket(body: IPostDraftRequest): Observable<IPostDraftResponse> {
    return this.post<IPostDraftRequest, IPostDraftResponse>(
      '/document/create-for-client',
      body
    );
  }

  public checkUserByPhone$(phone: string): Observable<ICheckByPhoneResponse> {
    return this.post<ICheckByPhoneRequest, ICheckByPhoneResponse>(
      `/profile/fl/check-by-phone-v2`,
      {
        phonenumber: phone,
      }
    );
  }

  public getPacketStepName(packetId: number): Observable<IGetStepNameResponse> {
    return this.get<IGetStepNameResponse>(`/document/status/${packetId}`);
  }

  public setPacketStepName(
    packetId: number,
    stepName: StepName
  ): Observable<IPostStepNameResponse> {
    return this.post<IPostStepNameRequest, IPostStepNameResponse>(
      '/document/changestep',
      {
        documentId: packetId,
        stepSystemName: stepName,
      }
    );
  }

  public getFilesIdentifiers(
    packetId: number
  ): Observable<IGetFilesIdsResponse> {
    return this.post<IGetFilesIdsRequest, IGetFilesIdsResponse>(
      '/document/file-description-v2',
      { documentId: packetId }
    );
  }

  public getFilesByIds(filesIds: number[]): Observable<IGetFilesByIdsResponse> {
    return this.post<IGetFilesByIdsRequest, IGetFilesByIdsResponse>(
      '/document/file-list',
      { documentFileIdList: filesIds }
    );
  }

  public getFileSignatures(
    fileId: number
  ): Observable<IGetFileSignatureResponse> {
    return this.post<IGetFileSignatureRequest, IGetFileSignatureResponse>(
      '/file/signatures',
      { documentFileId: fileId }
    );
  }

  public getPacketDetails(
    packetId: number
  ): Observable<IGetPacketDetailsResponse> {
    return this.post<IGetPacketDetailsRequest, IGetPacketDetailsResponse>(
      `/document/details`,
      { documentId: packetId }
    );
  }

  public getShareLink(packetId: number): Observable<IGetShareLinkResponse> {
    return this.post<IGetShareLinkRequest, IGetShareLinkResponse>(
      `/document/${packetId}/generate-link`,
      {}
    );
  }
}
