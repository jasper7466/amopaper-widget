import { setPacketDetailsAction } from '../store/packets/actions';
import { updateAccessTokenAction } from './../store/access-token/actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  first,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { addresseeSelector } from '../store/addressee/selectors';
import { filesSelector } from '../store/files/selectors';
import { packetTitleSelector } from '../store/misc/selectors';
import { setPacketStepAction } from '../store/packets/actions';
import {
  setRawFilesAction,
  setFilesIdentifiersAction,
  setFileSignatureAction,
} from '../store/signatures/actions';
import { NopaperApiService } from './api/nopaper-api/nopaper-api.service';
import {
  IGetFilesByIdsResponse,
  IGetFilesIdsResponse,
  IGetStepNameResponse,
  IPostDraftRequest,
  PostDraftRequestFileItem,
} from './api/nopaper-api/nopaper-api.types';
import { CrmService } from './crm.service';
import { filesIdentifiersSelector } from '../store/signatures/selectors';
import { AccessTokenApiService } from './api/access-token-api/access-token-api.service';

const POLLING_INTERVAL_MS = 3000;

@Injectable()
export class NopaperService {
  private packetPollingBreakerById = new Subject<number>();
  private packetPollingBreakerAll = new Subject<void>();

  private addressee$ = this.store.select(addresseeSelector);
  private uploadedFiles$ = this.store.select(filesSelector);
  private packetTitle$ = this.store.select(packetTitleSelector);

  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private accessTokenApiService: AccessTokenApiService,
    private crmService: CrmService
  ) {}

  public getAmoAccessToken() {
    return this.accessTokenApiService
      .getAmoAccessToken()
      .pipe(
        tap(({ accessToken }) =>
          this.store.dispatch(updateAccessTokenAction({ token: accessToken }))
        )
      );
  }

  public postDraft(): Observable<{ packetId: number }> {
    const packetBody = this.composePostDraftRequestBody();
    let packetId = 0;

    return this.nopaperApiService.postPacket(packetBody).pipe(
      tap((response) => (packetId = parseInt(response.documentId))),
      switchMap(() => this.crmService.attachPacketToLead(packetId)),
      map(() => ({ packetId }))
    );
  }

  public submitDraft(packetId: number): Observable<any> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperPrepareFiles'
    );
  }

  public submitPreview(packetId: number): Observable<any> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperSenderSign'
    );
  }

  public removeDraft(packetId: number) {
    return this.nopaperApiService.setPacketStepName(packetId, 'nopaperDelete');
  }

  public startPacketPolling(packetId: number): void {
    this.stopPacketPolling(packetId);
    timer(1, POLLING_INTERVAL_MS)
      .pipe(
        tap(() => {
          this.getStepName(packetId).subscribe();
          this.getPacketDetails(packetId).subscribe();
        }),
        takeUntil(
          this.packetPollingBreakerById.pipe(filter((id) => id === packetId))
        ),
        takeUntil(this.packetPollingBreakerAll)
      )
      .subscribe();
  }

  public stopPacketPolling(id: number): void {
    this.packetPollingBreakerById.next(id);
  }

  public stopPacketsStepPollingAll(): void {
    this.packetPollingBreakerAll.next();
  }

  private getStepName(packetId: number): Observable<IGetStepNameResponse> {
    return this.nopaperApiService
      .getPacketStepName(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setPacketStepAction({ ...response, packetId }))
        )
      );
  }

  public getPacketFilesIds(packetId: number): Observable<IGetFilesIdsResponse> {
    return this.nopaperApiService
      .getFilesIdentifiers(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setFilesIdentifiersAction(response))
        )
      );
  }

  private getFilesByIds(
    filesIds: number[]
  ): Observable<IGetFilesByIdsResponse> {
    return this.nopaperApiService
      .getFilesByIds(filesIds)
      .pipe(
        tap((response) =>
          this.store.dispatch(setRawFilesAction({ payload: response }))
        )
      );
  }

  public getFileSignature(fileId: number) {
    return this.nopaperApiService
      .getFileSignatures(fileId)
      .pipe(
        tap((response) => this.store.dispatch(setFileSignatureAction(response)))
      );
  }

  public getPacketDetails(packetId: number) {
    return this.nopaperApiService.getPacketDetails(packetId).pipe(
      tap((response) =>
        this.store.dispatch(
          setPacketDetailsAction({
            packetId: packetId,
            title: response.title,
            creationDate: response.dateCreate,
          })
        )
      )
    );
  }

  public getPacketFiles(packetId: number) {
    return this.getPacketFilesIds(packetId).pipe(
      switchMap(() => this.store.select(filesIdentifiersSelector)),
      take(1),
      switchMap((identifiers) => this.getFilesByIds(identifiers))
    );
  }

  private composePostDraftRequestBody(): IPostDraftRequest {
    let contact = {};
    let files: PostDraftRequestFileItem[] = [];
    let title = '';

    this.addressee$
      .pipe(
        first(),
        map((addressee) => {
          switch (addressee.type) {
            case 'phone':
              return { clientFlPhoneNumber: addressee.phone };
            case 'vatId':
              return { clientUlInn: addressee.vatId };
            default:
              throw new Error('Addressee is not defined');
          }
        })
      )
      .subscribe((result) => (contact = result));

    this.uploadedFiles$
      .pipe(
        first(),
        map((files) =>
          files.map((file) => ({
            fileName: file.file.name,
            filebase64: file.base64,
          }))
        )
      )
      .subscribe((result) => (files = result));

    this.packetTitle$.pipe(first()).subscribe((value) => (title = value));

    return {
      title: title,
      files: files,
      ...contact,
    };
  }
}
