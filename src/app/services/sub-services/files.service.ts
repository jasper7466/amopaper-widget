import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import {
  sourceFilesAddAction,
  sourceFilesResetAction,
  sourceFileCompleteAction,
} from '../../store/files-source/actions';
import { IFileInfo } from 'src/app/interfaces/file-info.interface';

@Injectable()
export class FilesService {
  private counter = 0;

  constructor(private store: Store) {}

  filesHandler(files: FileList) {
    const filesMetadata: IFileInfo[] = [];

    for (const file of Array.from(files)) {
      const id = this.counter;
      this.toBase64$(file).subscribe((base64) => {
        this.store.dispatch(sourceFileCompleteAction({ id, base64 }));
      });

      filesMetadata.push({
        id,
        name: file.name,
        size: file.size,
      });

      this.counter++;
    }

    this.store.dispatch(sourceFilesAddAction({ payload: [...filesMetadata] }));
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
    this.store.dispatch(sourceFilesResetAction());
  }
}
