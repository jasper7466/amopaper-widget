import { base64ToFile } from './../../utils/base64-to-file.util';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class SignaturesEffects {
  constructor(private actions$: Actions) {}

  private setDecodedFiles$ = createEffect(() =>
    this.actions$
      .pipe
      // ofType(setRawFilesAction),
      // switchMap(({ payload }) => {
      //   const tasks$: Observable<File>[] = [];

      //   for (const file of payload) {
      //     tasks$.push(base64ToFile(file.base64Content, file.fileName));
      //   }

      //   return forkJoin(tasks$);
      // }),
      // map((files) => setOriginalFilesAction({ payload: files }))
      ()
  );
}
