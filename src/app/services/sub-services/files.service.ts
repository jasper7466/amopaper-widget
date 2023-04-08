import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, take } from 'rxjs';
import {
  sourceFilesAddAction,
  sourceFilesResetAction,
  sourceFileCompleteAction,
} from '../../store/files-source/actions';
import { IFileInfo } from 'src/app/interfaces/file-info.interface';

@Injectable()
export class FilesService {
  private _counter = 0;

  constructor(private _store$: Store) {}

  public filesHandler(files: FileList): void {
    const filesMetadata: IFileInfo[] = [];

    for (const file of Array.from(files)) {
      const id = this._counter;
      this.toBase64$(file)
        .pipe(take(1))
        .subscribe((base64) => {
          this._store$.dispatch(sourceFileCompleteAction({ id, base64 }));
        });

      filesMetadata.push({
        id,
        name: file.name,
        size: file.size,
      });

      this._counter++;
    }

    this._store$.dispatch(
      sourceFilesAddAction({ payload: [...filesMetadata] })
    );
  }

  protected toBase64$(file: File): Observable<string> {
    const fileReader = new FileReader();

    return new Observable<string>((observer: Observer<string>) => {
      fileReader.onload = (): void => {
        const result = fileReader.result as string;
        observer.next(result.replace('data:', '').replace(/^.+,/, ''));
        observer.complete();
      };

      fileReader.onerror = (): void => {
        observer.error({ error: `toBase64: Loading failed` });
      };

      fileReader.readAsDataURL(file);
    });
  }

  protected clearFilesList(): void {
    this._counter = 0;
    this._store$.dispatch(sourceFilesResetAction());
  }
}
