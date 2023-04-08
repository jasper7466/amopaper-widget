import { take, filter, map } from 'rxjs';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilesService } from 'src/app/services/sub-services/files.service';

@Component({
  selector: 'app-documents-drop-area',
  templateUrl: './documents-drop-area.component.html',
  styleUrls: ['./documents-drop-area.component.css'],
})
export class DocumentsDropAreaComponent {
  private _leadId$ = this._store$.select(leadIdSelector);

  constructor(private _filesService: FilesService, private _store$: Store) {}

  protected fileLoadHandler(fileList: FileList): void {
    this._filesService.filesHandler(fileList);
  }

  protected loadFromLeadButtonHandler(): void {
    this._leadId$
      .pipe(
        take(1),
        filter((leadId) => typeof leadId === 'number'),
        map((leadId) => leadId as number)
        // switchMap((leadId) => this.crmService.getLeadAttachments(leadId))
      )
      .subscribe();
  }
}
