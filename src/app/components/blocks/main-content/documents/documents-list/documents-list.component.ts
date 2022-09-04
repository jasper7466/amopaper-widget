import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearFilesListAction } from 'src/app/store/files/actions';
import {
  filesSelector,
  loadedCountSelector,
  totalCountSelector,
} from 'src/app/store/files/selectors';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {
  public isFolded = false;
  documentsTotalCount$ = this.store.select(totalCountSelector);
  documentsLoadedCount$ = this.store.select(loadedCountSelector);
  documents$ = this.store.select(filesSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onFold(): void {
    this.isFolded = !this.isFolded;
  }

  clearFilesList() {
    this.store.dispatch(clearFilesListAction());
  }
}
