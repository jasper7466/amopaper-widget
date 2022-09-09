import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, map, of, switchMap, tap } from 'rxjs';
import { addresseeSelector } from '../store/addressee/selectors';
import { filesSelector } from '../store/files/selectors';
import {
  resetStepNameAction,
  setPacketIdAction,
  setStepNameAction,
} from '../store/nopaper/actions';
import { packetIdSelector } from '../store/nopaper/selectors';
import { NopaperApiService } from './api/nopaper/nopaper-api.service';
import { File } from './api/nopaper/nopaper-api.types';
import { CrmService } from './crm.service';

@Injectable({
  providedIn: 'root',
})
export class NopaperService {
  private packetId: number | null;

  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private crmService: CrmService
  ) {
    this.store.select(packetIdSelector).subscribe((id) => (this.packetId = id));
  }

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
        switchMap((body) => this.nopaperApiService.postDraft$(body)),
        tap((response) =>
          this.store.dispatch(
            setPacketIdAction({ packetId: parseInt(response.documentId) })
          )
        ),
        switchMap((response) =>
          this.crmService.setPacketId$(parseInt(response.documentId))
        ),
        switchMap(() => this.getStepName$())
      )
      .subscribe();
  }

  removeDraft() {
    if (!this.packetId) {
      return;
    }
    this.nopaperApiService
      .setStepName$(this.packetId, 'nopaperDelete')
      .subscribe();
    this.crmService.resetPacketId$().subscribe();
    this.store.dispatch(resetStepNameAction());
  }

  getStepName$() {
    if (!this.packetId) {
      return of(null);
    }

    return this.nopaperApiService.getStepName$(this.packetId).pipe(
      tap((response) => this.store.dispatch(setStepNameAction(response))),
      tap(console.log)
    );
  }
}
