import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  first,
  map,
  Observable,
  of,
  retry,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { addresseeSelector } from '../store/addressee/selectors';
import { filesSelector } from '../store/files/selectors';
import { packetTitleSelector } from '../store/misc/selectors';
import { setPacketStepAction } from '../store/packets-list/actions';
import {
  setFilesIdentifiersAction,
  setFileSignatureAction,
} from '../store/signatures/actions';
import { NopaperApiService } from './api/nopaper/nopaper-api.service';
import {
  IGetFilesIdentifiersResponse,
  IGetStepNameResponse,
  IPostDraftRequest,
  PostDraftRequestFileField,
} from './api/nopaper/nopaper-api.types';
import { CrmService } from './crm.service';

@Injectable({
  providedIn: 'root',
})
export class NopaperService {
  private stepPollingBreakerById = new Subject<number>();
  private stepPollingBreakerAll = new Subject<void>();

  private addressee$ = this.store.select(addresseeSelector);
  private uploadedFiles$ = this.store.select(filesSelector);
  private packetTitle$ = this.store.select(packetTitleSelector);

  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private crmService: CrmService
  ) {}

  public postDraft(): Observable<any> {
    return this.composePostDraftRequestBody().pipe(
      switchMap((body) => this.nopaperApiService.postDraft$(body)),
      switchMap((response) =>
        this.crmService.attachPacketToLead(parseInt(response.documentId))
      )
    );
  }

  public removeDraft(packetId: number) {
    return this.nopaperApiService.setStepName(packetId, 'nopaperDelete');
  }

  public startPacketStepPolling(packetId: number): void {
    this.stopPacketStepPolling(packetId);
    timer(1, 3000)
      .pipe(
        switchMap(() => this.getStepName(packetId)),
        retry(),
        takeUntil(
          this.stepPollingBreakerById.pipe(filter((id) => id === packetId))
        ),
        takeUntil(this.stepPollingBreakerAll)
      )
      .subscribe();
  }

  public stopPacketStepPolling(id: number): void {
    this.stepPollingBreakerById.next(id);
  }

  public stopPacketsStepPollingAll(): void {
    this.stepPollingBreakerAll.next();
  }

  private getStepName(packetId: number): Observable<IGetStepNameResponse> {
    return this.nopaperApiService
      .getStepName(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setPacketStepAction({ ...response, packetId }))
        )
      );
  }

  public getFilesIdentifiers(
    packetId: number
  ): Observable<IGetFilesIdentifiersResponse | null> {
    return this.nopaperApiService
      .getFilesIdentifiers(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setFilesIdentifiersAction(response))
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

  private composePostDraftRequestBody(): Observable<IPostDraftRequest> {
    let contact = {};
    let files: PostDraftRequestFileField[] = [];
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

    // switch (this.addresseeType) {
    //   case 'phone':
    //     contact = { clientFlPhoneNumber: this.clientFlPhoneNumber! };
    //     break;
    //   case 'vatId':
    //     contact = { clientUlInn: this.clientUlInn! };
    //     break;
    // }

    // let files = this.files.map((file) => ({
    //   fileName: file.file.name,
    //   filebase64: file.base64,
    // }));

    return of({
      title: title,
      files: files,
      ...contact,
    });
  }
}
