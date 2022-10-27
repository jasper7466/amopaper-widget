import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  Observable,
  retry,
  share,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { StatusLabelStatus } from '../components/common/status-label/status-label.component';
import { addresseeSelector } from '../store/addressee/selectors';
import { filesSelector } from '../store/files/selectors';
import { setStepNameAction } from '../store/nopaper/actions';
import { setPacketStepAction } from '../store/packets-list/actions';
import {
  setFilesIdentifiersAction,
  setFileSignatureAction,
} from '../store/signatures/actions';
import { NopaperApiService } from './api/nopaper/nopaper-api.service';
import {
  File,
  IGetFilesIdentifiersResponse,
  StepName,
} from './api/nopaper/nopaper-api.types';
import { CrmService } from './crm.service';

@Injectable({
  providedIn: 'root',
})
export class NopaperService {
  private stepPollingBreakerById = new Subject<number>();
  private stepPollingBreakerAll = new Subject<void>();

  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private crmService: CrmService
  ) {}

  createDraft() {
    let clientFlPhoneNumber: string | null = null;
    let clientUlInn: string | null = null;
    let files: File[] = [];

    this.store
      .select(addresseeSelector)
      .pipe(
        tap((addressee) => {
          clientFlPhoneNumber = addressee.phone;
          clientUlInn = addressee.vatId;
        }),
        switchMap(() => this.store.select(filesSelector)),
        map((files) =>
          files.map((file) => ({
            fileName: file.file.name,
            filebase64: file.base64,
          }))
        ),
        tap((filesArray) => (files = filesArray)),
        map(() => {
          let contact;

          if (clientFlPhoneNumber) {
            contact = { clientFlPhoneNumber };
          } else if (clientUlInn) {
            contact = { clientUlInn };
          }

          return {
            title: '',
            files,
            ...contact,
          };
        }),
        switchMap((body) => this.nopaperApiService.postDraft$(body))
        // tap((response) =>
        //   this.store.dispatch(
        //     setPacketsIdsAction({ packetId: parseInt(response.documentId) })
        //   )
        // ),
        // switchMap((response) =>
        //   this.crmService.setPacketIds$(parseInt(response.documentId))
        // ),
        // switchMap(() => this.getStepName$())
      )
      .subscribe();
  }

  public removeDraft(packetId: number) {
    return this.nopaperApiService.setStepName(packetId, 'nopaperDelete');
  }

  public getStepName$(packetId: number) {
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

  public startPacketStepPolling(packetId: number): void {
    this.stopPacketStepPollingById(packetId);
    timer(1, 3000)
      .pipe(
        switchMap(() => this.getStepName$(packetId)),
        retry(),
        takeUntil(
          this.stepPollingBreakerById.pipe(filter((id) => id === packetId))
        ),
        takeUntil(this.stepPollingBreakerAll)
      )
      .subscribe();
  }

  private stopPacketStepPollingById(id: number): void {
    this.stepPollingBreakerById.next(id);
  }

  public stopPacketsStepPollingAll(): void {
    this.stepPollingBreakerAll.next();
  }
}
