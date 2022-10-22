import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { NopaperService } from 'src/app/services/nopaper.service';
import { clearFilesListAction } from 'src/app/store/files/actions';
import {
  filesSelector,
  loadedCountSelector,
  totalCountSelector,
} from 'src/app/store/files/selectors';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';
import { signaturesSignedIdentifiersSelector } from 'src/app/store/signatures/selectors';
import { StatusLabelStatus } from '../common/status-label/status-label.component';

type Item = {
  fileName: string;
  signStatus: StatusLabelStatus;
  fileId?: number;
};

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit, OnDestroy {
  @Output() onShowSignInfo = new EventEmitter<void>();

  public isFolded = false;
  documentsTotalCount$ = this.store.select(totalCountSelector);
  documentsLoadedCount$ = this.store.select(loadedCountSelector);
  uploadedDocuments$: Observable<Item[]> = this.store
    .select(filesSelector)
    .pipe(
      map((files) =>
        files.map((item) => ({
          fileName: item.file.name,
          signStatus: '',
        }))
      )
    );
  signedDocuments$: Observable<Item[]> = this.store
    .select(signaturesSignedIdentifiersSelector)
    .pipe(
      map((files) =>
        files.map((item) => ({
          fileName: item?.fileName || '',
          fileId: item?.documentFileId || undefined,
          signStatus: 'signed',
        }))
      )
    );
  stepName$ = this.store.select(stepNameSelector);
  public isEditable$ = this.stepName$.pipe(map((step) => step === null));
  public documentsSource$: Observable<Item[]>;

  private subscription: Subscription;

  constructor(private store: Store, private nopaperService: NopaperService) {}

  ngOnInit(): void {
    this.subscription = this.stepName$.subscribe((stepName) => {
      if (stepName === null) {
        this.documentsSource$ = this.uploadedDocuments$;
      } else {
        this.documentsSource$ = this.signedDocuments$;
      }
    });
  }

  onFold(): void {
    this.isFolded = !this.isFolded;
  }

  clearFilesList() {
    this.store.dispatch(clearFilesListAction());
  }

  showSignInfo(): void {
    console.log('list press');
    this.onShowSignInfo.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
