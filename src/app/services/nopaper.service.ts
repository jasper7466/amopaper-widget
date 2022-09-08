import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { response } from 'express';
import { map, switchMap, tap } from 'rxjs';
import { addresseeSelector } from '../store/addressee/selectors';
import { filesSelector } from '../store/files/selectors';
import { setPacketIdAction } from '../store/nopaper/actions';
import { NopaperApiService } from './api/nopaper/nopaper-api.service';
import { File } from './api/nopaper/nopaper-api.types';
import { CrmService } from './crm.service';

@Injectable({
  providedIn: 'root',
})
export class NopaperService {
  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private crmService: CrmService
  ) {}

  createDraft() {
    console.log('creating draft');
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

          console.log(files);

          return {
            title: '',
            files,
            ...contact,
          };
        }),
        switchMap((body) => {
          return this.nopaperApiService.postDraft$(body);
        }),
        tap((response) =>
          this.store.dispatch(
            setPacketIdAction({ packetId: parseInt(response.documentId) })
          )
        ),
        switchMap((response) =>
          this.crmService.setPacketId$(parseInt(response.documentId))
        )
        // tap(console.log)
      )
      .subscribe();
  }
}
