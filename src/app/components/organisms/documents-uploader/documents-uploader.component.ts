import { clearFilesListAction } from 'src/app/store/files/actions';
import { map, Observable } from 'rxjs';
import { StatusLabelStatus } from 'src/app/components/atoms/status-label/status-label.component';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import {
  filesSelector,
  loadedCountSelector,
  totalCountSelector,
} from 'src/app/store/files/selectors';

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
  protected documentsTotalCount$ = this.store.select(totalCountSelector);
  protected documentsLoadedCount$ = this.store.select(loadedCountSelector);
  protected uploadedDocuments$: Observable<Item[]> = this.store
    .select(filesSelector)
    .pipe(
      map((files) =>
        files.map((item) => ({
          fileName: item.file.name,
        }))
      )
    );

  constructor(private store: Store) {}

  clearFilesList() {
    this.store.dispatch(clearFilesListAction());
  }
}
