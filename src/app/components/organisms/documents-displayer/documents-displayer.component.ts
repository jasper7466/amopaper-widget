import { Store } from '@ngrx/store';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-documents-displayer',
  templateUrl: './documents-displayer.component.html',
  styleUrls: ['./documents-displayer.component.css'],
})
export class DocumentsDisplayerComponent {
  @Output() onShowSignInfo = new EventEmitter<void>();

  // protected Documents$: Observable<Item[]> = this.store;

  constructor(private store: Store) {}

  public showSignInfo(): void {
    this.onShowSignInfo.emit();
  }

  // this.nopaperService.getFileSignature(this.fileId).subscribe(() => {});

  // signedDocuments$: Observable<Item[]> = this.store
  // .select(signaturesSignedIdentifiersSelector)
  // .pipe(
  //   map((files) =>
  //     files.map((item) => ({
  //       fileName: item?.fileName || '',
  //       fileId: item?.documentFileId || undefined,
  //       signStatus: 'signed',
  //     }))
  //   )
  // );
}
