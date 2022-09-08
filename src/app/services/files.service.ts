import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { FileRecord } from '../store/files';
import {
  addFilesAction,
  clearFilesListAction,
  loadFileCompleteAction,
} from '../store/files/actions';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private counter = 0;

  constructor(private store: Store) {}

  filesHandler(files: FileList) {
    const fileRecords: FileRecord[] = [];

    for (const file of Array.from(files)) {
      const id = this.counter;
      this.toBase64$(file).subscribe((base64) => {
        this.store.dispatch(loadFileCompleteAction({ id, base64 }));
      });

      fileRecords.push({
        id,
        file,
        base64: '',
        onLoadSubscription: null,
        isLoaded: false,
      });

      this.counter++;
    }

    this.store.dispatch(addFilesAction({ files: [...fileRecords] }));
  }

  protected toBase64$(file: File): Observable<string> {
    const fileReader = new FileReader();

    return new Observable<string>((observer: Observer<string>) => {
      fileReader.onload = () => {
        const result = fileReader.result as string;
        observer.next(result.replace('data:', '').replace(/^.+,/, ''));
        observer.complete();
      };

      fileReader.onerror = () => {
        observer.error({ error: `toBase64: Loading failed` });
      };

      fileReader.readAsDataURL(file);
    });
  }

  protected clearFilesList() {
    this.counter = 0;
    this.store.dispatch(clearFilesListAction());
  }
}
