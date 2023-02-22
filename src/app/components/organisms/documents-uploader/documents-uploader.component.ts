import { map, Observable } from 'rxjs';
import { StatusLabelStatus } from 'src/app/components/atoms/status-label/status-label.component';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import {
  sourceFilesSelector,
  sourceFilesLoadedCountSelector,
  sourceFilesTotalCountSelector,
} from 'src/app/store/files-source/selectors';
import { sourceFilesResetAction } from 'src/app/store/files-source/actions';

type Item = {
  fileName: string;
  signStatus?: StatusLabelStatus;
  fileId?: number;
};

@Component({
  selector: 'app-documents-uploader',
  templateUrl: './documents-uploader.component.html',
  styleUrls: ['./documents-uploader.component.css'],
})
export class DocumentsUploaderComponent {
  protected documentsTotalCount$ = this.store.select(
    sourceFilesTotalCountSelector
  );
  protected documentsLoadedCount$ = this.store.select(
    sourceFilesLoadedCountSelector
  );

  protected uploadedDocuments$: Observable<Item[]> = this.store
    .select(sourceFilesSelector)
    .pipe(
      map((files) =>
        files.map((item) => ({
          fileName: item.name,
        }))
      )
    );

  constructor(private store: Store) {}

  protected clearFilesList() {
    this.store.dispatch(sourceFilesResetAction());
  }
}
