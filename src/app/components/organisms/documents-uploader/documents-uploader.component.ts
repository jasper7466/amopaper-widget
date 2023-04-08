import { map, Observable } from 'rxjs';
import { TStatusLabelStatus } from 'src/app/components/atoms/status-label/status-label.component';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import {
  sourceFilesSelector,
  sourceFilesLoadedCountSelector,
  sourceFilesTotalCountSelector,
} from 'src/app/store/files-source/selectors';
import { sourceFilesResetAction } from 'src/app/store/files-source/actions';

type TItem = {
  fileName: string;
  signStatus?: TStatusLabelStatus;
  fileId?: number;
};

@Component({
  selector: 'app-documents-uploader',
  templateUrl: './documents-uploader.component.html',
  styleUrls: ['./documents-uploader.component.css'],
})
export class DocumentsUploaderComponent {
  protected documentsTotalCount$ = this._store$.select(
    sourceFilesTotalCountSelector
  );
  protected documentsLoadedCount$ = this._store$.select(
    sourceFilesLoadedCountSelector
  );

  protected uploadedDocuments$: Observable<TItem[]> = this._store$
    .select(sourceFilesSelector)
    .pipe(
      map((files) =>
        files.map((item) => ({
          fileName: item.name,
        }))
      )
    );

  constructor(private _store$: Store) {}

  protected clearFilesList(): void {
    this._store$.dispatch(sourceFilesResetAction());
  }
}
